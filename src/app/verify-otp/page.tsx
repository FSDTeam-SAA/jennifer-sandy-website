"use client";

import { useEffect, useRef, useState, KeyboardEvent, ClipboardEvent, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

import { AuthLayout } from "@/components/shared/AuthLayout";
import { Button } from "@/components/ui/button";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(59);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (value !== "" && !/^[0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs[index - 1].current?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pastedData)) {
      toast.error("Please paste a valid 6-digit verification code");
      return;
    }

    const pastedDigits = pastedData.split("");
    setOtp(pastedDigits);
    inputRefs[5].current?.focus();
  };

  const handleResend = async () => {
    if (resendTimer > 0 || !email) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const res = await fetch(`${apiUrl}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.message || "Failed to resend code");
      }
      setResendTimer(59);
      toast.success("A new verification code has been sent!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to resend code";
      toast.error(msg);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length < 6) {
      toast.error("Please enter the complete 6-digit verification code");
      return;
    }

    if (!email) {
      toast.error("Missing email address. Please sign up or request a reset again.");
      router.push("/signup");
      return;
    }

    setIsLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const res = await fetch(`${apiUrl}/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          otp: code,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.message || "Invalid verification code");
      }

      const resetToken = json?.data?.resetToken;
      if (resetToken) {
        toast.success("Code verified! Set your new password.");
        router.push(
          `/change-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(resetToken)}`
        );
      } else {
        toast.success("Email verified successfully! You can now log in.");
        router.push("/login");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid verification code. Please try again.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Verify Email"
      description={`Enter the 6-digit verification code sent to ${email || "your email"}`}
      footer={
        <div className="text-slate-600 font-normal">
          {"Didn't get the code? "}
          <button
            type="button"
            disabled={resendTimer > 0}
            onClick={handleResend}
            className={`font-semibold underline transition-colors ${
              resendTimer > 0
                ? "text-slate-400 cursor-not-allowed"
                : "text-[#006fe6] hover:text-[#005ec4]"
            }`}
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP Input Group */}
        <div className="flex justify-between items-center gap-2 max-w-[360px] mx-auto py-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-semibold text-slate-800 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-[#006fe6] focus:bg-white rounded-lg focus-visible:ring-3 focus-visible:ring-[#006fe6]/20 outline-none transition-all"
            />
          ))}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 bg-[#006fe6] hover:bg-[#005ec4] text-white font-medium rounded-lg shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-[#F8FAFC]">
          <Loader2 className="w-8 h-8 animate-spin text-[#006fe6]" />
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}
