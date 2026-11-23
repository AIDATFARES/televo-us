import '../index.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { SITE_CONFIG } from '../data/config';

export const metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: 'Televo IPTV USA | #1 Premium 4K IPTV Subscription in the US',
    template: '%s | Televo IPTV USA',
  },
  description:
    'Stream 50,000+ live US & international channels, live NFL, NBA, MLB, PPV fight nights, and 200,000+ VOD movies in 4K UHD. Instant 5-min setup, anti-freeze servers & 7-day money-back guarantee.',
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-video-preview': -1,
    'max-image-preview': 'large',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.domain,
    siteName: `${SITE_CONFIG.brandName} - ${SITE_CONFIG.serviceName}`,
    title: 'Televo IPTV USA | Premium 4K IPTV Subscription & Streaming Service',
    description:
      'Discover Televo IPTV in the United States. 50,000+ live TV channels, NFL, NBA, PPV events, 200,000+ VOD movies in 4K UHD with 24/7 WhatsApp support.',
    images: [
      {
        url: `${SITE_CONFIG.domain}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Televo IPTV USA | Premium 4K IPTV Subscription & Streaming Service',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Televo IPTV USA | Premium 4K IPTV Subscription & Streaming Service',
    description:
      'Discover Televo IPTV in the United States. 50,000+ live TV channels, NFL, NBA, PPV events, 200,000+ VOD movies in 4K UHD with 24/7 WhatsApp support.',
    images: [`${SITE_CONFIG.domain}/og-image.png`],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_CONFIG.domain}/#organization`,
        name: SITE_CONFIG.brandName,
        alternateName: SITE_CONFIG.serviceName,
        url: SITE_CONFIG.domain,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_CONFIG.domain}/favicon.svg`,
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            url: SITE_CONFIG.whatsappUrl,
            contactType: 'customer support',
            availableLanguage: 'English',
            areaServed: 'US',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_CONFIG.domain}/#website`,
        url: SITE_CONFIG.domain,
        name: `${SITE_CONFIG.brandName} | ${SITE_CONFIG.serviceName}`,
        description:
          'Televo IPTV USA - Premium IPTV subscription and streaming service in the United States.',
        publisher: {
          '@id': `${SITE_CONFIG.domain}/#organization`,
        },
      },
    ],
  };

  return (
    <html lang="en-US">
      <head>
        <link
          rel="preload"
          as="image"
          href="/hero-bg.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="bg-white text-[#2b3340] antialiased selection:bg-[#0A1E3F] selection:text-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
