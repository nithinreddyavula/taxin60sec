import { Bell, Briefcase, CheckCircle2, Circle, Files, HeartPulse } from "lucide-react";

export default function ProductShowcase() {
  return (
    <section className="py-12 sm:py-20">
      <div className="container-main">
        {/* Browser Mockup Wrapper */}
        <div className="mx-auto max-w-[1100px] rounded-2xl border border-white/10 bg-[#020817] shadow-2xl shadow-emerald-500/10 overflow-hidden">
          {/* Browser Header */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-rose-500/80"></div>
              <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
              <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
            </div>
            <div className="mx-auto flex h-6 w-full max-w-[240px] items-center justify-center rounded bg-black/20 text-[10px] font-medium text-slate-400">
              app.tax60sec.com
            </div>
          </div>

          {/* Dashboard Content Mockup */}
          <div className="p-6 sm:p-10 pointer-events-none">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Good morning, Ananya</h3>
                <p className="text-sm text-slate-400">Here's what's happening with your tax journey.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="card-dark p-5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-slate-400">Active Cases</p>
                  <Briefcase size={16} className="text-emerald-400" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">2</p>
                <div className="w-full h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-emerald-400 w-[50%] rounded-full"></div>
                </div>
              </div>
              <div className="card-dark p-5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-slate-400">Pending Actions</p>
                  <Bell size={16} className="text-amber-400" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">1</p>
                <p className="text-[11px] text-amber-400 font-medium mt-3">CA replied 2h ago</p>
              </div>
              <div className="card-dark p-5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-slate-400">Documents</p>
                  <Files size={16} className="text-blue-400" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">14</p>
                <p className="text-[11px] text-slate-400 font-medium mt-3">All verified</p>
              </div>
              <div className="card-dark p-5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-slate-400">Health Score</p>
                  <HeartPulse size={16} className="text-[#E5D5C5]" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">94<span className="text-lg text-slate-500 font-normal">/100</span></p>
                <p className="text-[11px] text-[#E5D5C5] font-medium mt-3">Excellent standing</p>
              </div>
            </div>

            <div className="card-dark p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-bold text-white text-lg">ITR-3 Filing (FY 23-24)</p>
                    <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase">IN PROGRESS</span>
                  </div>
                  <p className="text-xs text-slate-400">Case ID: TX-8492-B</p>
                </div>
                <div className="rounded-lg bg-[#E5D5C5] px-4 py-2 text-xs font-bold text-black">
                  Open Case Workspace
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { label: "Intake", done: true },
                  { label: "Doc Upload", done: true },
                  { label: "CA Review", done: true },
                  { label: "Client Action", done: false, active: true },
                  { label: "Filed", done: false }
                ].map((stage, i) => (
                  <div key={stage.label} className={`rounded-xl border p-3 flex flex-col items-center text-center ${stage.done ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" : stage.active ? "border-amber-500/50 bg-amber-500/10 text-amber-400" : "border-white/10 text-slate-500"}`}>
                    {stage.done ? <CheckCircle2 size={16} className="mb-2" /> : <Circle size={16} className={`mb-2 ${stage.active ? "fill-amber-500/20" : ""}`} />}
                    <span className="text-[10px] font-bold uppercase tracking-wider">{stage.label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-amber-400 font-medium text-center sm:text-left">Action required: Please review the draft computation and approve.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
