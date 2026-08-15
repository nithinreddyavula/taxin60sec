export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "itr-filing-deadline-2026",
    title: "ITR Filing Deadline 2026: Key Dates You Can't Miss",
    excerpt:
      "A quick breakdown of this year's income tax return deadlines for salaried employees, freelancers, and businesses — and what happens if you miss them.",
    date: "2026-08-01",
    readTime: "4 min read",
    content: [
      "Every year, thousands of taxpayers in India miss their ITR filing deadline simply because the dates aren't communicated clearly. Here's what you actually need to know.",
      "For most individual taxpayers not requiring an audit, the due date falls on July 31st. Businesses and professionals requiring an audit typically get until October 31st.",
      "Missing the deadline doesn't mean you can't file — but it does mean late fees under Section 234F, and you lose the ability to carry forward certain losses.",
      "If you're unsure which category you fall into, our free Tax Health Check tells you in under two minutes.",
    ],
  },
  {
    slug: "gst-registration-who-actually-needs-it",
    title: "GST Registration: Who Actually Needs It (And Who Doesn't)",
    excerpt:
      "Not every business needs GST registration. Here's the actual turnover threshold and the common misconceptions that lead people to register unnecessarily.",
    date: "2026-07-18",
    readTime: "5 min read",
    content: [
      "One of the most common questions we get is whether a new business needs GST registration right away. The answer is: usually not, and registering too early can add compliance overhead you don't need yet.",
      "For most service providers, registration becomes mandatory once turnover crosses ₹20 lakh in a financial year (₹10 lakh in special category states). For goods suppliers, it's ₹40 lakh.",
      "There are exceptions — e-commerce sellers and certain inter-state suppliers need to register regardless of turnover.",
      "If you're not sure where your business stands, it's worth a quick check before you file anything.",
    ],
  },
];