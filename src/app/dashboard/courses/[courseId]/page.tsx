"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { BookOpen, Plus, X, Play, ArrowLeft, Upload } from "lucide-react";
import Link from "next/link";

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonPosition, setLessonPosition] = useState("1");
  const [lessonFile, setLessonFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => api.get(`/courses/${courseId}`).then((r) => r.data),
  });

  const { data: lessons, isLoading: lessonsLoading } = useQuery({
    queryKey: ["lessons", courseId],
    queryFn: () =>
      api.get(`/courses/${courseId}/lessons`).then((r) => r.data),
  });

  const isInstructor = course?.instructor_id === user?.id;

  const addLessonMutation = useMutation({
    mutationFn: async () => {
      if (!lessonFile) throw new Error("No file selected");
      const form = new FormData();
      form.append("file", lessonFile);
      form.append("title", lessonTitle);
      form.append("position", lessonPosition);
      setUploading(true);
      return api.post(`/courses/${courseId}/lessons`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons", courseId] });
      toast.success("Lesson added!");
      setShowAddLesson(false);
      setLessonTitle("");
      setLessonPosition("1");
      setLessonFile(null);
      setUploading(false);
    },
    onError: () => {
      toast.error("Failed to add lesson");
      setUploading(false);
    },
  });

  if (courseLoading) {
    return (
      <div className="space-y-4 animate-pulse max-w-3xl">
        <div className="h-8 bg-surface rounded w-48" />
        <div className="card h-48" />
        <div className="card p-6 space-y-3">
          <div className="h-5 bg-surface rounded w-64" />
          <div className="h-4 bg-surface rounded w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Back */}
      <Link
        href="/dashboard/courses"
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
      >
        <ArrowLeft size={16} />
        Back to courses
      </Link>

      {/* Course header */}
      <div className="card overflow-hidden">
        <div className="h-48 bg-primary-tint flex items-center justify-center relative">
          {course?.cover_url ? (
            <img
              src={course.cover_url}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <BookOpen size={48} className="text-primary opacity-30" />
          )}
          {isInstructor && (
            <label className="absolute bottom-3 right-3 btn-primary flex items-center gap-2 px-3 h-8 text-xs cursor-pointer">
              <Upload size={13} />
              Change cover
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const form = new FormData();
                  form.append("file", file);
                  await api.post(`/courses/${courseId}/cover`, form, {
                    headers: { "Content-Type": "multipart/form-data" },
                  });
                  queryClient.invalidateQueries({ queryKey: ["course", courseId] });
                  toast.success("Cover updated!");
                }}
              />
            </label>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-text-primary">
                {course?.title}
              </h1>
              {course?.description && (
                <p className="text-sm text-text-secondary mt-2">
                  {course.description}
                </p>
              )}
              <div className="flex items-center gap-3 mt-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  course?.is_paid
                    ? "bg-amber-50 text-amber-600"
                    : "bg-green-50 text-green-600"
                }`}>
                  {course?.is_paid
                    ? `TZS ${course.price?.toLocaleString()}`
                    : "Free"}
                </span>
                <span className="text-xs text-text-hint">
                  {lessons?.length ?? 0} lesson{lessons?.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            {isInstructor && (
              <button
                onClick={() => setShowAddLesson(true)}
                className="btn-primary flex items-center gap-2 px-3 h-9 text-sm shrink-0"
              >
                <Plus size={14} />
                Add lesson
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="card p-5">
        <h2 className="font-semibold text-text-primary mb-4">
          Course content
        </h2>
        {lessonsLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 rounded-xl bg-surface animate-pulse flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-border shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-border rounded w-48" />
                  <div className="h-3 bg-border rounded w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : lessons?.length === 0 ? (
          <div className="py-10 text-center">
            <BookOpen size={28} className="mx-auto text-text-hint mb-2" />
            <p className="text-sm text-text-secondary">No lessons yet</p>
            {isInstructor && (
              <button
                onClick={() => setShowAddLesson(true)}
                className="text-xs text-primary font-medium mt-1"
              >
                Add the first lesson
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {lessons?.map((lesson: any, index: number) => (
              <div
                key={lesson.id}
                className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary-border hover:bg-primary-tint transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-primary-tint group-hover:bg-primary flex items-center justify-center shrink-0 transition-colors">
                  <Play
                    size={14}
                    className="text-primary group-hover:text-white transition-colors"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary">
                    {index + 1}. {lesson.title}
                  </p>
                  <p className="text-xs text-text-hint">
                    {new Date(lesson.created_at).toLocaleDateString()}
                  </p>
                </div>
                {lesson.content_url && (
                  <a
                    href={lesson.content_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Open →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add lesson modal */}
      {showAddLesson && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-modal">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-text-primary text-lg">Add lesson</h2>
              <button
                onClick={() => setShowAddLesson(false)}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide block mb-1.5">
                  Lesson title
                </label>
                <input
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  placeholder="e.g. Introduction to Routing"
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide block mb-1.5">
                  Position
                </label>
                <input
                  type="number"
                  value={lessonPosition}
                  onChange={(e) => setLessonPosition(e.target.value)}
                  min="1"
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide block mb-1.5">
                  Lesson file
                </label>
                <label className={`flex items-center gap-3 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${lessonFile ? "border-primary bg-primary-tint" : "border-border hover:border-primary-border"}`}>
                  <Upload size={18} className={lessonFile ? "text-primary" : "text-text-hint"} />
                  <span className="text-sm text-text-secondary">
                    {lessonFile ? lessonFile.name : "Click to select a file"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setLessonFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>
              <button
                onClick={() => addLessonMutation.mutate()}
                disabled={!lessonTitle || !lessonFile || uploading}
                className="btn-primary w-full h-11"
              >
                {uploading ? "Uploading…" : "Add lesson"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}