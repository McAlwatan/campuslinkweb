"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { Users, Megaphone, Plus, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GroupDetailPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [content, setContent] = useState("");

  const { data: group, isLoading: groupLoading } = useQuery({
    queryKey: ["group", groupId],
    queryFn: () => api.get(`/groups/${groupId}`).then((r) => r.data),
  });

  const { data: announcements, isLoading: announcementsLoading } = useQuery({
    queryKey: ["announcements", groupId],
    queryFn: () =>
      api.get(`/groups/${groupId}/announcements`).then((r) => r.data),
  });

  const joinMutation = useMutation({
    mutationFn: () => api.post(`/groups/${groupId}/join`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
      toast.success("Joined group!");
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.detail ?? "Failed to join"),
  });

  const announcementMutation = useMutation({
    mutationFn: () =>
      api.post(`/groups/${groupId}/announcements`, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements", groupId] });
      toast.success("Announcement posted!");
      setShowAnnouncement(false);
      setContent("");
    },
    onError: (err: any) =>
      toast.error(err.response?.data?.detail ?? "Only admins can post"),
  });

  const typeColors: Record<string, string> = {
    study: "bg-blue-50 text-blue-600",
    club: "bg-purple-50 text-purple-600",
    class: "bg-green-50 text-green-600",
  };

  const isCreator = group?.created_by === user?.id;

  if (groupLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-surface rounded w-48" />
        <div className="card p-6 space-y-3">
          <div className="h-5 bg-surface rounded w-64" />
          <div className="h-4 bg-surface rounded w-full" />
          <div className="h-4 bg-surface rounded w-3/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Back */}
      <Link
        href="/dashboard/groups"
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
      >
        <ArrowLeft size={16} />
        Back to groups
      </Link>

      {/* Group header */}
      <div className="card p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-tint flex items-center justify-center shrink-0">
              <span className="text-primary font-bold text-xl">
                {group?.name?.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-text-primary">
                  {group?.name}
                </h1>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${typeColors[group?.group_type] ?? "bg-surface text-text-secondary"}`}>
                  {group?.group_type}
                </span>
              </div>
              {group?.description && (
                <p className="text-sm text-text-secondary mt-1.5">
                  {group.description}
                </p>
              )}
              <p className="text-xs text-text-hint mt-2">
                Created {new Date(group?.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            {isCreator && (
              <button
                onClick={() => setShowAnnouncement(true)}
                className="btn-ghost flex items-center gap-2 px-3 h-9 text-sm"
              >
                <Megaphone size={14} />
                Announce
              </button>
            )}
            <button
              onClick={() => joinMutation.mutate()}
              disabled={joinMutation.isPending}
              className="btn-primary flex items-center gap-2 px-3 h-9 text-sm"
            >
              <Users size={14} />
              {joinMutation.isPending ? "Joining…" : "Join"}
            </button>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-text-primary flex items-center gap-2">
            <Megaphone size={16} className="text-primary" />
            Announcements
          </h2>
          {isCreator && (
            <button
              onClick={() => setShowAnnouncement(true)}
              className="flex items-center gap-1.5 text-xs text-primary font-medium"
            >
              <Plus size={13} /> Post
            </button>
          )}
        </div>

        {announcementsLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 rounded-xl bg-surface animate-pulse space-y-2">
                <div className="h-3.5 bg-border rounded w-3/4" />
                <div className="h-3 bg-border rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : announcements?.length === 0 ? (
          <div className="py-8 text-center">
            <Megaphone size={28} className="mx-auto text-text-hint mb-2" />
            <p className="text-sm text-text-secondary">No announcements yet</p>
            {isCreator && (
              <button
                onClick={() => setShowAnnouncement(true)}
                className="text-xs text-primary font-medium mt-1"
              >
                Post the first one
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {announcements?.map((a: any) => (
              <div key={a.id} className="p-4 rounded-xl bg-surface border border-border">
                <p className="text-sm text-text-primary leading-relaxed">
                  {a.content}
                </p>
                <p className="text-xs text-text-hint mt-2">
                  {new Date(a.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Announcement modal */}
      {showAnnouncement && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-modal">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-text-primary text-lg">
                Post announcement
              </h2>
              <button
                onClick={() => setShowAnnouncement(false)}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>
            <div className="space-y-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your announcement…"
                rows={4}
                className="input-field w-full resize-none"
              />
              <button
                onClick={() => announcementMutation.mutate()}
                disabled={!content || announcementMutation.isPending}
                className="btn-primary w-full h-11"
              >
                {announcementMutation.isPending ? "Posting…" : "Post announcement"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}