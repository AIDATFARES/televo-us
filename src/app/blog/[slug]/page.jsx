import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  MessageSquare,
  Zap,
} from 'lucide-react';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { BLOG_POSTS, SITE_CONFIG } from '../../../data/config';

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      title: post.metaTitle,
      description: post.metaDescription,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: SITE_CONFIG.brandName,
      url: SITE_CONFIG.domain,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.serviceName,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.domain}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.domain}/blog/${post.slug}`,
    },
  };

  const breadcrumbsList = [
    { name: 'Blog & US Guides', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article className="pt-4 pb-12 sm:pt-6 bg-white text-[#2b3340] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbsList} />

        {/* Article Header */}
        <header className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0A1E3F] text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            {post.category}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#0A1E3F] tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="us-underline"></div>

          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 mt-4 flex-wrap">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              Televo Technical Editorial
            </span>
          </div>
        </header>

        {/* Article Body */}
        <div
          className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-[#0A1E3F] prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-p:text-slate-700 prose-li:text-slate-700 prose-strong:text-slate-900 prose-a:text-[#0854c4] prose-a:underline hover:prose-a:text-[#0A1E3F] mb-16"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* In-Article Conversion Card */}
        <div className="my-12 p-8 rounded-3xl bg-[#0A1E3F] text-white text-center shadow-xl">
          <Zap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <h3 className="text-xl sm:text-2xl font-black mb-2">
            Ready to Stream Over 50,000 Channels in 4K UHD?
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-lg mx-auto mb-6 leading-relaxed">
            Get instant activation within 5 to 15 minutes. Explore our flexible, contract-free{' '}
            <Link href="/subscription" className="text-white font-bold underline hover:text-cyan-200">
              IPTV subscriptions
            </Link>{' '}
            backed by our risk-free 7-day money-back guarantee.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/subscription"
              className="px-6 py-3 rounded-xl font-bold text-sm text-[#0A1E3F] bg-white hover:bg-slate-100 shadow-md transition-all"
            >
              View IPTV Pricing Plans
            </Link>
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Order on WhatsApp
            </a>
          </div>
        </div>

        {/* Related Articles */}
        <section className="pt-8 border-t border-slate-200">
          <h2 className="text-xl font-black text-[#0A1E3F] mb-6">
            Recommended Streaming Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rPost) => (
              <Link
                key={rPost.slug}
                href={`/blog/${rPost.slug}`}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-white transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-2">
                    {rPost.category}
                  </span>
                  <h3 className="text-sm font-bold text-[#0A1E3F] group-hover:text-blue-600 line-clamp-2 leading-snug">
                    {rPost.title}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{rPost.readTime}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
