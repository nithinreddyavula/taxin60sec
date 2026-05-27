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
];

const complianceData = [
  { name: "Done", value: 92 },
  { name: "Pending", value: 8 },
];

export default function Hero() {

  return (

    <section className="relative bg-[#020817] overflow-hidden text-white pt-28 lg:pt-32 pb-20">

      {/* BG GLOW */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-blue-600/20 blur-[120px] rounded-full" />

        <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-indigo-600/20 blur-[120px] rounded-full" />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* LEFT */}
        <div>

          <div className="inline-flex items-center px-5 py-2 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-sm font-medium">

            Modern Finance. Smart Compliance. Stronger Business.

          </div>

          <h1 className="mt-8 text-5xl lg:text-[70px] leading-[1.05] font-bold">

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

          <p className="mt-8 text-lg text-gray-300 leading-8 max-w-2xl">

            From GST to Global Compliance,
            from Startup Registration to Virtual CFO —
            we simplify finance so you can focus on growth.

          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-4">

            <a
              href="/#contact"
              className="px-7 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition text-white font-semibold flex items-center gap-3"
            >

              Book Consultation

              <ArrowRight size={18} />

            </a>

            <a
              href="https://wa.me/917013734079"
              target="_blank"
              className="px-7 py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition text-white font-semibold"
            >

              Chat on WhatsApp

            </a>

          </div>

        </div>

        {/* RIGHT DASHBOARD */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[40px] p-6 shadow-2xl shadow-blue-500/10">

          <div className="grid grid-cols-[220px_1fr] gap-6">

            {/* SIDEBAR */}
            <div className="bg-[#0f172a] rounded-3xl p-5 border border-white/10">

              <h3 className="text-2xl font-bold leading-tight">

                Business
                <br />
                Dashboard

              </h3>

              <div className="mt-8 space-y-4">

                {
                  [
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

                  })
                }

              </div>

            </div>

            {/* MAIN */}
            <div>

              {/* TOP CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                {
                  [
                    ["Total Revenue", "₹48,75,000"],
                    ["Total Profit", "₹12,45,000"],
                    ["Tax Savings", "₹3,25,000"],
                    ["Cash Flow", "₹8,75,000"],
                  ].map((item, i) => (

                    <div
                      key={i}
                      className="bg-[#0f172a] rounded-2xl p-4 border border-white/10"
                    >

                      <p className="text-xs text-gray-400">

                        {item[0]}

                      </p>

                      <h3 className="mt-3 text-2xl font-bold">

                        {item[1]}

                      </h3>

                      <p className="mt-2 text-green-400 text-xs">

                        +12% vs last month

                      </p>

                    </div>

                  ))
                }

              </div>

              {/* GRAPH + DONUT */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">

                {/* GRAPH */}
                <div className="col-span-2 bg-[#0f172a] rounded-2xl p-6 border border-white/10 min-h-[320px]">

                  <div className="flex items-center justify-between">

                    <h3 className="font-bold text-xl">

                      Business Growth

                    </h3>

                    <p className="text-sm text-gray-400">

                      This Year

                    </p>

                  </div>

                  <div className="h-[220px] mt-6">

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
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#color)"
                        />

                      </AreaChart>

                    </ResponsiveContainer>

                  </div>

                </div>

                {/* DONUT */}
                <div className="bg-[#0f172a] rounded-2xl p-5 border border-white/10 flex flex-col items-center justify-center min-h-[320px]">

                  <h3 className="font-bold text-lg text-center">

                    Compliance Status

                  </h3>

                  <div className="w-[180px] h-[180px] mt-4">

                    <ResponsiveContainer width="100%" height="100%">

                      <PieChart>

                        <Pie
                          data={complianceData}
                          innerRadius={55}
                          outerRadius={75}
                          paddingAngle={3}
                          dataKey="value"
                        />

                      </PieChart>

                    </ResponsiveContainer>

                  </div>

                  <h2 className="text-5xl font-bold mt-2">

                    92%

                  </h2>

                  <p className="text-green-400 text-sm mt-2">

                    Compliant

                  </p>

                  <div className="mt-6 space-y-2 text-sm text-gray-300">

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

    </section>

  );
}