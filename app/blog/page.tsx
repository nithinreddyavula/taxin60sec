import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata = {
  title: "Tax & Compliance Blog",
  description:
    "Practical guides on ITR filing, GST, company compliance, and startup registration in India.",
};

export default function BlogIndexPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="page-hero">
          <div className="container-main">
            <div className="section-header">
              <p className="eyebrow">Blog</p>
              <h1 className="section-title mt-3">Tax &amp; Compliance, Explained Simply</h1>
              <p className="section-copy mt-3">
                No jargon. Just practical guides on ITR, GST, and business compliance in India.
              </p>
            </div>

            <div className="mx-auto grid max-w-3xl gap-4">
              {BLOG_POSTS.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="card-dark block p-6 transition hover:-translate-y-1"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    &middot; {post.readTime}
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-white">{post.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-secondary">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}