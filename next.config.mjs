/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Firestick redirects
      {
        source: '/blog/televo-iptv-firestick-setup-guide',
        destination: '/blog/how-to-install-iptv-on-amazon-firestick',
        permanent: true,
      },
      {
        source: '/blog/how-to-setup-iptv-on-firestick',
        destination: '/blog/how-to-install-iptv-on-amazon-firestick',
        permanent: true,
      },
      {
        source: '/blog/install-iptv-firestick',
        destination: '/blog/how-to-install-iptv-on-amazon-firestick',
        permanent: true,
      },
      // Samsung redirects
      {
        source: '/blog/how-to-set-up-televo-iptv-samsung-smart-tv',
        destination: '/blog/how-to-install-iptv-on-samsung-smart-tv',
        permanent: true,
      },
      {
        source: '/blog/how-to-setup-iptv-on-samsung-smart-tv',
        destination: '/blog/how-to-install-iptv-on-samsung-smart-tv',
        permanent: true,
      },
      {
        source: '/blog/install-iptv-samsung-tv',
        destination: '/blog/how-to-install-iptv-on-samsung-smart-tv',
        permanent: true,
      },
      // Buffering redirects
      {
        source: '/blog/how-to-fix-iptv-buffering-troubleshooting-guide',
        destination: '/blog/how-to-stop-iptv-buffering-guide',
        permanent: true,
      },
      {
        source: '/blog/how-to-fix-iptv-buffering',
        destination: '/blog/how-to-stop-iptv-buffering-guide',
        permanent: true,
      },
      // Players redirects
      {
        source: '/blog/best-iptv-players-smart-tv-uk',
        destination: '/blog/best-iptv-player-apps-smart-tv-firestick',
        permanent: true,
      },
      {
        source: '/blog/best-iptv-players-for-smart-tv',
        destination: '/blog/best-iptv-player-apps-smart-tv-firestick',
        permanent: true,
      },
      {
        source: '/blog/best-iptv-players',
        destination: '/blog/best-iptv-player-apps-smart-tv-firestick',
        permanent: true,
      },
      {
        source: '/blog/best-iptv-players-2026',
        destination: '/blog/best-iptv-player-apps-smart-tv-firestick',
        permanent: true,
      },
      // Setup master guide redirects
      {
        source: '/blog/complete-uk-iptv-setup-guide-televo',
        destination: '/blog/complete-master-us-iptv-setup-guide',
        permanent: true,
      },
      {
        source: '/blog/complete-uk-iptv-setup-guide',
        destination: '/blog/complete-master-us-iptv-setup-guide',
        permanent: true,
      },
      {
        source: '/blog/complete-us-iptv-setup-guide',
        destination: '/blog/complete-master-us-iptv-setup-guide',
        permanent: true,
      },
      {
        source: '/blog/complete-iptv-setup-guide',
        destination: '/blog/complete-master-us-iptv-setup-guide',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
