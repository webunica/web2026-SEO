import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export const metadata = {
  title: 'Diseño Web para Funerarias y Obituarios Digitales | Webunica',
  description: 'Creamos plataformas digitales para funerarias con sistemas de obituarios eternos, condolencias online y gestión de servicios con respeto y elegancia.',
  keywords: 'paginas web funerarias chile, obituarios digitales, diseño web funerario profesional, sistemas de condolencias online',
};

export default function FuneralPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Diseño Web Funerario y Obituarios Digitales",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Webunica"
    },
    "description": "Sitios web respetuosos y tecnológicos para el sector funerario, con servicios de memoria digital.",
    "areaServed": "CL"
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
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-zinc-400 uppercase bg-zinc-50 rounded-full border border-zinc-100">
              Dignidad y Memoria Eterna
            </span>
            <h1 className="text-5xl lg:text-[5.5rem] font-bold tracking-tight text-zinc-900 leading-[1.0] mb-8">
              Innovación con <span className="text-zinc-400 font-serif italic">Respeto</span>
            </h1>
            <p className="text-xl text-zinc-600 leading-relaxed max-w-2xl">
              Transformamos la presencia digital de las funerarias en refugios de memoria y consuelo, integrando tecnología de obituarios digitales de última generación.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto group">
            <div className="absolute -inset-4 bg-zinc-100 rounded-[4rem] -z-10 group-hover:bg-zinc-200/50 transition-colors" />
            <div className="rounded-[3rem] overflow-hidden border border-zinc-100 shadow-2xl">
              <Image 
                src="/funeraria_premium_obituary_1776265975527.png"
                alt="Digital Obituary Platform Showcase"
                width={1200}
                height={700}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Value Proposition: Obituaries */}
        <section className="bg-zinc-50 py-32 border-y border-zinc-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div>
                  <h2 className="text-4xl font-bold text-zinc-900 mb-8 leading-tight">Obituarios Digitales: <br/>Un Legado que no se Olvida</h2>
                  <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
                    Nuestra solución exclusiva para funerarias permite crear un espacio de memoria único para cada familia, donde las flores físicas se transforman en mensajes eternos de amor y respeto.
                  </p>
                  <ul className="space-y-6">
                    {[
                      'Muros de condolencias moderados y privados.',
                      'Galerías fotográficas de homenaje perpetuo.',
                      'Sincronización con redes sociales para avisos de velorio.',
                      'Código QR en la lápida que lleva al obituario online.',
                      'Sistema de encendido de velas virtuales.'
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-4 items-start text-zinc-700">
                        <span className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center flex-shrink-0 mt-1 text-xs">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white p-10 rounded-3xl border border-zinc-200 shadow-sm h-fit">
                    <h3 className="text-xl font-bold mb-4">Atención 24/7</h3>
                    <p className="text-zinc-500 text-sm">Botones de contacto urgente siempre visibles y con ruteo directo a guardias de turno.</p>
                  </div>
                  <div className="bg-white p-10 rounded-3xl border border-zinc-200 shadow-sm translate-y-8 h-fit">
                    <h3 className="text-xl font-bold mb-4">Mapa de Velorios</h3>
                    <p className="text-zinc-500 text-sm">Integración con Google Maps para que familiares lleguen sin complicaciones a las capillas.</p>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32">
          <div className="max-w-3xl mx-auto text-center px-6">
            <h2 className="text-4xl font-bold text-zinc-900 mb-8">Modernice su funeraria con distinción</h2>
            <p className="text-xl text-zinc-600 mb-12 italic font-serif">Acompañamos su prestigio con la mejor tecnología de acompañamiento digital de Chile.</p>
            <Link
              href="/cotizador-en-linea-desarrollo-web"
              className="inline-block px-12 py-6 bg-zinc-900 text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-2xl"
            >
              Consultar Proyecto Funerario
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
