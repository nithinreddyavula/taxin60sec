"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SuccessPage() {

    const params = useParams();

    const caseId = params.caseId;

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-[#020817] text-white">

                <section className="mx-auto max-w-3xl px-6 py-24">

                    <div className="rounded-2xl border border-green-500/20 bg-[#111827] p-10 text-center">

                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20">

                            <span className="text-5xl">
                                ✅
                            </span>

                        </div>

                        <h1 className="mt-8 text-4xl font-bold">

                            Application Submitted

                        </h1>

                        <p className="mt-5 text-slate-400">

                            Thank you.

                            Your documents have been received successfully.

                            Our CA team will review everything and contact you shortly.

                        </p>

                        <div className="mt-8 rounded-xl bg-[#020817] p-5">

                            <p className="text-sm text-slate-400">

                                Case Reference

                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-cyan-400">

                                #{caseId}

                            </h2>

                        </div>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">

                            <Link
                                href="/"
                                className="rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-black"
                            >
                                Back to Home
                            </Link>

                            <a
                                href="https://wa.me/917013734079"
                                target="_blank"
                                className="rounded-xl border border-white/10 px-8 py-3"
                            >
                                Contact on WhatsApp
                            </a>

                        </div>

                    </div>

                </section>

            </main>

            <Footer />

        </>
    );

}