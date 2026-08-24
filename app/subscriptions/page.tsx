"use client";

import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Building2, Calendar, ChevronDown, ChevronUp, Plus, Repeat } from "lucide-react";
import AppShell from "@/components/AppShell";
import { SubscriptionService, Subscription, SubscriptionPlan } from "@/services/subscription-service";
import { BusinessService, BusinessProfile, BusinessType } from "@/services/business-service";

const INTERVAL_LABEL: Record<string, string> = {
  MONTHLY: "/month",
  QUARTERLY: "/quarter",
  ANNUAL: "/year",
};

const BUSINESS_TYPES: BusinessType[] = [
  "INDIVIDUAL", "PROPRIETORSHIP", "PARTNERSHIP", "LLP", "PRIVATE_LIMITED", "PUBLIC_LIMITED", "OPC", "TRUST", "NGO",
];

function statusPill(status: string) {
  if (status === "ACTIVE") return "bg-emerald-50 text-emerald-700";
  if (status === "PAUSED") return "bg-amber-50 text-amber-700";
  return "bg-slate-100 text-slate-500"; // CANCELLED
}

function SubscriptionRow({ sub }: { sub: Subscription }) {
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = useState(false);
  const [confirmingCancel, setConfirmingCancel] = useState(false);

  const cyclesQuery = useQuery({
    queryKey: ["subscription-cycles", sub.id],
    queryFn: () => SubscriptionService.cycles(sub.id),
    enabled: expanded,
  });

  const cancel = useMutation({
    mutationFn: () => SubscriptionService.cancel(sub.id),
    onSuccess: () => {
      toast.success("Subscription cancelled.");
      queryClient.invalidateQueries({ queryKey: ["subscriptions-mine"] });
      setConfirmingCancel(false);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="card-dark p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">{sub.planName}</p>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusPill(sub.status)}`}>{sub.status}</span>
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-secondary">
            <Building2 size={12} /> {sub.businessName}
            {sub.assignedCaName && <span>· CA: {sub.assignedCaName}</span>}
          </p>
          {sub.nextBillingDate && sub.status === "ACTIVE" && (
            <p className="mt-1 flex items-center gap-1.5 text-xs text-secondary">
              <Calendar size={12} /> Next billing on {new Date(sub.nextBillingDate).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setExpanded((v) => !v)} className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
            Billing history {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
          {cyclesQuery.isLoading && <div className="h-10 animate-pulse rounded-lg bg-slate-100" />}
          {cyclesQuery.data?.length === 0 && <p className="text-xs text-secondary">No billing cycles yet.</p>}
          {cyclesQuery.data?.map((cycle) => (
            <div key={cycle.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs">
              <span>{new Date(cycle.periodStart).toLocaleDateString()} – {new Date(cycle.periodEnd).toLocaleDateString()}</span>
              <span className="text-secondary">
                {cycle.caseNumber ? `Case ${cycle.caseNumber} · ${cycle.caseStatus}` : "Not yet filed"}
                {cycle.billedAt && ` · Billed ${new Date(cycle.billedAt).toLocaleDateString()}`}
              </span>
            </div>
          ))}
        </div>
      )}

      {sub.status !== "CANCELLED" && (
        <div className="mt-3 border-t border-slate-100 pt-3">
          {confirmingCancel ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-red-700">Cancel this subscription? Future billing cycles will stop.</span>
              <button onClick={() => cancel.mutate()} disabled={cancel.isPending} className="rounded-lg bg-red-600 px-2.5 py-1 text-xs font-semibold text-white disabled:opacity-50">
                {cancel.isPending ? "Cancelling…" : "Yes, cancel"}
              </button>
              <button onClick={() => setConfirmingCancel(false)} className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600">
                Keep it
              </button>
            </div>
          ) : (
            <button onClick={() => setConfirmingCancel(true)} className="text-xs font-semibold text-red-600 hover:text-red-700">
              Cancel subscription
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function NewBusinessForm({ onCreated }: { onCreated: () => void }) {
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState<BusinessType>("INDIVIDUAL");

  const create = useMutation({
    mutationFn: () =>
      BusinessService.create({ businessName: businessName.trim(), businessType, businessStatus: "ACTIVE" }),
    onSuccess: () => {
      toast.success("Business added.");
      onCreated();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!businessName.trim()) { toast.error("Enter a business/entity name"); return; }
    create.mutate();
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold">Add an entity to subscribe with</p>
      <p className="mt-1 text-[11px] text-secondary">Subscriptions bill against a specific business/individual entity, so we need one on file first.</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="e.g. Reddy & Co, or your own name" className="rounded-lg border border-slate-200 p-2 text-sm" />
        <select value={businessType} onChange={(e) => setBusinessType(e.target.value as BusinessType)} className="rounded-lg border border-slate-200 p-2 text-sm">
          {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t.replaceAll("_", " ")}</option>)}
        </select>
      </div>
      <button type="submit" disabled={create.isPending} className="btn-primary mt-3 !w-auto px-4 py-1.5 text-xs disabled:opacity-50">
        {create.isPending ? "Adding…" : "Add entity"}
      </button>
    </form>
  );
}

function PlanCard({ plan, businesses, onSubscribed }: { plan: SubscriptionPlan; businesses: BusinessProfile[]; onSubscribed: () => void }) {
  const [picking, setPicking] = useState(false);
  const [businessProfileId, setBusinessProfileId] = useState<number | "">(businesses[0]?.id ?? "");

  const subscribe = useMutation({
    mutationFn: (id: number) => SubscriptionService.subscribe(id, plan.id),
    onSuccess: () => {
      toast.success(`Subscribed to ${plan.name}.`);
      setPicking(false);
      onSubscribed();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="card-dark p-5">
      <div className="flex items-center gap-2">
        <Repeat size={16} className="text-emerald-600" />
        <p className="font-semibold">{plan.name}</p>
      </div>
      {plan.description && <p className="mt-1.5 text-xs text-secondary">{plan.description}</p>}
      <p className="mt-1 text-xs text-secondary">{plan.serviceOfferingName}</p>
      <p className="mt-3 flex items-baseline gap-1">
        <span className="text-2xl font-bold">₹{plan.amount.toLocaleString("en-IN")}</span>
        <span className="text-xs text-secondary">{INTERVAL_LABEL[plan.billingInterval] ?? ""}</span>
      </p>

      {!picking ? (
        <button onClick={() => setPicking(true)} className="btn-primary mt-4 !w-auto px-4 py-1.5 text-sm">
          Subscribe
        </button>
      ) : businesses.length === 0 ? (
        <p className="mt-4 text-xs text-amber-700">Add an entity above first, then come back to subscribe.</p>
      ) : (
        <div className="mt-4 space-y-2">
          <select
            value={businessProfileId}
            onChange={(e) => setBusinessProfileId(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-200 p-2 text-sm"
          >
            {businesses.map((b) => <option key={b.id} value={b.id}>{b.businessName}</option>)}
          </select>
          <div className="flex gap-2">
            <button
              onClick={() => businessProfileId && subscribe.mutate(businessProfileId)}
              disabled={subscribe.isPending || !businessProfileId}
              className="btn-primary !w-auto px-4 py-1.5 text-sm disabled:opacity-50"
            >
              {subscribe.isPending ? "Subscribing…" : "Confirm"}
            </button>
            <button onClick={() => setPicking(false)} className="rounded-lg border border-slate-200 px-4 py-1.5 text-sm font-semibold text-slate-600">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SubscriptionsPage() {
  const queryClient = useQueryClient();
  const [showNewBusiness, setShowNewBusiness] = useState(false);

  const plansQuery = useQuery({ queryKey: ["subscription-plans"], queryFn: () => SubscriptionService.plans() });
  const mineQuery = useQuery({ queryKey: ["subscriptions-mine"], queryFn: () => SubscriptionService.mine() });
  const businessesQuery = useQuery({ queryKey: ["businesses-mine"], queryFn: () => BusinessService.myBusinesses() });

  function refreshAfterBusinessCreated() {
    queryClient.invalidateQueries({ queryKey: ["businesses-mine"] });
    setShowNewBusiness(false);
  }

  const activeSubs = mineQuery.data?.filter((s) => s.status !== "CANCELLED") ?? [];
  const cancelledSubs = mineQuery.data?.filter((s) => s.status === "CANCELLED") ?? [];
  const businesses = businessesQuery.data ?? [];

  return (
    <AppShell roles={["ROLE_CLIENT"]}>
      <h1 className="text-3xl font-bold">Subscriptions</h1>
      <p className="mt-2 text-secondary">Recurring filings for your entities - billed automatically, handled the same way every cycle.</p>

      <section className="mt-6">
        <h2 className="font-bold">Your Subscriptions</h2>
        <div className="mt-3 space-y-3">
          {mineQuery.isLoading && <div className="card-dark h-20 animate-pulse rounded-2xl" />}
          {!mineQuery.isLoading && activeSubs.length === 0 && (
            <div className="card-dark p-5 text-sm text-secondary">No active subscriptions yet - pick a plan below to get started.</div>
          )}
          {activeSubs.map((sub) => <SubscriptionRow key={sub.id} sub={sub} />)}
        </div>

        {cancelledSubs.length > 0 && (
          <details className="mt-3">
            <summary className="cursor-pointer text-xs font-semibold text-secondary">{cancelledSubs.length} cancelled subscription{cancelledSubs.length > 1 ? "s" : ""}</summary>
            <div className="mt-3 space-y-3">
              {cancelledSubs.map((sub) => <SubscriptionRow key={sub.id} sub={sub} />)}
            </div>
          </details>
        )}
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Your Entities</h2>
          {!showNewBusiness && (
            <button onClick={() => setShowNewBusiness(true)} className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
              <Plus size={14} /> Add entity
            </button>
          )}
        </div>
        <div className="mt-3 space-y-3">
          {showNewBusiness && <NewBusinessForm onCreated={refreshAfterBusinessCreated} />}
          {!businessesQuery.isLoading && businesses.length === 0 && !showNewBusiness && (
            <p className="text-sm text-secondary">No entities on file yet.</p>
          )}
          {businesses.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {businesses.map((b) => (
                <span key={b.id} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold">
                  <Building2 size={12} className="mr-1 inline text-secondary" /> {b.businessName}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-bold">Available Plans</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plansQuery.isLoading && <div className="card-dark h-48 animate-pulse rounded-2xl sm:col-span-2 lg:col-span-3" />}
          {plansQuery.data?.filter((p) => p.active).map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              businesses={businesses}
              onSubscribed={() => queryClient.invalidateQueries({ queryKey: ["subscriptions-mine"] })}
            />
          ))}
          {plansQuery.data?.filter((p) => p.active).length === 0 && (
            <p className="text-sm text-secondary sm:col-span-2 lg:col-span-3">No subscription plans available right now.</p>
          )}
        </div>
      </section>
    </AppShell>
  );
}
