/**
 * SchemaMarkup — Datos estructurados JSON-LD para visibilidad en IA y motores de búsqueda.
 *
 * POR QUÉ JSON-LD EN <head> VÍA LA API head() DE LA RUTA:
 * Renderizar una etiqueta <script> dentro del árbol de componentes React funciona,
 * pero la coloca en <body>. Inyectarla a través de la función head() de TanStack Router
 * la coloca en <head>, que es donde los crawlers (Google, Bing, agentes de IA como
 * ChatGPT Search, Perplexity) esperan encontrar los datos estructurados. También se
 * analiza antes que cualquier contenido del body, por lo que no hay impacto en el
 * renderizado.
 *
 * USO — agregar esto al valor de retorno de head() de cualquier ruta:
 *
 *   import { schemaMarkupScript } from "@/components/SchemaMarkup";
 *
 *   export const Route = createFileRoute("/")({
 *     head: () => ({
 *       meta: [...],
 *       scripts: [schemaMarkupScript],
 *     }),
 *   });
 */

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://jfbarrios.com/#person",
      name: "Juan Fernando Barrios",
      alternateName: "Fernando Barrios",
      jobTitle: "Arquitecto de Software",
      description:
        "Ingeniero de software con más de 14 años de experiencia diseñando e implementando soluciones Full Stack robustas, escalables y de alto impacto. Actualmente como Software Architect, liderando equipos y arquitecturas en startups, banca y empresas de salud.",
      url: "https://jfbarrios.com",
      image: "https://jfbarrios.com/avatar.webp",
      email: "me@jfbarrios.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ciudad de Guatemala",
        addressRegion: "Departamento de Guatemala",
        addressCountry: "GT",
      },
      sameAs: [
        "https://www.linkedin.com/in/jfbarrios/",
        "https://github.com/jfernandogt",
        "https://x.com/jfergt",
      ],
      knowsAbout: [
        "Arquitectura de Software",
        "Desarrollo Full Stack",
        "React",
        "TypeScript",
        "Node.js",
        "TanStack",
        "Desarrollo de Aplicaciones Móviles",
        "Flutter",
        "React Native",
        "Docker",
        "Microservicios",
        "Proxmox",
        "Liderazgo Técnico",
      ],
    },
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": "https://jfbarrios.com/#business",
      name: "Fernando Barrios — Arquitectura y Desarrollo de Software",
      founder: { "@id": "https://jfbarrios.com/#person" },
      description:
        "Servicios especializados en desarrollo de software, arquitectura de sistemas, creación de sitios web, landing pages y aplicaciones móviles. Más de 14 años construyendo soluciones tecnológicas robustas y escalables en Guatemala.",
      url: "https://jfbarrios.com",
      email: "me@jfbarrios.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ciudad de Guatemala",
        addressCountry: "GT",
      },
      areaServed: ["GT", "US", "CA"],
      priceRange: "$$",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios Tecnológicos",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Desarrollo de Aplicaciones Móviles",
              description:
                "Aplicaciones móviles multiplataforma para iOS y Android con Flutter y React Native.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Arquitectura de Software y Consultoría Técnica",
              description:
                "Diseño de sistemas, liderazgo técnico y consultoría de arquitectura para startups y empresas.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Desarrollo de Landing Pages de Alto Rendimiento",
              description:
                "Sitios web y landing pages de alto rendimiento construidos con React, Vite y TanStack.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Desarrollo de Aplicaciones Web",
              description:
                "Aplicaciones web modernas con React y TanStack, enfocadas en rendimiento y escalabilidad.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Desarrollo de Backend con Node.js",
              description:
                "APIs y servicios backend robustos con Node.js y arquitecturas de microservicios.",
            },
          },
        ],
      },
    },
  ],
};

/**
 * Descriptor de script listo para usar con la API head() de TanStack Router.
 *
 * Inyectar vía:
 *   head: () => ({ scripts: [schemaMarkupScript] })
 *
 * Esto coloca el bloque JSON-LD dentro de <head> sin sobrecarga en tiempo de ejecución —
 * se serializa una vez en tiempo de compilación/solicitud, nunca re-evaluado por React.
 */
export const schemaMarkupScript = {
  type: "application/ld+json",
  children: JSON.stringify(schemaData),
} as const;
