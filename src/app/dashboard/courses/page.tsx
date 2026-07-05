"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import { BookOpen, Plus, X } from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
  const queryClient = useQueryClient();
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => api.get("/courses").then((r) => r.data),
  });

  const createMutation = useMutation({
    mutationFn: () => api.post("/courses", form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course created!");
      setShowCreate(false);
      setForm({ title: "", description: "" });
    },
    onError: () => toast.error("Failed to create course"),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Courses</h1>
          <p className="text-sm text-text-secondary mt-0.5">
            Learn from and teach your peers
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="btn-primary flex items-center gap-2 px-4 h-9"
        >
          <Plus size={16} /> Create course
        </button>
      </div>

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-modal">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-text-primary text-lg">Create course</h2>
              <button
                onClick={() => setShowCreate(false)}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide block mb-1.5">
                  Title
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Intro to Next.js"
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide block mb-1.5">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="What will students learn?"
                  rows={3}
                  className="input-field w-full resize-none"
                />
              </div>
              <button
                onClick={() => createMutation.mutate()}
                disabled={!form.title || createMutation.isPending}
                className="btn-primary w-full h-11"
              >
                {createMutation.isPending ? "Creating…" : "Create course"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Courses grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card overflow-hidden animate-pulse">
              <div className="h-36 bg-surface" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-surface rounded w-3/4" />
                <div className="h-3 bg-surface rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : courses?.length === 0 ? (
        <div className="card p-12 text-center">
          <BookOpen size={32} className="mx-auto text-text-hint mb-3" />
          <p className="text-text-secondary">No courses yet. Create the first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses?.map((course: any) => (
            <div
              key={course.id}
              className="card overflow-hidden hover:border-primary-border transition-colors"
            >
              <div className="h-36 bg-primary-tint flex items-center justify-center">
                {course.cover_url ? (
                  <img
                    src={course.cover_url}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <BookOpen size={32} className="text-primary opacity-40" />
                )}
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-text-primary">{course.title}</h3>
                {course.description && (
                  <p className="text-xs text-text-secondary line-clamp-2">
                    {course.description}
                  </p>
                )}
                <div className="flex items-center justify-between pt-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    course.is_paid
                      ? "bg-amber-50 text-amber-600"
                      : "bg-green-50 text-green-600"
                  }`}>
                    {course.is_paid ? `TZS ${course.price?.toLocaleString()}` : "Free"}
                  </span>
                  <Link
                    href={`/dashboard/courses/${course.id}`}
                    className="text-xs text-primary font-semibold hover:underline"
                  >
                    View course →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}