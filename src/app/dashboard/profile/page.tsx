"use client";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { Camera, Mail, Hash, FileText, BookOpen, Users } from "lucide-react";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const setAuth = useAuthStore((s) => s.setAuth);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    full_name: user?.full_name ?? "",
    bio: user?.bio ?? "",
    university_id: user?.university_id ?? "",
  });

  const { data: skills } = useQuery({
    queryKey: ["skills", user?.id],
    queryFn: () => api.get(`/skills/users/${user!.id}`).then((r) => r.data),
    enabled: !!user?.id,
  });

  const { data: documents } = useQuery({
    queryKey: ["documents"],
    queryFn: () => api.get("/documents").then((r) => r.data),
  });

  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => api.get("/courses").then((r) => r.data),
  });

  const updateMutation = useMutation({
    mutationFn: () => api.patch("/users/me", form),
    onSuccess: async () => {
      const { data: updatedUser } = await api.get("/users/me");
      const token = sessionStorage.getItem("access_token")!;
      const refresh = sessionStorage.getItem("refresh_token")!;
      setAuth(updatedUser, token, refresh);
      toast.success("Profile updated!");
      setEditing(false);
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
    onSuccess: async () => {
      const { data: updatedUser } = await api.get("/users/me");
      const token = sessionStorage.getItem("access_token")!;
      const refresh = sessionStorage.getItem("refresh_token")!;
      setAuth(updatedUser, token, refresh);
      toast.success("Avatar updated!");
    },
  });

  const levelColors: Record<string, string> = {
    beginner: "bg-green-50 text-green-600",
    intermediate: "bg-amber-50 text-amber-600",
    expert: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Profile</h1>

      {/* Avatar + basic info */}
      <div className="card p-6">
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-primary-tint flex items-center justify-center overflow-hidden">
              {user?.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-primary text-2xl font-bold">
                  {user?.full_name?.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <label className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg bg-primary flex items-center justify-center cursor-pointer shadow-sm">
              <Camera size={13} color="white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) avatarMutation.mutate(file);
                }}
              />
            </label>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {editing ? (
              <div className="space-y-3">
                <input
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  className="input-field w-full font-semibold"
                />
                <input
                  value={form.university_id}
                  onChange={(e) => setForm({ ...form, university_id: e.target.value })}
                  placeholder="University ID"
                  className="input-field w-full"
                />
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Write a short bio…"
                  rows={2}
                  className="input-field w-full resize-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => updateMutation.mutate()}
                    disabled={updateMutation.isPending}
                    className="btn-primary h-9 px-4 text-sm"
                  >
                    {updateMutation.isPending ? "Saving…" : "Save"}
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="btn-ghost h-9 px-4 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <h2 className="text-lg font-bold text-text-primary">
                  {user?.full_name}
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                  <Mail size={12} />
                  {user?.email}
                </div>
                {user?.university_id && (
                  <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                    <Hash size={12} />
                    {user.university_id}
                  </div>
                )}
                {user?.bio && (
                  <p className="text-sm text-text-secondary mt-2">{user.bio}</p>
                )}
                <button
                  onClick={() => setEditing(true)}
                  className="btn-ghost h-8 px-3 text-xs mt-2"
                >
                  Edit profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-border">
          {[
            { label: "Documents", value: documents?.length ?? 0, icon: FileText },
            { label: "Courses", value: courses?.length ?? 0, icon: BookOpen },
            { label: "Skills", value: skills?.length ?? 0, icon: Users },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-text-primary">{value}</p>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <Icon size={11} className="text-text-hint" />
                <p className="text-xs text-text-secondary">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="card p-5">
        <h2 className="font-semibold text-text-primary mb-4">Skills</h2>
        {skills?.length === 0 ? (
          <p className="text-sm text-text-hint">No skills yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills?.map((skill: any) => (
              <span
                key={skill.id}
                className={`text-xs font-medium px-3 py-1.5 rounded-full capitalize ${levelColors[skill.level]}`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}