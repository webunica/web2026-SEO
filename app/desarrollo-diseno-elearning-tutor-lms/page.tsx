import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export const metadata = {
  title: 'Desarrollo de Plataformas E-learning Tutor LMS | Webunica',
  description: 'Crea tu propia academia online con Tutor LMS. Diseñamos plataformas educativas profesionales para cursos, capacitaciones y universidades corporativas.',
  keywords: 'tutor lms chile, plataforma e-learning, academia online profesionales, diseño web educativo, moodle alternativo',
};

export default function ELearningPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Desarrollo Academias Online Tutor LMS",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Webunica",
      "image": "https://webunica.cl/wp-content/uploads/2024/01/logo-webunica.png.webp"
    },
    "description": "Plataformas educativas modernas y fáciles de usar para vender cursos online o capacitar personal.",
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
          <div className="flex flex-col items-center text-center mb-20 max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-indigo-600 uppercase bg-indigo-50 rounded-full">
              Educación Digital del Siglo XXI
            </span>
            <h1 className="text-5xl lg:text-[5.5rem] font-extrabold tracking-tight text-zinc-900 leading-[1.0] mb-8">
              Tu Conocimiento, <span className="text-indigo-600">Convertido en Academia</span>
            </h1>
            <p className="text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto mb-10">
              Creamos plataformas LMS con Tutor LMS Pro que te permiten vender tus cursos de forma profesional, con certificados, exámenes e integraciones de pago locales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link
                href="/cotizador-en-linea-desarrollo-web"
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-center hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
              >
                Solicitar Demostración
              </Link>
              <Link
                href="/contacto-desarrollo-diseno-web"
                className="px-8 py-4 bg-white border-2 border-zinc-100 text-zinc-900 rounded-2xl font-bold text-center hover:border-zinc-300 transition-all"
              >
                Ver Ejemplo en Vivo
              </Link>
            </div>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
             <div className="absolute -inset-10 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-[4rem] blur-3xl -z-10" />
             <div className="rounded-[3rem] overflow-hidden border border-zinc-100 shadow-[0_20px_50px_rgba(79,70,229,0.15)]">
               <Image 
                src="/portfolio_elearning_premium_1776264477769.png"
                alt="LMS Dashboard Showcase"
                width={1200}
                height={700}
                className="w-full h-auto"
               />
             </div>
          </div>
        </section>

        {/* Course Features */}
        <section className="bg-zinc-900 py-32 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">Potencia tus <br/><span className="text-indigo-400">cursos online</span></h2>
                <ul className="space-y-6">
                  {[
                    'Generación automática de certificados con tu marca.',
                    'Exámenes y cuestionarios avanzados para tus alumnos.',
                    'Drip Content: libera contenido por goteo programado.',
                    'Múltiples instructores y reportes de ganancias.',
                    'Integración completa con Webpay y Mercado Pago.'
                  ].map((text, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs font-bold text-white">✓</span>
                      </div>
                      <p className="text-lg text-zinc-300">{text}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-6">
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl h-64 flex flex-col justify-end">
                       <p className="text-4xl font-bold mb-2 text-indigo-400">+500</p>
                       <p className="text-zinc-400">Alumnos concurrentes por plataforma</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl h-48 flex flex-col justify-end">
                       <p className="text-4xl font-bold mb-2 text-indigo-400">100%</p>
                       <p className="text-zinc-400">Autogestionable</p>
                    </div>
                 </div>
                 <div className="space-y-6 pt-12">
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl h-48 flex flex-col justify-end">
                       <p className="text-4xl font-bold mb-2 text-indigo-400">4K</p>
                       <p className="text-zinc-400">Video Hosting seguro</p>
                    </div>
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl h-64 flex flex-col justify-end">
                       <p className="text-4xl font-bold mb-2 text-indigo-400">0%</p>
                       <p className="text-zinc-400">Comisiones por ventas</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32">
           <div className="max-w-3xl mx-auto text-center px-6">
              <h2 className="text-3xl lg:text-5xl font-bold text-zinc-900 mb-8">Empieza tu academia hoy mismo</h2>
              <p className="text-xl text-zinc-600 mb-12">No pierdas más tiempo. Somos expertos en Tutor LMS y podemos montar tu plataforma en tiempo récord para que empieces a facturar tus conocimientos.</p>
              <Link
                href="/cotizador-en-linea-desarrollo-web"
                className="inline-block px-12 py-6 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-200"
              >
                Cotizar Proyecto Académico
              </Link>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}