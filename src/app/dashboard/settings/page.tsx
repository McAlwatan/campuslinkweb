"use client";
import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { Lock, LogOut, Moon, Sun, Bell, Shield, User, Camera } from "lucide-react";

export default function SettingsPage() {
  const logout = useAuthStore((s) => s.logout);
  const qc = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const { data: profile } = useQuery({
    queryKey: ["my-profile"],
    queryFn: () => api.get("/users/me").then((r) => r.data),
  });

  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (profile) {
      setHeadline(profile.headline ?? "");
      setBio(profile.bio ?? "");
    }
  }, [profile]);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (t: "light" | "dark") => {
    if (t === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", t);
  };

  const handleThemeChange = (t: "light" | "dark") => {
    setTheme(t);
    applyTheme(t);
    toast.success(`${t === "dark" ? "Dark" : "Light"} mode enabled`);
  };

  const profileMutation = useMutation({
    mutationFn: () => api.patch("/users/me", { headline, bio }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-profile"] });
      toast.success("Profile updated");
    },
    onError: () => toast.error("Failed to update profile"),
  });

  const avatarMutation = useMutation({
    mutationFn: (file: File) => {
      const form = new FormData();
      form.append("file", file);
      return api.post("/users/me/avatar", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-profile"] });
      toast.success("Profile picture updated");
    },
    onError: () => toast.error("Failed to upload picture"),
  });

  const passwordMutation = useMutation({
    mutationFn: () => api.patch("/users/me", { password: passwords.newPassword }),
    onSuccess: () => {
      toast.success("Password updated!");
      setPasswords({ current: "", newPassword: "", confirm: "" });
    },
    onError: () => toast.error("Failed to update password"),
  });

  const handlePasswordSubmit = () => {
    if (!passwords.current) {
      toast.error("Enter your current password");
      return;
    }
    if (passwords.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (passwords.newPassword !== passwords.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    passwordMutation.mutate();
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <p className="text-sm text-text-secondary mt-0.5">
          Manage your account preferences
        </p>
      </div>

      {/* Profile */}
      <div className="card p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary-tint flex items-center justify-center">
            <User size={15} className="text-primary" />
          </div>
          <h2 className="font-semibold text-text-primary">Profile</h2>
        </div>

        <div className="flex items-center gap-4 mb-5">
          <div className="relative">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary-tint flex items-center justify-center text-primary font-bold text-lg">
                {profile?.full_name?.slice(0, 2).toUpperCase() ?? "U"}
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center border-2 border-card"
            >
              <Camera size={11} className="text-primary-foreground" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) avatarMutation.mutate(file);
                e.target.value = "";
              }}
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">{profile?.full_name}</p>
            <p className="text-xs text-text-hint">{profile?.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide block mb-1.5">
              Headline
            </label>
            <input
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Computer Science student | Aspiring developer"
              maxLength={150}
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide block mb-1.5">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell others a bit about yourself…"
              rows={3}
              className="input-field w-full resize-none"
            />
          </div>
          <button
            onClick={() => profileMutation.mutate()}
            disabled={profileMutation.isPending}
            className="btn-primary h-10 px-5 text-sm"
          >
            {profileMutation.isPending ? "Saving…" : "Save profile"}
          </button>
        </div>
      </div>

      {/* Appearance */}
      <div className="card p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary-tint flex items-center justify-center">
            <Sun size={15} className="text-primary" />
          </div>
          <h2 className="font-semibold text-text-primary">Appearance</h2>
        </div>
        <div className="flex gap-3">
          {(["light", "dark"] as const).map((t) => (
            <button
              key={t}
              onClick={() => handleThemeChange(t)}
              className={`flex-1 h-24 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-colors ${
                theme === t
                  ? "border-primary bg-primary-tint"
                  : "border-border hover:border-primary-border"
              }`}
            >
              {t === "light" ? (
                <Sun size={20} className={theme === t ? "text-primary" : "text-text-hint"} />
              ) : (
                <Moon size={20} className={theme === t ? "text-primary" : "text-text-hint"} />
              )}
              <span className={`text-sm font-medium capitalize ${theme === t ? "text-primary" : "text-text-secondary"}`}>
                {t}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Change password */}
      <div className="card p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary-tint flex items-center justify-center">
            <Lock size={15} className="text-primary" />
          </div>
          <h2 className="font-semibold text-text-primary">Change password</h2>
        </div>
        <div className="space-y-3">
          {[
            { key: "current", label: "Current password", placeholder: "••••••••" },
            { key: "newPassword", label: "New password", placeholder: "Min 6 characters" },
            { key: "confirm", label: "Confirm new password", placeholder: "••••••••" },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide block mb-1.5">
                {label}
              </label>
              <input
                type="password"
                value={(passwords as any)[key]}
                onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
                placeholder={placeholder}
                className="input-field w-full"
              />
            </div>
          ))}
          <button
            onClick={handlePasswordSubmit}
            disabled={passwordMutation.isPending}
            className="btn-primary h-10 px-5 text-sm"
          >
            {passwordMutation.isPending ? "Updating…" : "Update password"}
          </button>
        </div>
      </div>

      {/* Notifications & Privacy — coming soon, honestly labelled */}
      <div className="card p-5 opacity-70">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-primary-tint flex items-center justify-center">
            <Bell size={15} className="text-primary" />
          </div>
          <h2 className="font-semibold text-text-primary">Notifications</h2>
          <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-muted text-text-hint ml-auto">
            Coming soon
          </span>
        </div>
        <p className="text-xs text-text-hint">
          Fine-grained notification controls are on the way.
        </p>
      </div>

      <div className="card p-5 opacity-70">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-primary-tint flex items-center justify-center">
            <Shield size={15} className="text-primary" />
          </div>
          <h2 className="font-semibold text-text-primary">Privacy</h2>
          <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-muted text-text-hint ml-auto">
            Coming soon
          </span>
        </div>
        <p className="text-xs text-text-hint">
          Profile visibility controls are on the way.
        </p>
      </div>

      {/* Account */}
      <div className="card p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
            <LogOut size={15} className="text-danger" />
          </div>
          <h2 className="font-semibold text-text-primary">Account</h2>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 h-10 rounded-xl border border-red-200 text-danger text-sm font-medium hover:bg-red-50 transition-colors"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </div>
  );
}