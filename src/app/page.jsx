'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Zap,
  MessageSquare,
  ShieldCheck,
  Tv,
  Film,
  Sparkles,
  MonitorPlay,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  X,
} from 'lucide-react';
import {
  SITE_CONFIG,
  PRICING_PLANS,
  MULTI_SCREEN_PLANS,
} from '../data/config';
import PricingSection from '../components/PricingSection';

export default function HomePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [activePreview, setActivePreview] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const stripRef = useRef(null);
  const pauseTimeoutRef = useRef(null);

  const pauseAutoScroll = (duration = 3500) => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, duration);
  };

  const scrollStrip = (direction) => {
    if (stripRef.current) {
      pauseAutoScroll(4000);
      const halfWidth = stripRef.current.scrollWidth / 2;
      if (direction === 'left' && stripRef.current.scrollLeft <= 10 && halfWidth > 0) {
        stripRef.current.scrollLeft += halfWidth;
      }
      const scrollAmount = Math.min(stripRef.current.clientWidth * 0.8, 680);
      stripRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Continuous right-to-left auto-scrolling
  useEffect(() => {
    const container = stripRef.current;
    if (!container) return;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let animationFrameId;
    let lastTime = performance.now();
    const speed = 40; // 40 pixels per second (smooth, comfortable reading speed)

    const step = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!isPaused && !activePreview && container) {
        const halfWidth = container.scrollWidth / 2;
        if (halfWidth > 0) {
          if (container.scrollLeft >= halfWidth) {
            container.scrollLeft -= halfWidth;
          }
          container.scrollLeft += speed * delta;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, activePreview]);

  // 13 Live TV & VOD WebP Previews
  const vodPreviews = [
    {
      id: 1,
      title: 'Top Series & Box Sets',
      category: 'VOD Series',
      badge: '4K Ultra HD',
      image: '/tv-strip/tv-preview-1.webp',
      alt: 'Top Rated 4K TV Series and Box Sets on Televo IPTV',
    },
    {
      id: 2,
      title: 'Cinema Blockbusters',
      category: 'Latest Movies',
      badge: 'Cinema 4K',
      image: '/tv-strip/tv-preview-2.webp',
      alt: 'Latest Hollywood and US Cinema Movies in 4K',
    },
    {
      id: 3,
      title: 'Family & Superhero Hits',
      category: 'Disney+ & Marvel',
      badge: 'UHD 60FPS',
      image: '/tv-strip/tv-preview-3.webp',
      alt: 'Disney+ Marvel and Animation Series Library',
    },
    {
      id: 4,
      title: 'Trending Web & Drama Shows',
      category: 'Prime & HBO Max',
      badge: 'HDR Multi-Audio',
      image: '/tv-strip/tv-preview-4.webp',
      alt: 'Amazon Prime and HBO Max Drama TV Series',
    },
    {
      id: 5,
      title: 'Electronic Program Guide (EPG)',
      category: 'US Live TV',
      badge: '7-Day Catchup',
      image: '/tv-strip/tv-preview-5.webp',
      alt: 'Interactive 7-day TV Guide and EPG interface across EST, CST, MST, PST',
    },
    {
      id: 6,
      title: 'Intuitive Smarters Dashboard',
      category: 'App Interface',
      badge: 'Xtream / M3U',
      image: '/tv-strip/tv-preview-6.webp',
      alt: 'Televo IPTV Smarters Dashboard and channel navigation',
    },
    {
      id: 7,
      title: 'Major US Broadcast Networks',
      category: 'US Live TV',
      badge: '1080p FHD',
      image: '/tv-strip/tv-preview-7.webp',
      alt: 'ABC, CBS, NBC, FOX, PBS, and The CW Live in Full HD',
    },
    {
      id: 8,
      title: '24/7 Rolling News & Documentaries',
      category: 'US & World News',
      badge: 'Live FHD',
      image: '/tv-strip/tv-preview-8.webp',
      alt: 'CNN, Fox News, MSNBC, CNBC, and International News Feeds',
    },
    {
      id: 9,
      title: 'NFL Sunday Ticket & RedZone VIP',
      category: 'US Live Sports',
      badge: '4K 60FPS',
      image: '/tv-strip/tv-preview-9.webp',
      alt: 'NFL Sunday Ticket, RedZone, ESPN, and FOX Sports Live',
    },
    {
      id: 10,
      title: 'NBA, MLB & NHL Matchday Feeds',
      category: 'Major Leagues',
      badge: 'Zero Buffering',
      image: '/tv-strip/tv-preview-10.webp',
      alt: 'NBA League Pass, MLB Extra Innings, and Live Stadium Feeds',
    },
    {
      id: 11,
      title: 'Formula 1 & NASCAR Onboard',
      category: 'Motorsport Live',
      badge: 'Trackside Feeds',
      image: '/tv-strip/tv-preview-11.webp',
      alt: 'NASCAR Cup Series and Formula 1 Live Grand Prix Feeds',
    },
    {
      id: 12,
      title: 'UEFA Champions League & Soccer Feeds',
      category: 'World Soccer',
      badge: 'Match Replays',
      image: '/tv-strip/tv-preview-12.webp',
      alt: 'UEFA Champions League, Premier League, and MLS Catch-Up',
    },
    {
      id: 13,
      title: 'Major UFC, Boxing & WWE PPV Events',
      category: 'PPV Events',
      badge: 'Fight Nights',
      image: '/tv-strip/tv-preview-13.webp',
      alt: 'UFC Main Cards, Championship Boxing PPV, and WWE Stadium Events',
    },
  ];

  // Duplicated for seamless infinite right-to-left auto-scroll
  const allVodPreviews = [...vodPreviews, ...vodPreviews];

  // 8 Compatible Apps matching the 8 cards in #logosNL
  const appsList = [
    { name: 'IPTV Smarters Pro', platform: 'Fire Stick • Android • iOS' },
    { name: 'TiviMate IPTV Player', platform: 'Android TV • Fire Stick 4K' },
    { name: 'IBO Player Pro', platform: 'Samsung Tizen • LG webOS' },
    { name: 'Smart IPTV (SIPTV)', platform: 'Samsung & LG Smart TVs' },
    { name: 'XCIPTV Player', platform: 'Android • Smart Box • Fire TV' },
    { name: 'GSE Smart IPTV', platform: 'Apple iOS • Apple TV' },
    { name: 'IPTVX / Apple TV', platform: 'Apple TV 4K • iPhone • iPad' },
    { name: 'VLC Media Player', platform: 'Windows PC • Mac OS • Linux' },
  ];

  // 7 Compatible Devices for Hero section
  const heroDevices = [
    {
      name: 'Smart TV',
      icon: (
        <svg className="w-7 h-7 text-white" viewBox="0 0 28 24" fill="none">
          <rect x="2" y="2" width="24" height="15" rx="3.5" fill="#ffffff" />
          <path d="M6 17.5v3M22 17.5v3" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: 'Laptop/PC',
      icon: (
        <svg className="w-7 h-7 text-white" viewBox="0 0 28 24" fill="none">
          <rect x="5" y="3" width="18" height="12" rx="3" fill="#ffffff" />
          <rect x="2" y="16.5" width="24" height="4.5" rx="2.2" fill="#ffffff" />
        </svg>
      ),
    },
    {
      name: 'Android',
      icon: (
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.5 15.3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m-11 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m11.4-6l2-3.5a.42.42 0 00-.15-.57.42.42 0 00-.57.15l-2 3.5C15.6 8.4 13.8 8 12 8s-3.6.4-5.1.9L4.8 5.4a.42.42 0 00-.57-.15.42.42 0 00-.15.57l2 3.5C2.7 11.3 0 14.9 0 19h24c0-4.1-2.7-7.7-6.1-9.7" />
        </svg>
      ),
    },
    {
      name: 'Mac',
      icon: (
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 1.01-2.85-.92.04-2.04.62-2.7 1.39-.58.67-1.09 1.74-1.04 2.78 1.03.08 2.11-.57 2.73-1.32z" />
        </svg>
      ),
    },
    {
      name: 'Phones',
      icon: (
        <svg className="w-6 h-7 text-white" viewBox="0 0 20 28" fill="none">
          <rect x="2" y="2" width="16" height="24" rx="4.5" fill="#ffffff" />
          <circle cx="10" cy="22" r="1.3" fill="#0A182F" />
          <rect x="7" y="4.5" width="6" height="1" rx="0.5" fill="#0A182F" />
        </svg>
      ),
    },
    {
      name: 'FireStick',
      icon: (
        <svg className="w-12 h-7 text-white" viewBox="0 0 52 24" fill="none">
          <text x="0" y="14" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-0.5px">fire</text>
          <text x="26" y="14" fill="#ffffff" fontSize="13" fontWeight="400" fontFamily="system-ui, -apple-system, sans-serif">tv</text>
          <path d="M4 18c9 3.8 26 3.8 35 0" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M37.5 16.5l2 1.5-2 1.5" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: 'Formuler',
      icon: (
        <svg className="w-8 h-7 text-white" viewBox="0 0 32 24" fill="currentColor">
          <path d="M9 4h20l-1.8 3.6H11L9 4z" />
          <path d="M7 8.8h16.5l-1.8 3.6H9.3l-3.8 7.6H0L7 8.8z" />
        </svg>
      ),
    },
  ];

  // US Customer Reviews matching .rs-proof-nl grid
  const reviews = [
    {
      name: 'Michael S.',
      city: 'New York, NY',
      text: 'NFL Sunday Ticket and RedZone stream flawlessly in 4K on Verizon Fios. No buffering even during high-traffic Sunday matchups, and the EPG is razor-sharp.',
    },
    {
      name: 'David L.',
      city: 'Los Angeles, CA',
      text: 'Setup on my Fire Stick 4K Max took under 6 minutes using TiviMate. Fantastic picture clarity, fast channel zapping, and responsive WhatsApp support.',
    },
    {
      name: 'Amanda R.',
      city: 'Miami, FL',
      text: 'The 7-day program guide works seamlessly on our Samsung Smart TV. We completely canceled our $140/mo cable bill and never looked back.',
    },
    {
      name: 'Robert C.',
      city: 'Dallas, TX',
      text: 'Switched from an unreliable IPTV provider that kept freezing during college football and UFC fights. Televo IPTV has been rock-solid on AT&T Fiber.',
    },
    {
      name: 'Jennifer K.',
      city: 'Chicago, IL',
      text: 'Got the multi-room family subscription so the kids watch Disney+ on their tablets while we enjoy live basketball in the living room. Incredible value in USD.',
    },
    {
      name: 'Brandon M.',
      city: 'Atlanta, GA',
      text: 'Credentials were delivered to my WhatsApp in under 8 minutes. The support technician helped me configure IPTV Smarters step by step.',
    },
    {
      name: 'Eric W.',
      city: 'Houston, TX',
      text: 'Picture quality in 60 FPS is noticeably better than standard cable TV feeds. Highly recommended for live baseball, hockey, and PPV fights.',
    },
    {
      name: 'Jessica T.',
      city: 'Phoenix, AZ',
      text: 'Massive on-demand movie and TV series library updated weekly with clean English subtitles. Easily the most reliable streaming service we have tested.',
    },
  ];

  // Primary FAQ list for .faq-nl-iptv
  const homeFaqs = [
    {
      q: 'What is Televo IPTV and how does it operate in the USA?',
      a: (
        <>
          Televo IPTV is a premier television streaming service designed specifically for viewers across the United States. It delivers live TV channels, NFL, NBA, MLB, live sports, and a massive on-demand library directly over your home broadband connection. It requires zero satellite dishes, technician appointments, or hardware lease fees—simply install a compatible media player app on your Smart TV, Fire Stick, Apple TV, or mobile with our{' '}
          <Link href="/guide-installation" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
            step-by-step setup guides
          </Link>
          , enter your credentials, and start streaming immediately.
        </>
      ),
    },
    {
      q: 'Which devices and apps are compatible with Televo IPTV?',
      a: (
        <>
          Televo IPTV supports all major streaming hardware used in the United States, including{' '}
          <Link href="/guide-installation/firestick" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
            Amazon Fire TV Stick &amp; Cube
          </Link>
          ,{' '}
          <Link href="/guide-installation/samsung-smart-tv" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
            Samsung Smart TV
          </Link>
          ,{' '}
          <Link href="/guide-installation/lg-smart-tv" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
            LG Smart TV
          </Link>
          , Android TV / Google TV (Sony, TCL, Hisense, Nvidia Shield), Apple TV 4K, iPhone, iPad, and Windows/Mac computers. Popular compatible apps include IPTV Smarters Pro, TiviMate, IBO Player, and XCIPTV.
        </>
      ),
    },
    {
      q: 'How quickly will I receive my login details after ordering?',
      a: (
        <>
          Your Televo IPTV digital connection details (including Server URL, Username, Password, and M3U playlist link) are generated and delivered via WhatsApp and email typically within 5 to 15 minutes of payment confirmation on our{' '}
          <Link href="/subscription" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
            IPTV subscription page
          </Link>
          .
        </>
      ),
    },
    {
      q: 'Does Televo IPTV work well with US broadband providers?',
      a: (
        <>
          Yes. Our high-bandwidth streaming servers are routed through North American enterprise edge clusters optimized for US internet service providers such as Comcast Xfinity, AT&amp;T Fiber, Spectrum (Charter), Verizon Fios, Cox, Optimum, and T-Mobile 5G Home to eliminate ISP throttling and buffering, as explained on our{' '}
          <Link href="/about" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
            about us page
          </Link>
          .
        </>
      ),
    },
    {
      q: 'Can I watch on multiple televisions at the same time?',
      a: (
        <>
          Our standard subscription plans include 1 active connection. For households requiring simultaneous viewing on multiple screens in different rooms, we provide dedicated{' '}
          <Link href="/pricing" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
            Multi-Screen Family Plans
          </Link>{' '}
          (supporting 2, 3, or 4 simultaneous devices).
        </>
      ),
    },
    {
      q: 'What is your 7-day money-back guarantee policy?',
      a: (
        <>
          We want every US viewer to try Televo IPTV with absolute confidence. If our service does not meet your technical expectations within your first 7 days of activation, simply review our{' '}
          <Link href="/refund-policy" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
            7-day refund policy
          </Link>{' '}
          and message our customer support team on WhatsApp for a prompt refund.
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* ─── 1. HERO SECTION (.aii-hero) ─── */}
      <section className="aii-hero">
        <div className="aii-wrap">
          <div className="aii-inner">
            <div className="aii-content">
              {/* Status Badge with US pulse dot */}
              <div className="aii-badge">
                <i></i>
                <span>Televo IPTV USA Active Delivery — Instant 5-15 Min Setup 🇺🇸</span>
              </div>

              {/* Main Title with t1 and t2 */}
              <h1 className="aii-title">
                <span className="t1">Televo IPTV — The #1 Rated IPTV Service in the USA</span>
                <span className="t2">Ultra HD 4K Live TV, NFL, NBA, Premier Sports &amp; 200,000+ Movies On-Demand</span>
              </h1>

              {/* Subtitle */}
              <p className="aii-sub">
                Discover a seamless streaming experience with <Link href="/about" className="font-bold text-sky-300 underline underline-offset-2 hover:text-white">Televo IPTV</Link>. Unlock 50,000+ live television channels, live NFL, NBA, MLB, college football, motorsport, complete 7-day US EPG schedules, and over <Link href="#vod-rails" className="font-semibold text-sky-300 underline underline-offset-2 hover:text-white">200,000 on-demand titles</Link> in 4K UHD. Enjoy contract-free viewing with our <Link href="/subscription" className="font-semibold text-sky-300 underline underline-offset-2 hover:text-white">US IPTV plans</Link> tailored for American broadband with zero hardware required.
              </p>

              {/* CTA Row */}
              <div className="aii-cta-row">
                <a
                  href={`${SITE_CONFIG.whatsappBaseUrl}?text=Hello%20Televo%20IPTV%2C%20I%20would%20like%20to%20request%20a%20free%20trial.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-trial-green"
                >
                  <svg
                    className="w-5 h-5 text-slate-950 shrink-0 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Start Free Trial</span>
                </a>
                <a href="#aii-pricing" className="btn-plan-dark">
                  <span>Explore IPTV Plans</span>
                  <ChevronRight className="w-4 h-4 text-[#00E5FF] stroke-[3] ml-1 shrink-0" />
                </a>
              </div>

              {/* Compatible Devices Strip */}
              <div className="hero-devices-strip">
                {heroDevices.map((dev, i) => (
                  <div key={i} className="hero-device-item">
                    <div className="hero-device-icon">{dev.icon}</div>
                    <span className="hero-device-name">{dev.name}</span>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="trust">
                <span>🔒 Instant Secure Activation</span>
                <span>•</span>
                <span>🇺🇸 Xfinity, Spectrum &amp; AT&amp;T Fiber Ready</span>
                <span>•</span>
                <span>⚡ 99.9% Anti-Freeze Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. VOD & 4K CINEMA (#vod-rails) ─── */}
      <section id="vod-rails">
        <div className="wrap">
          <h2>Televo IPTV On-Demand: 200,000+ 4K Cinema Movies &amp; TV Box Sets</h2>
          <div className="us-underline"></div>
          <p className="seo">
            Preview live app interfaces from the Televo IPTV network across our{' '}
            <Link href="/guide-installation" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
              supported streaming apps
            </Link>
            . Explore over 50,000 live channels, cinema-grade 4K VOD blockbusters, complete box sets, and ultra-smooth 60 FPS sports streams with our{' '}
            <Link href="/subscription" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
              high-speed IPTV packages
            </Link>{' '}
            designed for zero buffering.
          </p>

          {/* 4 Stats Cards */}
          <div className="vod-stats-grid">
            <div className="vod-stat-box">
              <span className="vod-stat-val">4K &amp; FHD</span>
              <span className="vod-stat-lbl">Ultra High Definition Streams</span>
            </div>
            <div className="vod-stat-box">
              <span className="vod-stat-val">50,000+</span>
              <span className="vod-stat-lbl">Live TV Channels</span>
            </div>
            <div className="vod-stat-box">
              <span className="vod-stat-val">200,000+</span>
              <span className="vod-stat-lbl">VOD Movies &amp; Series</span>
            </div>
            <div className="vod-stat-box">
              <span className="vod-stat-val">99.9%</span>
              <span className="vod-stat-lbl">Infrastructure Server Uptime</span>
            </div>
          </div>

          {/* Image Strip Controls Header */}
          <div className="vod-strip-header">
            <div className="vod-strip-badge">
              <span>🎬 200,000+ 4K UHD Movies &amp; Box Sets</span>
            </div>
            <div className="vod-strip-nav">
              <button
                type="button"
                onClick={() => scrollStrip('left')}
                className="vod-nav-btn"
                aria-label="Scroll left"
                title="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollStrip('right')}
                className="vod-nav-btn"
                aria-label="Scroll right"
                title="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal Image Strip with Right-to-Left Auto-Scroll */}
          <div
            className="vod-strip-container"
            ref={stripRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => pauseAutoScroll(2500)}
          >
            {allVodPreviews.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="vod-strip-card"
                onClick={() => setActivePreview(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActivePreview(item);
                  }
                }}
              >
                <div className="vod-strip-thumb">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    width={1280}
                    height={720}
                  />
                  <div className="vod-strip-overlay">
                    <span className="vod-overlay-zoom">
                      <Maximize2 className="w-4 h-4" />
                      <span>Preview</span>
                    </span>
                  </div>
                  <span className="vod-badge-top">{item.badge}</span>
                </div>
                <div className="vod-strip-info">
                  <span className="vod-card-cat">{item.category}</span>
                  <h3 className="vod-card-title">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal / Lightbox for Preview */}
        {activePreview && (
          <div
            className="vod-modal-backdrop"
            onClick={() => setActivePreview(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="vod-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="vod-modal-close"
                onClick={() => setActivePreview(null)}
                aria-label="Close preview"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="vod-modal-media">
                <img
                  src={activePreview.image}
                  alt={activePreview.alt}
                  width={1280}
                  height={720}
                />
              </div>
              <div className="vod-modal-footer">
                <div>
                  <span className="vod-modal-cat">{activePreview.category}</span>
                  <h4 className="vod-modal-title">{activePreview.title}</h4>
                </div>
                <span className="vod-modal-badge">{activePreview.badge}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─── 3. COMBINED SUBSCRIPTION PRICING WITH DEVICE COUNTER (#aii-pricing) ─── */}
      <PricingSection />

      {/* ─── 4. 3-STEP ORDER PROCESS (.aii-buy) ─── */}
      <section className="aii-buy">
        <div className="wrap">
          <h2 className="h2">How to Start Streaming with Televo IPTV in 3 Simple Steps</h2>
          <div className="us-underline"></div>
          <p className="sub">
            Set up your <Link href="/subscription" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">Televo IPTV subscription</Link> in minutes on any television, media streamer, or mobile device through our <Link href="/guide-installation" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">step-by-step setup tutorials</Link>—no technician visits, cable box fees, or contracts required.
          </p>

          <div className="aii-steps">
            <div className="aii-step">
              <div className="aii-num">1</div>
              <h3 className="text-lg font-black text-[#0A1E3F] mb-2">Select Your IPTV Plan</h3>
              <p>
                Choose the <Link href="/pricing" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">subscription duration and screen package</Link> (3, 6, or 12 months) that matches your household. Order securely in USD with no recurring direct debits or contract lock-ins.
              </p>
            </div>

            <div className="aii-step">
              <div className="aii-num">2</div>
              <h3 className="text-lg font-black text-[#0A1E3F] mb-2">Receive Instant Login Details</h3>
              <p>
                Our team generates your unique Televo IPTV credentials—including <Link href="/guide-installation" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">M3U playlists and Xtream Codes API details</Link>—delivered straight to WhatsApp or email in 5 to 15 minutes.
              </p>
            </div>

            <div className="aii-step">
              <div className="aii-num">3</div>
              <h3 className="text-lg font-black text-[#0A1E3F] mb-2">Connect &amp; Stream in 4K Ultra HD</h3>
              <p>
                Launch your favorite player on your <Link href="/guide-installation/firestick" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">Fire Stick</Link>, <Link href="/guide-installation/samsung-smart-tv" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">Smart TV</Link>, smartphone, or PC, input your credentials, and start enjoying buffer-free live sports and entertainment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. CORE ADVANTAGES (.aii-sec3) ─── */}
      <section className="aii-sec3">
        <div className="wrap">
          <h2 className="h2">Why US Viewers Choose Televo IPTV for Everyday Streaming</h2>
          <div className="us-underline"></div>
          <p className="sub">
            Built specifically for American households seeking dependable <Link href="/subscription" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">4K IPTV entertainment</Link> without satellite dishes, long-term contracts, or overpriced cable packages.
          </p>

          <div className="trust">
            <span className="badge">🇺🇸 Optimized for Comcast Xfinity, AT&amp;T Fiber, Spectrum &amp; Verizon Fios</span>
            <span className="flag-chip">⭐ Rated 4.9/5 by US Customers</span>
          </div>

          <div className="grid">
            <div className="card">
              <h3>
                <span className="tick">✓</span>
                Crystal-Clear 4K UHD &amp; 60 FPS Sports Streams
              </h3>
              <p>
                Watch NFL Sunday Ticket, NBA, MLB, NHL, UFC PPVs, and <Link href="#vod-rails" className="text-sky-300 font-semibold underline underline-offset-2 hover:text-white">cinema blockbusters</Link> in fluid 60 FPS with brilliant HDR clarity and zero screen tearing.
              </p>
            </div>

            <div className="card">
              <h3>
                <span className="tick">✓</span>
                Anti-Freeze Network &amp; 99.9% Uptime
              </h3>
              <p>
                Our high-speed US server infrastructure with intelligent load balancing prevents buffering, detailed further in our <Link href="/blog/how-to-stop-iptv-buffering-guide" className="text-sky-300 font-semibold underline underline-offset-2 hover:text-white">anti-buffering guide</Link>.
              </p>
            </div>

            <div className="card">
              <h3>
                <span className="tick">✓</span>
                Flexible M3U &amp; Xtream Codes API
              </h3>
              <p>
                Standardized login credentials delivered within minutes. Connect easily with any certified player application using our <Link href="/guide-installation" className="text-sky-300 font-semibold underline underline-offset-2 hover:text-white">installation instructions</Link>.
              </p>
            </div>

            <div className="card">
              <h3>
                <span className="tick">✓</span>
                Interactive 7-Day US TV EPG Guide
              </h3>
              <p>
                Stay ahead with real-time program schedules across all US time zones (EST, CST, MST, PST), supported by our comprehensive <Link href="/faq" className="text-sky-300 font-semibold underline underline-offset-2 hover:text-white">EPG &amp; catch-up FAQ</Link>.
              </p>
            </div>

            <div className="card">
              <h3>
                <span className="tick">✓</span>
                Universal Multi-Device Freedom
              </h3>
              <p>
                Stream seamlessly across <Link href="/guide-installation/firestick" className="text-sky-300 font-semibold underline underline-offset-2 hover:text-white">Fire Stick</Link>, <Link href="/guide-installation/samsung-smart-tv" className="text-sky-300 font-semibold underline underline-offset-2 hover:text-white">Samsung TV</Link>, <Link href="/guide-installation/lg-smart-tv" className="text-sky-300 font-semibold underline underline-offset-2 hover:text-white">LG webOS</Link>, Apple TV, Android TV, and PC.
              </p>
            </div>

            <div className="card">
              <h3>
                <span className="tick">✓</span>
                7-Day Money-Back Satisfaction Guarantee
              </h3>
              <p>
                Experience Televo IPTV risk-free under our transparent <Link href="/refund-policy" className="text-sky-300 font-semibold underline underline-offset-2 hover:text-white">7-day refund policy</Link>. If technical specialists cannot resolve an issue, receive a prompt refund.
              </p>
            </div>
          </div>

          <a href="#aii-pricing" className="cta">
            ⚡ Explore Televo IPTV Subscription Plans
          </a>
        </div>
      </section>

      {/* ─── 7. HOW IT WORKS (.aii-how) ─── */}
      <section className="aii-how">
        <div className="wrap">
          <h2>How the Televo IPTV Streaming Infrastructure Works</h2>
          <div className="us-underline"></div>
          <p className="sub">
            Modern cloud architecture and dedicated US server routing deliver high-fidelity television streams straight to your internet-connected devices, detailed on our <Link href="/about" className="text-sky-300 font-semibold underline underline-offset-2 hover:text-white">about us page</Link>.
          </p>

          <div className="aii-grid">
            <div className="aii-card">
              <div className="aii-num">1</div>
              <h3>High-Bandwidth Cloud Distribution</h3>
              <p>
                Streams are distributed through enterprise North American edge clusters engineered specifically for American broadband networks (Xfinity, Spectrum, AT&amp;T, Verizon, and Cox) to eliminate latency and bandwidth throttling.
              </p>
              <ul>
                <li>Direct fiber backbone connectivity</li>
                <li>Adaptive bitrate auto-scaling</li>
                <li>Zero hardware rental fees</li>
              </ul>
            </div>

            <div className="aii-card">
              <div className="aii-num">2</div>
              <h3>Universal Xtream Codes &amp; M3U Architecture</h3>
              <p>
                Televo IPTV supports industry-standard streaming protocols, granting you total freedom to connect your favorite player app without proprietary hardware restrictions via our <Link href="/guide-installation" className="text-sky-300 font-semibold underline underline-offset-2 hover:text-white">universal setup guides</Link>.
              </p>
              <ul>
                <li>Compatible with IPTV Smarters &amp; TiviMate</li>
                <li>Full EPG electronic guide sync</li>
                <li>Catch-up TV integration</li>
              </ul>
            </div>

            <div className="aii-card">
              <div className="aii-num">3</div>
              <h3>Dedicated 24/7 Customer &amp; Technical Support</h3>
              <p>
                From initial player installation to fine-tuning stream buffer settings, our friendly support team guides you personally via WhatsApp 24/7 through our <Link href="/contact" className="text-sky-300 font-semibold underline underline-offset-2 hover:text-white">contact &amp; customer care desk</Link>.
              </p>
              <ul>
                <li>Instant response times</li>
                <li>Free setup troubleshooting</li>
                <li>Live human support specialists</li>
              </ul>
            </div>
          </div>

          <div className="aii-cta">
            <a href="#aii-pricing" className="aii-btn price">
              Compare Pricing Plans (USD)
            </a>
            <Link href="/guide-installation" className="aii-btn faq">
              Explore Setup Guides
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 8. COMPARISON TABLE (.rs-compare) ─── */}
      <section className="rs-compare">
        <div className="comparison-section">
          <div className="section-header">
            <h2>How Televo IPTV Compares to Standard Streaming Services</h2>
            <div className="us-underline"></div>
          </div>

          <div className="comparison-container">
            <div className="comparison-scroll">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Feature &amp; Service Criteria</th>
                    <th className="rs-header">Televo IPTV USA</th>
                    <th>Standard Providers</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Instant Digital Activation</td>
                    <td className="check-cell">✔ 5 – 15 Minutes</td>
                    <td className="x-cell">✖ Hours or Days</td>
                  </tr>
                  <tr>
                    <td>US Broadband Optimization (Xfinity, Spectrum, AT&amp;T)</td>
                    <td className="check-cell">✔ Anti-Buffering CDN</td>
                    <td className="x-cell">✖ Frequent Freezing</td>
                  </tr>
                  <tr>
                    <td>24/7 Customer Care &amp; WhatsApp Support</td>
                    <td className="check-cell">✔ Real Humans 24/7</td>
                    <td className="x-cell">✖ Automated / Slow Bots</td>
                  </tr>
                  <tr>
                    <td>7-Day Money-Back Guarantee</td>
                    <td className="check-cell">✔ Risk-Free Refund</td>
                    <td className="x-cell">✖ No Refunds Given</td>
                  </tr>
                  <tr>
                    <td>Complete 7-Day US EPG Schedule</td>
                    <td className="check-cell">✔ Included Free</td>
                    <td className="x-cell">✖ Unstable / Missing</td>
                  </tr>
                  <tr>
                    <td>Multi-Screen Family Options</td>
                    <td className="check-cell">✔ 2, 3 &amp; 4 Screens</td>
                    <td className="x-cell">✖ 1 Screen Only / High Fees</td>
                  </tr>
                  <tr>
                    <td>4K UHD &amp; 60 FPS Sports Feeds</td>
                    <td className="check-cell">✔ Crystal-Clear Clarity</td>
                    <td className="x-cell">✖ Compressed 720p Cable</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="user-benefits">
            <div className="benefit-card">
              <Zap className="w-8 h-8 text-[#0A1E3F] mx-auto mb-2" />
              <h3>Ultra-Low Latency &amp; High Speed</h3>
              <p>
                Optimized North American data routing delivers smooth live football, basketball, and hockey with zero buffering, available on all our{' '}
                <Link href="/subscription" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
                  annual and monthly subscriptions
                </Link>
                .
              </p>
            </div>
            <div className="benefit-card">
              <ShieldCheck className="w-8 h-8 text-[#0A1E3F] mx-auto mb-2" />
              <h3>Clear, Fixed Pricing in US Dollars</h3>
              <p>
                Prepaid subscriptions in USD with no hidden cable box rentals, broadcast fees, or surprise bills, detailed on our{' '}
                <Link href="/pricing" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
                  pricing page
                </Link>
                .
              </p>
            </div>
            <div className="benefit-card">
              <MessageSquare className="w-8 h-8 text-[#0A1E3F] mx-auto mb-2" />
              <h3>Dedicated US Customer Care</h3>
              <p>
                Real human support specialists available 24/7 on WhatsApp to assist with setup, apps, and inquiries through our{' '}
                <Link href="/contact" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
                  customer care team
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. COMPATIBLE APPS SECTION (#logosNL) ─── */}
      <section id="logosNL">
        <div className="w">
          <h2>Connect Televo IPTV on Your Preferred Streaming Apps</h2>
          <div className="us-underline"></div>
          <p>
            Televo IPTV integrates effortlessly with all top-tier IPTV player apps. Use your Xtream Codes credentials or M3U playlist URL on your television, tablet, or phone with our{' '}
            <Link href="/guide-installation" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
              device installation guides
            </Link>
            .
          </p>

          <div className="g">
            {appsList.map((app, i) => (
              <div key={i} className="t">
                <MonitorPlay className="w-5 h-5 text-[#0854c4] shrink-0" />
                <div className="text-left">
                  <div className="text-sm font-black text-[#0A1E3F]">{app.name}</div>
                  <div className="text-[11px] text-slate-700 font-semibold">{app.platform}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/guide-installation"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0A1E3F] underline underline-offset-4 hover:text-[#0854c4] transition-colors"
            >
              Need step-by-step guidance for your television? Visit the Televo IPTV Setup Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 11. US CUSTOMER REVIEWS (.rs-proof-nl) ─── */}
      <section className="rs-proof-nl">
        <div className="rs-proof-inner">
          <h2 className="rs-proof-title">What US Subscribers Say About Televo IPTV</h2>
          <div className="us-underline"></div>
          <p className="rs-proof-sub">
            Discover why thousands of households across New York, Los Angeles, Chicago, Houston, Dallas, Miami, Atlanta, and beyond rely on{' '}
            <Link href="/subscription" className="text-emerald-300 font-semibold underline hover:text-white">
              Televo IPTV subscriptions
            </Link>{' '}
            for their daily entertainment.
          </p>

          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rs-wa-cta"
          >
            💬 Order or Ask a Question on WhatsApp
          </a>

          <div className="rs-t-grid">
            {reviews.map((rev, i) => (
              <div key={i} className="rs-t-card">
                <div className="rs-t-top">
                  <span className="rs-stars">★★★★★</span>
                  <span className="rs-chip">Verified US User</span>
                </div>
                <p className="rs-txt">"{rev.text}"</p>
                <div className="rs-author">
                  <span>{rev.name}</span>
                  <span className="rs-loc">{rev.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 12. FAQ ACCORDION + SIDEBAR (.faq-nl-iptv) ─── */}
      <section className="faq-nl-iptv">
        <div className="faq-wrap">
          <div className="faq-head">
            <h2>Frequently Asked Questions About Televo IPTV</h2>
            <div className="us-underline"></div>
            <p>
              Everything you need to know about{' '}
              <Link href="/pricing" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
                Televo IPTV plans
              </Link>
              ,{' '}
              <Link href="/guide-installation" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
                compatible streaming apps
              </Link>
              , broadband stability, and quick activation.
            </p>
          </div>

          <div className="faq-grid">
            <div className="faq-col">
              {homeFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="faq-item">
                    <summary
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      className="cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#0A1E3F] transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </summary>
                    {isOpen && <div className="faq-body">{faq.a}</div>}
                  </div>
                );
              })}
            </div>

            <div className="cta-box">
              <h3>Need Personal Help Setting Up Televo IPTV?</h3>
              <p>
                Our US technical specialists are on standby via WhatsApp 24/7 to help you configure any television, streaming stick, or media player via our{' '}
                <Link href="/contact" className="text-blue-200 font-semibold underline hover:text-white">
                  dedicated support desk
                </Link>
                .
              </p>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn email-btn"
              >
                💬 Chat on WhatsApp
              </a>
              <Link href="/guide-installation" className="cta-btn-secondary">
                📖 View All Installation Guides
              </Link>
              <ul className="cta-points">
                <li>Average WhatsApp response time: 3 mins</li>
                <li>Free setup help for Smart TVs &amp; Fire Stick</li>
                <li>M3U playlist &amp; Xtream Codes verification</li>
                <li>7-day money-back guarantee support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 13. FINAL PARALLAX CTA BANNER (.final-cta-nl) ─── */}
      <section className="final-cta-nl">
        <div className="final-cta-inner">
          <h2 className="final-cta-title">
            Upgrade Your Entertainment with <span className="hi">Televo IPTV</span> Today
          </h2>
          <p className="final-cta-sub">
            Join thousands of happy US viewers enjoying 50,000+ live channels, 4K sports, and{' '}
            <Link href="#vod-rails" className="text-cyan-300 font-semibold underline hover:text-white">
              200,000+ on-demand titles
            </Link>{' '}
            with instant activation and our risk-free{' '}
            <Link href="/refund-policy" className="text-cyan-300 font-semibold underline hover:text-white">
              7-day money-back guarantee
            </Link>
            .
          </p>
          <a href="#aii-pricing" className="final-cta-btn">
            ⚡ Choose Your Televo IPTV Plan
          </a>
        </div>
      </section>
    </div>
  );
}
