'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
} from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import { SITE_CONFIG } from '../../data/config';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    device: 'Amazon Fire Stick',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const breadcrumbsList = [{ name: 'Contact Televo IPTV', path: '/contact' }];

  return (
    <div className="pt-4 pb-12 sm:pt-6 bg-white text-[#2b3340] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbsList} />

        {/* Hero Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0A1E3F] text-xs font-semibold mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            US Support Desk • 24/7 Availability 🇺🇸
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0A1E3F] tracking-tight">
            Contact Televo IPTV USA Support
          </h1>
          <div className="us-underline"></div>
          <p className="text-slate-600 mt-3 text-base">
            Have questions about a{' '}
            <Link href="/subscription" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
              Televo IPTV subscription
            </Link>
            , need quick assistance configuring your streaming device via our{' '}
            <Link href="/guide-installation" className="text-[#0854c4] font-semibold underline underline-offset-2 hover:text-[#0A1E3F]">
              setup guides
            </Link>
            , or want to verify connection details? Our US customer care team is here to assist 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Direct Contact Methods */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary WhatsApp Card */}
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-emerald-950 mb-1">WhatsApp Live Chat</h2>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                The most direct way to connect with our US support team. Request{' '}
                <Link href="/pricing" className="text-emerald-700 font-semibold underline hover:text-emerald-900">
                  subscription plans
                </Link>
                , receive step-by-step installation guides, and resolve stream settings directly on WhatsApp.
              </p>
              <div className="text-sm font-bold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Online Now • Instant Reply</span>
              </div>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-center text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Open WhatsApp Chat
              </a>
            </div>

            {/* Email & Operating Info */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#0A1E3F]">Email Address</h3>
                  <a
                    href={`mailto:${SITE_CONFIG.supportEmail}`}
                    className="text-xs text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {SITE_CONFIG.supportEmail}
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Average reply time: under 30 minutes</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#0A1E3F]">Support Operating Hours</h3>
                  <p className="text-xs text-slate-600">{SITE_CONFIG.openingHours}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Automated credential delivery runs 24/7/365</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-[#0A1E3F]">Order Protection</h3>
                  <p className="text-xs text-slate-600">
                    All subscriptions are covered by our{' '}
                    <Link href="/refund-policy" className="text-blue-600 font-semibold underline">
                      7-day money-back guarantee
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-[#0A1E3F] mb-1">Send Us a Direct Message</h2>
              <p className="text-xs text-slate-600 mb-6">
                Fill out the form below and an agent will reply to your email or WhatsApp number promptly.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-900 mb-1">Message Received!</h3>
                  <p className="text-xs text-emerald-800 leading-relaxed mb-4">
                    Thank you for reaching out. Our US support team has received your message and will respond shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-emerald-700 underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0A1E3F] mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Smith"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0A1E3F] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0A1E3F] mb-1">
                      Your Streaming Device
                    </label>
                    <select
                      value={formData.device}
                      onChange={(e) => setFormData({ ...formData, device: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 bg-white"
                    >
                      <option>Amazon Fire Stick / Fire TV</option>
                      <option>Samsung Smart TV (Tizen)</option>
                      <option>LG Smart TV (webOS)</option>
                      <option>Android TV / Google TV</option>
                      <option>Apple TV (tvOS)</option>
                      <option>iPhone / iPad (iOS)</option>
                      <option>Android Smartphone / Tablet</option>
                      <option>Windows PC / Mac</option>
                      <option>Other / Not Listed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0A1E3F] mb-1">
                      How Can We Help?
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your question, device issue, or subscription requirement..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-xs text-white bg-[#0A1E3F] hover:bg-[#123366] shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Support Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
