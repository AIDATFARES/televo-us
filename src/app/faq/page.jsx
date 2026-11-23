'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Search,
  MessageSquare,
  ChevronDown,
} from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import { FAQ_DATA, SITE_CONFIG } from '../../data/config';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openItems, setOpenItems] = useState({ '0-0': true });

  const categories = ['All', ...FAQ_DATA.map((c) => c.category)];

  const toggleItem = (key) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const breadcrumbsList = [{ name: 'Frequently Asked Questions', path: '/faq' }];

  const filteredCategories = FAQ_DATA.map((cat) => {
    if (activeCategory !== 'All' && cat.category !== activeCategory) {
      return { ...cat, items: [] };
    }

    if (!searchQuery.trim()) {
      return cat;
    }

    const q = searchQuery.toLowerCase();
    const matched = cat.items.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
    return { ...cat, items: matched };
  }).filter((cat) => cat.items.length > 0);

  return (
    <div className="pt-4 pb-12 sm:pt-6 bg-white text-[#2b3340] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbsList} />

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0A1E3F] text-xs font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            US Help &amp; Support Resources
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0A1E3F] tracking-tight">
            Televo IPTV USA — Frequently Asked Questions
          </h1>
          <div className="us-underline"></div>
          <p className="text-slate-600 mt-3 text-base">
            Find authoritative answers to all your questions about{' '}
            <Link href="/subscription" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
              Televo IPTV subscriptions
            </Link>
            ,{' '}
            <Link href="/guide-installation" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
              supported streaming applications
            </Link>
            , US broadband optimization, and rapid 5–15 minute activation.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. Fire Stick, refund, M3U, buffering)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-[#0A1E3F] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-8 mb-16">
          {filteredCategories.map((cat, catIdx) => (
            <div key={cat.category} className="space-y-3">
              <h2 className="text-lg font-black text-[#0A1E3F] border-b border-slate-200 pb-2">
                {cat.category}
              </h2>

              <div className="space-y-3">
                {cat.items.map((item, itemIdx) => {
                  const key = `${catIdx}-${itemIdx}`;
                  const isOpen = !!openItems[key];

                  return (
                    <div
                      key={itemIdx}
                      className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(key)}
                        className="w-full p-5 text-left font-bold text-sm sm:text-base text-[#0A1E3F] flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                      >
                        <span>{item.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#0A1E3F] shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions Box */}
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center">
          <h2 className="text-xl font-black text-[#0A1E3F] mb-2">Still Have Questions?</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
            Our 24/7 technical team is available on WhatsApp to answer any questions about compatible apps, speed tests, or subscription details.
          </p>
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            Chat with Customer Care
          </a>
        </div>
      </div>
    </div>
  );
}
