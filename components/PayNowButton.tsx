"use client";

import { useState } from "react";
import { toast } from "sonner";
import { PaymentService } from "@/services/payment-service";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function PayNowButton({
  caseId,
  clientName,
  clientEmail,
  clientPhone,
}: {
  caseId: number;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);

    try {
      const order = await PaymentService.orderForCase(caseId);

      const ready = await loadRazorpayScript();
      if (!ready) {
        toast.error("Unable to load payment gateway. Please try again.");
        return;
      }

      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Math.round(order.amount * 100),
        currency: order.currency,
        order_id: order.id,
        name: "Tax60Sec",
        description: `Payment for case ${order.referenceId}`,
        prefill: {
          name: clientName,
          email: clientEmail,
          contact: clientPhone,
        },
        theme: { color: "#2563EB" },
        handler: () => {
          toast.success("Payment successful");
        },
      });

      razorpay.open();

    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Unable to start payment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handlePay} disabled={loading} className="btn-primary">
      {loading ? "Preparing payment..." : "Pay Now"}
    </button>
  );
}