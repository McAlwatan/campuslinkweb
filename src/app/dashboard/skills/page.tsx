"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import { Lightbulb, Plus, X, Trash2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const LEVELS = ["beginner", "intermediate", "expert"];

const levelColors: Record<string, string> = {
  beginner: "bg-green-50 text-green-600",
  intermediate: "bg-amber-50 text-amber-600",
  expert: "bg-purple-50 text-purple-600",
};

export default function SkillsPage() {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    name: "", level: "beginner", description: "",
  });

  const { data: skills, isLoading } = useQuery({
    queryKey: ["skills", user?.id],
    queryFn: () =>
      api.get(`/skills/users/${user!.id}`).then((r) => r.data),
    enabled: !!user?.id,
  });

  const addMutation = useMutation({
    mutationFn: () => api.post("/skills", form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill added!");
      setShowAdd(false);
      setForm({ name: "", level: "beginner", description: "" });
    },
    onError: () => toast.error("Failed to add skill"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/skills/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.success("Skill removed");
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Skills</h1>
          <p className="text-sm text-text-secondary mt-0.5">
            Showcase what you know
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="btn-primary flex items-center gap-2 px-4 h-9"
        >
          <Plus size={16} /> Add skill
        </button>
      </div>

      {/* Add modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-modal">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-text-primary text-lg">Add skill</h2>
              <button
                onClick={() => setShowAdd(false)}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide block mb-1.5">
                  Skill name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Next.js, Python, Figma"
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide block mb-1.5">
                  Level
                </label>
                <div className="flex gap-2">
                  {LEVELS.map((level) => (
                    <button
                      key={level}
                      onClick={() => setForm({ ...form, level })}
                      className={`flex-1 h-9 rounded-xl text-xs font-medium capitalize transition-colors ${
                        form.level === level
                          ? "bg-primary text-white"
                          : "border border-border text-text-secondary hover:bg-surface"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide block mb-1.5">
                  Description (optional)
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief description of your experience"
                  rows={3}
                  className="input-field w-full resize-none"
                />
              </div>
              <button
                onClick={() => addMutation.mutate()}
                disabled={!form.name || addMutation.isPending}
                className="btn-primary w-full h-11"
              >
                {addMutation.isPending ? "Adding…" : "Add skill"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skills grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-5 animate-pulse space-y-2">
              <div className="h-4 bg-surface rounded w-24" />
              <div className="h-3 bg-surface rounded w-16" />
            </div>
          ))}
        </div>
      ) : skills?.length === 0 ? (
        <div className="card p-12 text-center">
          <Lightbulb size={32} className="mx-auto text-text-hint mb-3" />
          <p className="text-text-secondary">No skills yet. Add your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills?.map((skill: any) => (
            <div
              key={skill.id}
              className="card p-5 hover:border-primary-border transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${levelColors[skill.level]}`}>
                  {skill.level}
                </span>
                <button
                  onClick={() => deleteMutation.mutate(skill.id)}
                  className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-lg flex items-center justify-center hover:bg-red-50 transition-all"
                >
                  <Trash2 size={12} className="text-text-hint hover:text-danger" />
                </button>
              </div>
              <h3 className="font-semibold text-text-primary">{skill.name}</h3>
              {skill.description && (
                <p className="text-xs text-text-secondary mt-1.5 line-clamp-2">
                  {skill.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}