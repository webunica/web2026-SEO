const fs = require('fs');
const urls = [
  'diseno-web-shopify-chile',
  'desarrollo-tiendas-shopify-chile',
  'desarrollo-tienda-en-linea-woocommerce',
  'desarrollo-paginas-web-pymes-chile',
  'desarrollo-diseno-elearning-tutor-lms',
  'tienda-dropshipping-shopify-y-dropi',
  'diseno-paginas-web-inmobiliaria',
  'crear-cuenta-shopify-chile',
  'planes-de-desarrollo-shopify-en-chile'
];

urls.forEach(p => {
  const dir = 'src/app/' + p;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(dir + '/page.tsx', `export default function Page() { return <main className="p-24"><h1 className="text-3xl font-bold uppercase">${p.replace(/-/g, ' ')}</h1></main> }`);
});
console.log('URLs setup complete.');
