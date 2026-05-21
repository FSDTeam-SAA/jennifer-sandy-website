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
  const email = searchParams.get("email") || "your email address";

  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(59);

  // References to the 5 input boxes
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Resend OTP cooldown timer
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
    // Only accept numeric inputs
    if (value !== "" && !/^[0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // If typing a digit, shift focus to the next field
    if (value !== "" && index < 4) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace key
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // Shift focus to the previous input and clear it
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
    if (!/^\d{5}$/.test(pastedData)) {
      toast.error("Please paste a valid 5-digit verification code");
      return;
    }

    const pastedDigits = pastedData.split("");
    setOtp(pastedDigits);
    inputRefs[4].current?.focus();
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    
    setResendTimer(59);
    toast.success("A new verification code has been sent!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    
    if (code.length < 5) {
      toast.error("Please enter the complete 5-digit verification code");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate verification api
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Email verified successfully! You can now reset/change your password.");
      router.push(`/change-password?email=${encodeURIComponent(email)}`);
    } catch {
      toast.error("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Verify Email"
      description={`A 5-digit verification code has been sent to ${email}`}
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
        <div className="flex justify-between items-center gap-2.5 max-w-[340px] mx-auto py-2">
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
              className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-semibold text-slate-800 bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-[#006fe6] focus:bg-white rounded-lg focus-visible:ring-3 focus-visible:ring-[#006fe6]/20 outline-none transition-all"
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
