"use client";

import {
  ArrowRight,
  BarChart3,
  FileText,
  Folder,
  Home,
  Receipt,
} from "lucide-react";

import {
  Area,
  AreaChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

const growthData = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 18 },
  { month: "Mar", value: 15 },
  { month: "Apr", value: 25 },
  { month: "May", value: 22 },
  { month: "Jun", value: 35 },
  { month: "Jul", value: 30 },
  { month: "Aug", value: 45 },
  { month: "Sep", value: 40 },
  { month: "Oct", value: 55 },
  { month: "Nov", value: 48 },
  { month: "Dec", value: 60 },
];

const complianceData = [
  { name: "Completed", value: 92 },
  { name: "Pending", value: 8 },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#020817] text-white pt-24 lg:pt-32 pb-16 lg:pb-24">

      {/* GLOW */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">

          {/* LEFT */}
          <div className="max-w-2xl">

            {/* BADGE */}
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs sm:text-sm font-medium">

              Modern Finance. Smart Compliance. Stronger Business.

            </div>

            {/* TITLE */}
            <h1 className="mt-6 sm:mt-8 text-[42px] sm:text-[56px] lg:text-[64px] leading-[1.05] font-bold tracking-tight">

              All-in-One

              <br />

              <span className="text-blue-500">

                Finance &

              </span>

              <br />

              Tax Solutions

              <br />

              For Businesses

            </h1>

            {/* DESC */}
            <p className="mt-6 text-base sm:text-lg text-gray-300 leading-8 max-w-xl">

              From GST to Global Compliance,
              from Startup Registration to Virtual CFO —
              we simplify finance so you can focus on growth.

            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">

              <a
                href="/#contact"
                className="h-14 px-7 rounded-2xl bg-blue-600 hover:bg-blue-500 transition flex items-center justify-center gap-3 text-white font-semibold shadow-xl shadow-blue-500/20"
              >

                Book Consultation

                <ArrowRight size={18} />

              </a>

              <a
                href="https://wa.me/917013734079"
                target="_blank"
                className="h-14 px-7 rounded-2xl border border-white/10 hover:bg-white/10 transition flex items-center justify-center font-semibold"
              >

                Chat on WhatsApp

              </a>

            </div>

            {/* STATS */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-400">

              <div>500+ Clients</div>

              <div>10+ Years Experience</div>

              <div>24hr Response Time</div>

              <div>CA & Ex-Big4 Team</div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="w-full">

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[28px] lg:rounded-[36px] p-4 lg:p-5 shadow-2xl shadow-blue-500/10">

              <div className="grid lg:grid-cols-[190px_1fr] gap-5">

                {/* SIDEBAR */}
                <div className="hidden lg:block bg-[#0f172a] rounded-3xl p-5 border border-white/10">

                  <h3 className="text-2xl font-bold leading-tight">

                    Business
                    <br />
                    Dashboard

                  </h3>

                  <div className="mt-8 space-y-4">

                    {[
                      { name: "Overview", icon: Home },
                      { name: "Income", icon: BarChart3 },
                      { name: "Expenses", icon: Receipt },
                      { name: "Reports", icon: FileText },
                      { name: "Documents", icon: Folder },
                    ].map((item, i) => {

                      const Icon = item.icon;

                      return (
                        <div
                          key={i}
                          className={`flex items-center gap-3 px-4 py-4 rounded-2xl transition cursor-pointer ${
                            i === 0
                              ? "bg-blue-600"
                              : "hover:bg-white/5"
                          }`}
                        >

                          <Icon size={18} />

                          <span className="text-sm font-medium">

                            {item.name}

                          </span>

                        </div>
                      );
                    })}

                  </div>

                </div>

                {/* MAIN */}
                <div>

                  {/* TOP CARDS */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                    {[
                      ["Total Revenue", "₹48L+"],
                      ["Total Profit", "₹12.4L"],
                      ["Tax Savings", "₹3.2L"],
                      ["Cash Flow", "₹8.7L"],
                    ].map((item, i) => (

                      <div
                        key={i}
                        className="bg-[#0f172a] rounded-2xl p-4 border border-white/10"
                      >

                        <p className="text-xs text-gray-400 leading-5">

                          {item[0]}

                        </p>

                        <h3 className="mt-3 text-2xl lg:text-[28px] font-bold leading-none">

                          {item[1]}

                        </h3>

                        <p className="mt-3 text-green-400 text-xs">

                          +12% vs last month

                        </p>

                      </div>

                    ))}

                  </div>

                  {/* CHARTS */}
                  <div className="grid grid-cols-1 lg:grid-cols-[2.3fr_1fr] gap-4 mt-4">

                    {/* GRAPH */}
                    <div className="bg-[#0f172a] rounded-2xl p-5 lg:p-6 border border-white/10">

                      <div className="flex items-center justify-between">

                        <h3 className="font-bold text-lg lg:text-xl">

                          Business Growth

                        </h3>

                        <p className="text-sm text-gray-400">

                          This Year

                        </p>

                      </div>

                      <div className="h-[220px] lg:h-[280px] mt-6">

                        <ResponsiveContainer width="100%" height="100%">

                          <AreaChart data={growthData}>

                            <defs>

                              <linearGradient
                                id="color"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >

                                <stop
                                  offset="5%"
                                  stopColor="#3b82f6"
                                  stopOpacity={0.8}
                                />

                                <stop
                                  offset="95%"
                                  stopColor="#3b82f6"
                                  stopOpacity={0}
                                />

                              </linearGradient>

                            </defs>

                            <Tooltip />

                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke="#3b82f6"
                              strokeWidth={4}
                              fillOpacity={1}
                              fill="url(#color)"
                            />

                          </AreaChart>

                        </ResponsiveContainer>

                      </div>

                    </div>

                    {/* DONUT */}
                    <div className="bg-[#0f172a] rounded-2xl p-5 border border-white/10 flex flex-col items-center justify-center">

                      <h3 className="font-bold text-lg text-center">

                        Compliance Status

                      </h3>

                      <div className="w-[160px] h-[160px] lg:w-[190px] lg:h-[190px] mt-4 relative">

                        <ResponsiveContainer width="100%" height="100%">

                          <PieChart>

                            <Pie
                              data={complianceData}
                              innerRadius={58}
                              outerRadius={82}
                              paddingAngle={2}
                              dataKey="value"
                            >

                              <Cell fill="#3b82f6" />

                              <Cell fill="#1e293b" />

                            </Pie>

                          </PieChart>

                        </ResponsiveContainer>

                        {/* CENTER */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">

                          <h2 className="text-4xl lg:text-5xl font-bold">

                            92%

                          </h2>

                          <p className="text-green-400 text-sm">

                            Compliant

                          </p>

                        </div>

                      </div>

                      {/* STATUS */}
                      <div className="mt-5 space-y-2 text-sm text-gray-300">

                        <p>✓ GST</p>
                        <p>✓ Income Tax</p>
                        <p>✓ TDS</p>
                        <p>✓ ROC</p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}