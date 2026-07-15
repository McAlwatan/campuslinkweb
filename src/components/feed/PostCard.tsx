"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Heart, MessageCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Post {
  id: string;
  author_id: string;
  author: { id: string; full_name: string; avatar_url: string | null };
  content: string | null;
  image_url: string | null;
  created_at: string;
  like_count: number;
  comment_count: number;
  liked_by_me: boolean;
}

function timeAgo(dateStr: string) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

export default function PostCard({ post }: { post: Post }) {
  const qc = useQueryClient();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const likeMutation = useMutation({
    mutationFn: () => api.post(`/posts/${post.id}/like`),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: ["feed"] });
      const prev = qc.getQueryData<Post[]>(["feed"]);
      qc.setQueryData<Post[]>(["feed"], (old) =>
        old?.map((p) =>
          p.id === post.id
            ? {
                ...p,
                liked_by_me: !p.liked_by_me,
                like_count: p.liked_by_me ? p.like_count - 1 : p.like_count + 1,
              }
            : p
        )
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["feed"], ctx.prev);
    },
  });

  const { data: comments } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => api.get(`/posts/${post.id}/comments`).then((r) => r.data),
    enabled: showComments,
  });

  const addComment = useMutation({
    mutationFn: (content: string) =>
      api.post(`/posts/${post.id}/comments`, { content }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["comments", post.id] });
      qc.invalidateQueries({ queryKey: ["feed"] });
      setCommentText("");
    },
  });

  return (
    <div className="rounded-2xl border-2 border-dashed border-[#10201A]/12 bg-[#F5F1E4] p-4 dark:border-[#F4F1E6]/12 dark:bg-[#152922]">
      {/* header */}
      {/* <div className="flex items-center gap-3">
        {post.author?.avatar_url ? (
            <img
              src={post.author.avatar_url}
              alt={post.author.full_name}
              className="h-9 w-9 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F0B429] to-[#FF6B57] text-xs font-bold text-[#10201A]">
              {post.author?.full_name?.slice(0, 2).toUpperCase() ?? "U"}
            </div>
          )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#10201A] dark:text-[#F4F1E6]">
            {post.author?.full_name ?? "Unknown"}
          </p>
          <p className="font-mono-alt text-[10.5px] text-[#10201A]/40 dark:text-[#F4F1E6]/40">
            {timeAgo(post.created_at)}
          </p>
        </div>
      </div> */}
      <div className="flex items-center gap-3">
        <Link href={`/dashboard/people/${post.author?.id}`} className="shrink-0">
          {post.author?.avatar_url ? (
            <img
              src={post.author.avatar_url}
              alt={post.author.full_name}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#F0B429] to-[#FF6B57] text-xs font-bold text-[#10201A]">
              {post.author?.full_name?.slice(0, 2).toUpperCase() ?? "U"}
            </div>
          )}
        </Link>
        <div className="min-w-0 flex-1">
          <Link
            href={`/dashboard/people/${post.author?.id}`}
            className="truncate text-sm font-semibold text-[#10201A] hover:underline dark:text-[#F4F1E6]"
          >
            {post.author?.full_name ?? "Unknown"}
          </Link>
          <p className="font-mono-alt text-[10.5px] text-[#10201A]/40 dark:text-[#F4F1E6]/40">
            {timeAgo(post.created_at)}
          </p>
        </div>
      </div>

      {/* content */}
      {post.content && (
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[#10201A]/85 dark:text-[#F4F1E6]/85">
          {post.content}
        </p>
      )}
      {post.image_url && (
        <img
          src={post.image_url}
          alt="Post"
          className="mt-3 max-h-96 w-full rounded-xl object-cover"
        />
      )}

      {/* actions */}
      <div className="mt-3 flex items-center gap-4 border-t border-dashed border-[#10201A]/10 pt-3 dark:border-[#F4F1E6]/10">
        <button
          onClick={() => likeMutation.mutate()}
          className={cn(
            "flex items-center gap-1.5 text-xs font-medium transition-colors",
            post.liked_by_me
              ? "text-[#FF6B57]"
              : "text-[#10201A]/55 hover:text-[#FF6B57] dark:text-[#F4F1E6]/55"
          )}
        >
          <Heart size={15} fill={post.liked_by_me ? "#FF6B57" : "none"} />
          {post.like_count > 0 ? post.like_count : "Like"}
        </button>
        <button
          onClick={() => setShowComments((s) => !s)}
          className="flex items-center gap-1.5 text-xs font-medium text-[#10201A]/55 transition-colors hover:text-[#10201A] dark:text-[#F4F1E6]/55"
        >
          <MessageCircle size={15} />
          {post.comment_count > 0 ? post.comment_count : "Comment"}
        </button>
      </div>

      {/* comments */}
      {showComments && (
        <div className="mt-3 space-y-2.5 border-t border-dashed border-[#10201A]/10 pt-3 dark:border-[#F4F1E6]/10">
          {comments?.map((c: any) => (
            <div key={c.id} className="flex gap-2.5">
              {c.author?.avatar_url ? (
                <img
                  src={c.author.avatar_url}
                  alt={c.author.full_name}
                  className="h-6 w-6 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4FD1AE]/20 text-[9px] font-bold text-[#0E8C6C] dark:text-[#4FD1AE]">
                  {c.author?.full_name?.slice(0, 2).toUpperCase() ?? "U"}
                </div>
              )}
              <div className="flex-1 rounded-xl bg-[#10201A]/[0.03] px-3 py-2 dark:bg-[#F4F1E6]/[0.04]">
                <p className="text-xs font-semibold text-[#10201A] dark:text-[#F4F1E6]">
                  {c.author?.full_name ?? "Unknown"}
                </p>
                <p className="text-xs text-[#10201A]/75 dark:text-[#F4F1E6]/75">{c.content}</p>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-2 pt-1">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment…"
              onKeyDown={(e) => {
                if (e.key === "Enter" && commentText.trim()) addComment.mutate(commentText.trim());
              }}
              className="flex-1 rounded-full border border-[#10201A]/12 bg-transparent px-3 py-1.5 text-xs text-[#10201A] placeholder:text-[#10201A]/35 focus:outline-none dark:border-[#F4F1E6]/12 dark:text-[#F4F1E6]"
            />
            <button
              onClick={() => commentText.trim() && addComment.mutate(commentText.trim())}
              className="text-[#B8860B] dark:text-[#F0B429]"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}