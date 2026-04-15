import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export const metadata = {
  title: 'Desarrollo de Tiendas Online WooCommerce en Chile | Webunica',
  description: 'Expertos en diseño y desarrollo de tiendas WooCommerce. Creamos ecommerce escalables, rápidos y optimizados para SEO que venden más.',
  keywords: 'woocommerce chile, desarrollo ecommerce wordpress, tienda online woocommerce, diseño web woocommerce',
};

export default function WooCommercePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Desarrollo WooCommerce Empresas",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Webunica",
      "image": "https://webunica.cl/wp-content/uploads/2024/01/logo-webunica.png.webp"
    },
    "description": "Desarrollo de tiendas online profesionales con WooCommerce y WordPress, optimizadas para conversión y velocidad.",
    "areaServed": "CL",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Planes WooCommerce",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tienda WooCommerce Profesional"
          }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      
      <main className="pt-[25vh]">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full">
                Flexibilidad Total con WordPress
              </span>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 leading-[1.1] mb-8">
                Tiendas Online que <span className="text-blue-600">No Tienen Límites</span>
              </h1>
              <p className="text-xl text-zinc-600 leading-relaxed mb-10 max-w-xl">
                Lleva tu negocio al siguiente nivel con WooCommerce. Control total de tus datos, integraciones personalizadas y un diseño que enamora a tus clientes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/cotizador-en-linea-desarrollo-web"
                  className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold text-center hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200"
                >
                  Cotizar mi Proyecto
                </Link>
                <Link
                  href="/contacto-desarrollo-diseno-web"
                  className="px-8 py-4 bg-white border-2 border-zinc-100 text-zinc-900 rounded-2xl font-bold text-center hover:border-zinc-300 transition-all"
                >
                  Hablar con un Experto
                </Link>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="relative rounded-[2rem] overflow-hidden border border-zinc-100 shadow-2xl">
                <Image 
                  src="/portfolio_woocommerce_premium_1776264357191.png"
                  alt="WooCommerce Development Showcase"
                  width={800}
                  height={600}
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="bg-zinc-50 py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl lg:text-5xl font-bold text-zinc-900 mb-6">¿Por qué elegir WooCommerce?</h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                La plataforma de ecommerce más personalizable del mundo, diseñada para crecer junto a tu empresa.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Escalabilidad Ilimitada',
                  desc: 'Desde 10 hasta 100,000 productos sin pagar comisiones por ventas.',
                  icon: '🚀'
                },
                {
                  title: 'Control de Datos',
                  desc: 'Toda la información es tuya. Sin ataduras a plataformas propietarias.',
                  icon: '🔐'
                },
                {
                  title: 'Integración Local',
                  desc: 'Transbank, Mercado Pago, Shipit y facturación electrónica chilena.',
                  icon: '🇨🇱'
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-xl transition-shadow group">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-4">{item.title}</h3>
                  <p className="text-zinc-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div className="bg-blue-600 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20" />
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-6xl font-bold text-white mb-8">
                  ¿Listo para vender sin límites?
                </h2>
                <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Creamos tiendas WooCommerce de alto rendimiento que no solo se ven bien, sino que están diseñadas para convertir visitas en ventas reales.
                </p>
                <Link
                  href="/cotizador-en-linea-desarrollo-web"
                  className="inline-block px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-colors"
                >
                  Obtener Presupuesto Gratis
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}