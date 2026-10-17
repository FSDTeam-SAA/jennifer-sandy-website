/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/site-header";
import { SiteFooter } from "@/components/shared/site-footer";
import { apiBaseUrl } from "@/lib/estates";
import { toast } from "sonner";
import { User, Mail, Phone, Shield, Camera, KeyRound, Loader2, ArrowLeft } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const user = session?.user as any;

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || user.name || "");
      setPhoneNumber(user.phoneNumber || "");
      setProfilePicture(user.profilePicture || "");
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.accessToken) {
      toast.error("Please sign in again");
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      if (fullName) formData.append("fullName", fullName);
      if (phoneNumber) formData.append("phoneNumber", phoneNumber);
      if (file) formData.append("profilePicture", file);

      const res = await fetch(`${apiBaseUrl()}/user/update-my-profile`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: formData,
      });

      const response = await res.json();
      if (!res.ok) {
        throw new Error(response?.message || "Failed to update profile");
      }

      toast.success("Profile updated successfully!");
      if (response?.data?.profilePicture) {
        setProfilePicture(response.data.profilePicture);
      }
      await update({
        ...session,
        user: {
          ...user,
          fullName,
          phoneNumber,
          profilePicture: response?.data?.profilePicture || profilePicture,
        },
      });
    } catch (err: any) {
      toast.error(err?.message || "An error occurred while updating profile");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen flex-col bg-[#F8F9FA]">
        <SiteHeader />
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#1672E6]" />
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F9FA]">
      <SiteHeader />

      <main className="container mx-auto flex-1 px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Header banner */}
            <div className="h-32 bg-gradient-to-r from-[#1672E6] to-[#0e4b99] px-6 pt-6 text-white sm:h-40 sm:px-8">
              <h1 className="text-2xl font-bold sm:text-3xl">User Profile</h1>
              <p className="mt-1 text-sm text-blue-100">
                Manage your personal information and preferences
              </p>
            </div>

            {/* Profile Avatar & Details */}
            <div className="relative px-6 pb-8 sm:px-8">
              <div className="relative -mt-16 mb-6 flex flex-wrap items-end gap-5">
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md">
                  {preview || profilePicture ? (
                    <Image
                      src={preview || profilePicture}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#1672E6] text-3xl font-bold text-white">
                      {(fullName || user?.email || "U").charAt(0).toUpperCase()}
                    </div>
                  )}

                  <label
                    htmlFor="profile-upload"
                    className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition hover:opacity-100"
                  >
                    <Camera className="h-6 w-6 text-white" />
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                <div className="mb-2">
                  <h2 className="text-xl font-bold text-slate-800">
                    {fullName || "User"}
                  </h2>
                  <p className="text-sm text-slate-500">{user?.email}</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Full Name
                    </label>
                    <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 focus-within:border-[#1672E6] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1672E6]/10">
                      <User className="h-5 w-5 text-slate-400" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-transparent text-sm text-slate-800 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Phone Number
                    </label>
                    <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 focus-within:border-[#1672E6] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1672E6]/10">
                      <Phone className="h-5 w-5 text-slate-400" />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+49 123 456789"
                        className="w-full bg-transparent text-sm text-slate-800 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email Address
                    </label>
                    <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 text-slate-500 cursor-not-allowed">
                      <Mail className="h-5 w-5 text-slate-400" />
                      <input
                        type="email"
                        value={user?.email || ""}
                        disabled
                        className="w-full bg-transparent text-sm text-slate-500 cursor-not-allowed outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Account Role
                    </label>
                    <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 text-slate-500 cursor-not-allowed">
                      <Shield className="h-5 w-5 text-slate-400" />
                      <span className="text-sm font-semibold capitalize text-slate-600">
                        {user?.role || "user"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
                  <Link
                    href="/change-password"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#1672E6] hover:underline"
                  >
                    <KeyRound className="h-4 w-4" /> Change Password
                  </Link>

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex h-11 items-center justify-center rounded-xl bg-[#1672E6] px-8 text-sm font-semibold text-white shadow-md transition hover:bg-[#125ec4] disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
