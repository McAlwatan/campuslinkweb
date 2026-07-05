"use client";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { Lock, LogOut, Moon, Sun, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  const logout = useAuthStore((s) => s.logout);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [notifications, setNotifications] = useState(true);
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (t: "light" | "dark") => {
    if (t === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", t);
  };

  const handleThemeChange = (t: "light" | "dark") => {
    setTheme(t);
    applyTheme(t);
    toast.success(`${t === "dark" ? "Dark" : "Light"} mode enabled`);
  };

  const passwordMutation = useMutation({
    mutationFn: () =>
      api.patch("/users/me", { password: passwords.newPassword }),
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

      {/* Notifications */}
      <div className="card p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary-tint flex items-center justify-center">
            <Bell size={15} className="text-primary" />
          </div>
          <h2 className="font-semibold text-text-primary">Notifications</h2>
        </div>
        <div className="space-y-3">
          {[
            { label: "Chat messages", description: "Get notified for new messages" },
            { label: "Group announcements", description: "When admins post in your groups" },
            { label: "Marketplace activity", description: "When someone contacts you about a listing" },
          ].map(({ label, description }) => (
            <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-surface">
              <div>
                <p className="text-sm font-medium text-text-primary">{label}</p>
                <p className="text-xs text-text-hint">{description}</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-10 h-6 rounded-full transition-colors relative ${
                  notifications ? "bg-primary" : "bg-border"
                }`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                  notifications ? "translate-x-5" : "translate-x-1"
                }`} />
              </button>
            </div>
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
                onChange={(e) =>
                  setPasswords({ ...passwords, [key]: e.target.value })
                }
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

      {/* Privacy */}
      <div className="card p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary-tint flex items-center justify-center">
            <Shield size={15} className="text-primary" />
          </div>
          <h2 className="font-semibold text-text-primary">Privacy</h2>
        </div>
        <div className="space-y-2">
          {[
            "Show my profile to other students",
            "Allow others to find me by university ID",
            "Show my skills publicly",
          ].map((item) => (
            <div key={item} className="flex items-center justify-between p-3 rounded-xl bg-surface">
              <p className="text-sm text-text-primary">{item}</p>
              <button className="w-10 h-6 rounded-full bg-primary relative">
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white shadow" />
              </button>
            </div>
          ))}
        </div>
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