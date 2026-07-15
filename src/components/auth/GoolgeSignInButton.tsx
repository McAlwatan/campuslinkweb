"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

declare global {
  interface Window {
    google?: any;
  }
}

export default function GoogleSignInButton() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const hiddenDivRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const scriptId = "google-identity-script";

    const init = () => {
      if (!window.google || !hiddenDivRef.current) return;
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(hiddenDivRef.current, {
        theme: "outline",
        size: "large",
        width: 320,
      });
      setReady(true);
    };

    if (document.getElementById(scriptId)) {
      init();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.id = scriptId;
    script.async = true;
    script.defer = true;
    script.onload = init;
    document.body.appendChild(script);
  }, []);

  const handleCredentialResponse = async (response: { credential: string }) => {
    setLoading(true);
    try {
      const { data: tokens } = await api.post("/auth/google", {
        id_token: response.credential,
      });
      const { data: user } = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });
      setAuth(user, tokens.access_token, tokens.refresh_token);
      toast.success(`Welcome, ${user.full_name}!`);
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    const realButton = hiddenDivRef.current?.querySelector(
      'div[role="button"]'
    ) as HTMLElement | null;
    realButton?.click();
  };

  return (
    <>
      <div
        ref={hiddenDivRef}
        style={{ position: "absolute", opacity: 0, pointerEvents: "none", top: -9999, left: -9999 }}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={loading || !ready}
        className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#10201A]/15 bg-white py-3 text-sm font-semibold text-[#10201A] transition-all hover:-translate-y-0.5 hover:bg-[#10201A]/[0.03] disabled:opacity-60 disabled:hover:translate-y-0 dark:border-[#F4F1E6]/15 dark:bg-[#152922] dark:text-[#F4F1E6]"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
          <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A9 9 0 0 0 9 18z" />
          <path fill="#FBBC05" d="M3.97 10.71A5.41 5.41 0 0 1 3.68 9c0-.59.1-1.17.29-1.71V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.04l3.01-2.33z" />
          <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
        </svg>
        {loading ? "Signing in..." : "Continue with Google"}
      </button>
    </>
  );
}