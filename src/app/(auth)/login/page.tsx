// "use client";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { Eye, EyeOff, Lock, Mail, School } from "lucide-react";
// import api from "@/lib/api";
// import { useAuthStore } from "@/store/authStore";

// const schema = z.object({
//   email: z.string().email("Enter a valid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// type FormData = z.infer<typeof schema>;

// export default function LoginPage() {
//   const router = useRouter();
//   const setAuth = useAuthStore((s) => s.setAuth);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = async (data: FormData) => {
//     setLoading(true);
//     try {
//       const { data: tokens } = await api.post("/auth/login", data);
//       // fetch user profile
//       const { data: user } = await api.get("/users/me", {
//         headers: { Authorization: `Bearer ${tokens.access_token}` },
//       });
//       setAuth(user, tokens.access_token, tokens.refresh_token);
//       toast.success(`Welcome back, ${user.full_name}!`);
//       router.push("/dashboard");
//     } catch (err: any) {
//       toast.error(err.response?.data?.detail || "Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="card p-8">
//       {/* Logo */}
//       <div className="flex items-center gap-2.5 mb-8 justify-center">
//         {/* <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
//           <School size={18} color="white" />
//         </div> */}
//         <span className="text-2xl font-bold text-text-primary">
//           Campus<span className="text-primary">Link</span>.
//         </span>
//       </div>

//       <h1 className="text-1xl font-bold text-text-primary mb-1">
//         Welcome back
//       </h1>
//       <p className="text-sm text-text-secondary mb-7">
//         Sign in to your account to continue
//       </p>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Email */}
//         <div className="space-y-1.5">
//           <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
//             Email or University ID
//           </label>
//           <div className="relative">
//             <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-hint" />
//             <input
//               {...register("email")}
//               type="email"
//               placeholder="you@university.ac.tz"
//               className="input-field w-full pl-9"
//             />
//           </div>
//           {errors.email && (
//             <p className="text-xs text-danger">{errors.email.message}</p>
//           )}
//         </div>

//         {/* Password */}
//         <div className="space-y-1.5">
//           <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
//             Password
//           </label>
//           <div className="relative">
//             <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-hint" />
//             <input
//               {...register("password")}
//               type={showPassword ? "text" : "password"}
//               placeholder="••••••••"
//               className="input-field w-full pl-9 pr-9"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-hint hover:text-text-secondary"
//             >
//               {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
//             </button>
//           </div>
//           {errors.password && (
//             <p className="text-xs text-danger">{errors.password.message}</p>
//           )}
//         </div>

//         <div className="flex justify-end">
//           <Link href="/forgot-password" className="text-xs text-primary font-medium hover:underline">
//             Forgot password?
//           </Link>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="btn-primary w-full h-11 mt-2"
//         >
//           {loading ? "Signing in..." : "Sign in"}
//         </button>
//       </form>

//       <div className="mt-6 text-center text-sm text-text-secondary">
//         Don&apos;t have an account?{" "}
//         <Link href="/register" className="text-primary font-semibold hover:underline">
//           Create one
//         </Link>
//       </div>
//     </div>
//   );
// }



"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, BadgeCheck, Sparkles, Tag } from "lucide-react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

/**
 * Same palette as the CampusLink landing page:
 * Ink #10201A · Paper #F5F1E4 · Marigold #F0B429 · Coral #FF6B57 · Mint #4FD1AE
 */

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-display",
});
const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

/* ---------- university-themed doodle SVGs (decorative, low-opacity) ---------- */

function CapDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 70" className={className} fill="none" aria-hidden="true">
      <path
        d="M50 8 L96 26 L50 44 L4 26 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M24 33 V52 C24 58 36 63 50 63 C64 63 76 58 76 52 V33"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M90 29 V50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="90" cy="54" r="3.5" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

function OpenBookDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 110 70" className={className} fill="none" aria-hidden="true">
      <path
        d="M55 14 C46 6 24 4 8 8 V56 C24 52 46 54 55 62 C64 54 86 52 102 56 V8 C86 4 64 6 55 14 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M55 14 V62" stroke="currentColor" strokeWidth="2.5" />
      <path d="M16 18 H45 M16 27 H45 M16 36 H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M65 18 H94 M65 27 H94 M70 36 H94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PencilDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 90" className={className} fill="none" aria-hidden="true">
      <path
        d="M62 8 L82 28 L34 76 L10 80 L14 56 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M52 18 L72 38" stroke="currentColor" strokeWidth="2.5" />
      <path d="M14 56 L34 76" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

function NotebookDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 100" className={className} fill="none" aria-hidden="true">
      <rect x="8" y="6" width="64" height="88" rx="6" stroke="currentColor" strokeWidth="2.5" />
      <path d="M8 20 H72" stroke="currentColor" strokeWidth="2" />
      <path d="M20 36 H60 M20 48 H60 M20 60 H46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="8" cy="30" r="2" fill="currentColor" />
      <circle cx="8" cy="50" r="2" fill="currentColor" />
      <circle cx="8" cy="70" r="2" fill="currentColor" />
    </svg>
  );
}

function MarkerUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 18"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute -bottom-1.5 left-0 w-full ${className}`}
    >
      <path
        d="M2 12C40 4 80 16 100 9C130 0 160 14 198 6"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { data: tokens } = await api.post("/auth/login", data);
      const { data: user } = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });
      setAuth(user, tokens.access_token, tokens.refresh_token);
      toast.success(`Welcome back, ${user.full_name}!`);
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${display.variable} ${body.variable} ${mono.variable} font-body relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F5F1E4] px-5 py-10 text-[#10201A] dark:bg-[#0E1B16] dark:text-[#F4F1E6]`}
    >
      <style>{`
        .font-display { font-family: var(--font-display), sans-serif; }
        .font-mono-alt { font-family: var(--font-mono), monospace; }
        a:focus-visible, button:focus-visible, input:focus-visible {
          outline: 2px solid #F0B429;
          outline-offset: 2px;
          border-radius: 6px;
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* grain overlay, matches landing page */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ambient background doodles, faint, scattered across the page */}
      <CapDoodle className="pointer-events-none absolute left-[6%] top-[10%] hidden h-24 w-24 -rotate-6 text-[#10201A]/[0.06] dark:text-[#F4F1E6]/[0.06] sm:block" />
      <OpenBookDoodle className="pointer-events-none absolute bottom-[8%] left-[10%] hidden h-28 w-28 rotate-3 text-[#F0B429]/[0.10] sm:block" />
      <PencilDoodle className="pointer-events-none absolute right-[8%] top-[14%] hidden h-20 w-20 rotate-12 text-[#FF6B57]/[0.10] sm:block" />
      <NotebookDoodle className="pointer-events-none absolute bottom-[10%] right-[7%] hidden h-28 w-28 -rotate-6 text-[#10201A]/[0.06] dark:text-[#F4F1E6]/[0.06] sm:block" />

      <div className="relative z-10 w-full max-w-md">
        {/* wordmark */}
        <div className="mb-7 flex items-center justify-center gap-2.5">
          <span className="font-display text-2xl font-bold">
            Campus<span className="text-[#F0B429]">Link</span>.
          </span>
        </div>

        {/* card */}
        <div className="relative overflow-hidden rounded-[28px] border-2 border-dashed border-[#10201A]/20 bg-[#F5F1E4] p-8 shadow-[0_30px_60px_-25px_rgba(16,32,26,0.35)] dark:border-[#F4F1E6]/20 dark:bg-[#152922]">
          {/* ticket-stub notches, matches IdCard */}
          <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#F5F1E4] dark:bg-[#0E1B16]" />
          <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#F5F1E4] dark:bg-[#0E1B16]" />

          {/* in-card doodles, sit quietly behind the form fields */}
          <CapDoodle className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rotate-12 text-[#F0B429]/[0.12]" />
          <PencilDoodle className="pointer-events-none absolute -bottom-6 -left-6 h-28 w-28 -rotate-6 text-[#10201A]/[0.06] dark:text-[#F4F1E6]/[0.08]" />
          <OpenBookDoodle className="pointer-events-none absolute bottom-4 right-4 h-16 w-16 rotate-3 text-[#FF6B57]/[0.08]" />

          <div className="relative">
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-dashed border-[#10201A]/25 px-3 py-1 font-mono-alt text-[10px] uppercase tracking-[1.5px] text-[#10201A]/55 dark:border-[#F4F1E6]/25 dark:text-[#F4F1E6]/55">
              <ShieldCheck size={12} className="text-[#4FD1AE]" />
              University-verified access
            </span>

            <h1 className="relative mb-1 inline-block font-display text-2xl font-bold">
              Welcome back
              <MarkerUnderline className="h-3 text-[#F0B429]/60" />
            </h1>
            <p className="mb-7 mt-2 text-[13.5px] leading-relaxed text-[#10201A]/55 dark:text-[#F4F1E6]/55">
              Sign in to your account to continue.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="font-mono-alt text-[10.5px] font-medium uppercase tracking-[1.5px] text-[#10201A]/50 dark:text-[#F4F1E6]/45">
                  Email or university ID
                </label>
                <div className="relative">
                  <Mail
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#10201A]/35 dark:text-[#F4F1E6]/35"
                  />
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@university.ac.tz"
                    className="w-full rounded-xl border border-[#10201A]/15 bg-[#F5F1E4] py-3 pl-10 pr-3.5 text-sm text-[#10201A] placeholder:text-[#10201A]/30 transition-colors focus:border-[#F0B429] focus:outline-none dark:border-[#F4F1E6]/15 dark:bg-[#0E1B16] dark:text-[#F4F1E6] dark:placeholder:text-[#F4F1E6]/25"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-[#FF6B57]">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="font-mono-alt text-[10.5px] font-medium uppercase tracking-[1.5px] text-[#10201A]/50 dark:text-[#F4F1E6]/45">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#10201A]/35 dark:text-[#F4F1E6]/35"
                  />
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[#10201A]/15 bg-[#F5F1E4] py-3 pl-10 pr-10 text-sm text-[#10201A] placeholder:text-[#10201A]/30 transition-colors focus:border-[#F0B429] focus:outline-none dark:border-[#F4F1E6]/15 dark:bg-[#0E1B16] dark:text-[#F4F1E6] dark:placeholder:text-[#F4F1E6]/25"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#10201A]/35 hover:text-[#10201A]/60 dark:text-[#F4F1E6]/35 dark:hover:text-[#F4F1E6]/60"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-[#FF6B57]">{errors.password.message}</p>
                )}
              </div>

              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-[#B8860B] hover:underline dark:text-[#F0B429]"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#10201A] py-3.5 text-sm font-semibold text-[#F5F1E4] transition-all hover:-translate-y-0.5 hover:opacity-90 disabled:opacity-60 disabled:hover:translate-y-0 dark:bg-[#F0B429] dark:text-[#10201A]"
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>

            <div className="mt-7 text-center text-sm text-[#10201A]/55 dark:text-[#F4F1E6]/55">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-[#B8860B] hover:underline dark:text-[#F0B429]">
                Create one
              </Link>
            </div>
          </div>
        </div>

        {/* trust footer, matches landing page CTA icon row */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
          {[
            { icon: Lock, label: "Private by default" },
            { icon: ShieldCheck, label: "University-verified" },
            { icon: Sparkles, label: "Free for students" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 text-[11.5px] text-[#10201A]/45 dark:text-[#F4F1E6]/40"
            >
              <Icon size={12} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}