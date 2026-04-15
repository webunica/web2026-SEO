const https = require('https');
const fs = require('fs');
const path = require('path');

const SITEMAP_URL = 'https://webunica.cl/page-sitemap.xml';
const BASE_DOMAIN = 'https://webunica.cl/';

https.get(SITEMAP_URL, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    // Extract loc tags using regex
    const regex = /<loc>(.*?)<\/loc>/g;
    let match;
    const urls = [];

    while ((match = regex.exec(data)) !== null) {
      const fullUrl = match[1];
      if (fullUrl.startsWith(BASE_DOMAIN)) {
        let slug = fullUrl.substring(BASE_DOMAIN.length);
        slug = slug.replace(/\/$/, ''); // remove trailing slash
        if (slug && slug.length > 0) {
          urls.push(slug);
        }
      }
    }

    console.log(`Found ${urls.length} routes to scaffold.`);

    urls.forEach((slug) => {
      // Split by slash just in case there are nested routes
      const dirPath = path.join(process.cwd(), 'src', 'app', ...slug.split('/'));
      
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      const filePath = path.join(dirPath, 'page.tsx');
      if (!fs.existsSync(filePath)) {
        const componentName = slug.split('/').pop().replace(/-/g, ' ').toUpperCase();
        fs.writeFileSync(filePath, `export default function Page() {
  return (
    <main className="min-h-screen py-24 bg-zinc-950 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl text-white font-bold mb-4">${componentName}</h1>
        <p className="text-zinc-400">Esta página está en proceso de rediseño.</p>
      </div>
    </main>
  );
}
`);
      }
    });

    console.log('All indexed routes have been scaffolded successfully to prevent 404s.');
  });
}).on('error', (err) => {
  console.log('Error fetching sitemap: ' + err.message);
});
