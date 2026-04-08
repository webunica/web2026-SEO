import React from 'react';

interface StructuredDataProps {
  type: string;
  data: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": type,
          ...data,
        }),
      }}
    />
  );
}

/** Helper: builds a rich House/Residence JSON-LD object from model data */
export function buildModelJsonLd(modelo: {
  nombre: string;
  descripcion?: string | null;
  imagenes_urls?: string[];
  precio_desde_uf?: number;
  superficie_m2?: number;
  dormitorios?: number;
  banos?: number;
  pisos?: number;
  tiempo_entrega?: string | null;
  garantia_anos?: number | null;
  recintos?: string[] | null;
  tipo?: string;
  uso?: string | null;
  terminaciones?: Record<string, string> | null;
  aislacion?: { calificacion_energetica?: string } | null;
  slug: string;
  constructora?: {
    nombre?: string;
    sitio_web?: string | null;
    logo_url?: string | null;
  } | null;
}) {
  const baseUrl = 'https://webunica.cl';
  const amenities: any[] = [];

  // Add terminaciones as amenity features
  if (modelo.terminaciones) {
    const labels: Record<string, string> = {
      ventanas: 'Ventanas',
      puertas_exteriores: 'Puerta exterior',
      cocina: 'Cocina equipada',
      bano_principal: 'Baño principal',
      pisos: 'Pisos',
      climatizacion: 'Climatización',
    };
    for (const [k, label] of Object.entries(labels)) {
      const val = (modelo.terminaciones as any)[k];
      if (val) {
        amenities.push({
          "@type": "LocationFeatureSpecification",
          "name": label,
          "value": val,
        });
      }
    }
  }

  // Energy class
  if (modelo.aislacion?.calificacion_energetica) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      "name": "Calificación Energética",
      "value": modelo.aislacion.calificacion_energetica,
    });
  }

  // Recintos
  if (modelo.recintos?.length) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      "name": "Recintos incluidos",
      "value": modelo.recintos.join(", "),
    });
  }

  const jsonLd: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": modelo.nombre,
    "description": modelo.descripcion || undefined,
    "url": `${baseUrl}/modelo/${modelo.slug}`,
    "image": modelo.imagenes_urls?.[0] || undefined,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "CLF",
      "price": modelo.precio_desde_uf,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Webunica Chile",
        "url": "https://webunica.cl"
      },
    },
  };

  // Clean undefined values
  Object.keys(jsonLd).forEach(k => jsonLd[k] === undefined && delete jsonLd[k]);

  return jsonLd;
}

/** Helper: builds a BreadcrumbList JSON-LD */
export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

/** Helper: builds an Organization JSON-LD for the homepage */
export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Webunica Chile",
    "url": "https://webunica.cl",
    "logo": "https://webunica.cl/favicon.png",
    "description": "Expertos en Diseño Web Shopify Chile. Creamos tiendas online de alto rendimiento con integraciones locales.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contacto@webunica.cl",
      "availableLanguage": "Spanish",
    },
    "areaServed": { "@type": "Country", "name": "Chile" },
  };
}

/** Helper: builds a WebSite JSON-LD with SearchAction (sitelinks searchbox) */
export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Webunica Chile",
    "url": "https://webunica.cl",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://webunica.cl/portafolio?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Helper: builds a FAQPage JSON-LD */
export function buildFAQJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}
