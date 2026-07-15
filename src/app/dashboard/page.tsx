"use client";

import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { ImageIcon, X } from "lucide-react";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import PostCard from "@/components/feed/PostCard";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export default function FeedPage() {
  const user = useAuthStore((s) => s.user);
  const qc = useQueryClient();
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: posts, isLoading } = useQuery({
    queryKey: ["feed"],
    queryFn: () => api.get("/posts").then((r) => r.data),
  });

  const createPost = useMutation({
    mutationFn: async () => {
      const form = new FormData();
      if (content.trim()) form.append("content", content.trim());
      if (image) form.append("image", image);
      return api.post("/posts", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["feed"] });
      setContent("");
      setImage(null);
      setPreview(null);
      toast.success("Posted!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.detail ?? "Failed to post");
    },
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleSubmit = () => {
    if (!content.trim() && !image) {
      toast.error("Write something or add an image first");
      return;
    }
    createPost.mutate();
  };

  return (
    <div className={`${display.variable} ${mono.variable} mx-auto max-w-2xl space-y-5`}>
      <style>{`
        .font-display { font-family: var(--font-display), sans-serif; }
        .font-mono-alt { font-family: var(--font-mono), monospace; }
      `}</style>

      {/* Composer */}
      <div className="rounded-2xl border-2 border-dashed border-[#10201A]/12 bg-[#F5F1E4] p-4 dark:border-[#F4F1E6]/12 dark:bg-[#152922]">
        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F0B429] to-[#FF6B57] text-xs font-bold text-[#10201A]">
            {user?.full_name?.slice(0, 2).toUpperCase() ?? "U"}
          </div>
          <div className="flex-1 space-y-3">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share something with campus…"
              rows={2}
              className="w-full resize-none bg-transparent text-sm text-[#10201A] placeholder:text-[#10201A]/35 focus:outline-none dark:text-[#F4F1E6] dark:placeholder:text-[#F4F1E6]/30"
            />

            {preview && (
              <div className="relative inline-block">
                <img src={preview} alt="Preview" className="max-h-56 rounded-xl object-cover" />
                <button
                  onClick={() => { setImage(null); setPreview(null); }}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#10201A] text-white"
                >
                  <X size={12} />
                </button>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-dashed border-[#10201A]/10 pt-3 dark:border-[#F4F1E6]/10">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#10201A]/55 transition-colors hover:bg-[#10201A]/5 dark:text-[#F4F1E6]/55 dark:hover:bg-[#F4F1E6]/8"
              >
                <ImageIcon size={15} className="text-[#4FD1AE]" />
                Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
              <button
                onClick={handleSubmit}
                disabled={createPost.isPending}
                className="rounded-xl bg-[#10201A] px-5 py-2 text-xs font-semibold text-[#F5F1E4] transition-opacity hover:opacity-90 disabled:opacity-50 dark:bg-[#F0B429] dark:text-[#10201A]"
              >
                {createPost.isPending ? "Posting…" : "Post"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed list */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-[#10201A]/[0.04] dark:bg-[#F4F1E6]/[0.04]" />
          ))}
        </div>
      ) : posts?.length ? (
        posts.map((post: any) => <PostCard key={post.id} post={post} />)
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-[#10201A]/12 bg-[#F5F1E4] p-10 text-center dark:border-[#F4F1E6]/12 dark:bg-[#152922]">
          <p className="text-sm text-[#10201A]/50 dark:text-[#F4F1E6]/50">
            No posts yet — be the first to share something.
          </p>
        </div>
      )}
    </div>
  );
}