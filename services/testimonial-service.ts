import { request } from "./client";

export type Testimonial = {
  id: string;
  name: string;
  role?: string;
  quote: string;
  rating?: number;
};

export const TestimonialService = {
  list: () => request<Testimonial[]>("/api/v1/public/testimonials"),
};