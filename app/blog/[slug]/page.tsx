import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/lib/blog-posts";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main>
        <article className="page-hero">
          <div className="container-main">
            <div className="mx-auto max-w-2xl">
              <Link href="/blog" className="text-sm font-semibold text-emerald-400">
                &larr; Back to Blog
              </Link>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-emerald-400">
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                &middot; {post.readTime}
              </p>

              <h1 className="mt-2 text-3xl font-bold text-white">{post.title}</h1>

              <div className="mt-6 space-y-4">
                {post.content.map((paragraph, index) => (
                  <p key={index} className="section-copy">
                    {paragraph}
                  </p>
                ))}
              </div>

              <Link href="/health-check" className="btn-primary mt-8 inline-flex">
                Check My Free Tax Health Score
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}