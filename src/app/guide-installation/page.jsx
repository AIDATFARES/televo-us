import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  CheckCircle2,
  Tv,
} from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import { SUPPORTED_DEVICES, SITE_CONFIG } from '../../data/config';

export const metadata = {
  title: 'Televo IPTV Installation Guide | Setup Fire Stick, Smart TV & Android',
  description:
    'Complete setup guides for Televo IPTV in the USA. Step-by-step installation tutorials for Samsung Smart TV, LG TV, Amazon Fire Stick, Android TV, Apple TV, iOS, and PC in under 5 minutes.',
  alternates: {
    canonical: '/guide-installation',
  },
};

export default function InstallationHubPage() {
  const breadcrumbsList = [
    { name: 'Installation Center', path: '/guide-installation' },
  ];

  return (
    <div className="pt-4 pb-12 sm:pt-6 bg-white min-h-screen text-[#2b3340]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbsList} />

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0A1E3F] text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Updated for 2026 • Beginner-Friendly Setup 🇺🇸
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0A1E3F] tracking-tight">
            Televo IPTV Device Setup &amp; Installation Guides
          </h1>
          <div className="us-underline"></div>
          <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
            Set up your{' '}
            <Link href="/subscription" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
              Televo IPTV subscription
            </Link>{' '}
            in under 5 minutes. Browse our step-by-step US installation tutorials for{' '}
            <Link href="/guide-installation/firestick" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
              Amazon Fire Stick
            </Link>
            ,{' '}
            <Link href="/guide-installation/samsung-smart-tv" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
              Samsung Smart TV
            </Link>
            ,{' '}
            <Link href="/guide-installation/lg-smart-tv" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
              LG webOS
            </Link>
            , Apple TV, Android TV, and more.
          </p>
        </div>

        {/* Device Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SUPPORTED_DEVICES.map((dev) => (
            <Link
              key={dev.slug}
              href={`/guide-installation/${dev.slug}`}
              className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {dev.category}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    ⏱ {dev.setupTime}
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#0A1E3F] group-hover:text-blue-600 transition-colors">
                  {dev.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {dev.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {dev.apps.map((app) => (
                    <span
                      key={app}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0854c4] group-hover:text-blue-800">
                <span>View Setup Tutorial</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Global Setup Guidance Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A1E3F]">
              Need Assistance Setting Up Your Device?
            </h2>
            <div className="us-underline"></div>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Our 24/7 technical team is available on WhatsApp to walk you through playlist URLs, M3U configurations, and app installations for zero-stress activation.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all flex items-center justify-center gap-2"
              >
                💬 Chat with Setup Specialist
              </a>
              <Link
                href="/subscription"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-[#0A1E3F] bg-white border border-slate-300 hover:bg-slate-100 transition-all"
              >
                Explore Subscription Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
