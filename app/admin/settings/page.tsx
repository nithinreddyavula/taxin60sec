"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { AdminService, PlatformSetting } from "@/services/admin-service";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<PlatformSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    AdminService.settings().then(setSettings).catch(() => setSettings([])).finally(() => setLoading(false));
  }, []);

  async function save(key: string, value: string) {
    setSaving(key);
    try {
      const updated = await AdminService.updateSetting(key, value);
      setSettings((prev) => prev.map((s) => (s.key === key ? updated : s)));
      toast.success("Setting updated");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Unable to update setting");
    } finally {
      setSaving(null);
    }
  }

  return (
    <AppShell roles={["ROLE_ADMIN"]}>
      <h1 className="text-3xl font-bold">System Settings</h1>
      <p className="mt-2 text-secondary">Manage platform settings and configurations.</p>

      <div className="card-dark mt-6 divide-y divide-white/8 p-0">
        {loading && <div className="h-40 animate-pulse" />}
        {!loading && settings.map((s) => (
          <SettingRow key={s.key} setting={s} saving={saving === s.key} onSave={(value) => save(s.key, value)} />
        ))}
      </div>
    </AppShell>
  );
}

function SettingRow({ setting, saving, onSave }: { setting: PlatformSetting; saving: boolean; onSave: (value: string) => void }) {
  const [value, setValue] = useState(setting.value);

  return (
    <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold">{setting.key}</p>
        <p className="text-xs text-secondary">{setting.description}</p>
      </div>
      <div className="flex items-center gap-2">
        <input value={value} onChange={(e) => setValue(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm" />
        <button onClick={() => onSave(value)} disabled={saving} className="btn-primary !w-auto px-4 py-1.5 text-xs disabled:opacity-50">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}