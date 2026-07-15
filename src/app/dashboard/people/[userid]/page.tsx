"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { MessageCircle, GraduationCap, BookOpen, Calendar, Sparkles } from "lucide-react";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";

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

export default function ProfilePage() {
  const { userid: userId } = useParams<{ userid: string }>();
  const router = useRouter();
  const currentUser = useAuthStore((s) => s.user);
  const qc = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => api.get(`/users/${userId}`).then((r) => r.data),
    enabled: !!userId,
  });

  const startDm = useMutation({
    mutationFn: () => api.post(`/chat/dm/${userId}`),
    onSuccess: ({ data: room }) => {
      qc.invalidateQueries({ queryKey: ["rooms"] });
      router.push(`/dashboard/chat?room=${room.id}`);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.detail ?? "Couldn't start conversation");
    },
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="h-48 animate-pulse rounded-2xl bg-[#10201A]/[0.04] dark:bg-[#F4F1E6]/[0.04]" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="mx-auto max-w-2xl text-center text-sm text-[#10201A]/50 dark:text-[#F4F1E6]/50">
        User not found.
      </div>
    );
  }

  const isMe = currentUser?.id === profile.id;

  return (
    <div className={`${display.variable} ${mono.variable} mx-auto max-w-2xl space-y-5`}>
      <style>{`
        .font-display { font-family: var(--font-display), sans-serif; }
        .font-mono-alt { font-family: var(--font-mono), monospace; }
      `}</style>

      <div className="rounded-2xl border-2 border-dashed border-[#10201A]/12 bg-[#F5F1E4] p-6 dark:border-[#F4F1E6]/12 dark:bg-[#152922]">
        <div className="flex items-start gap-4">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.full_name}
              className="h-20 w-20 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F0B429] to-[#FF6B57] text-xl font-bold text-[#10201A]">
              {profile.full_name?.slice(0, 2).toUpperCase()}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h1 className="font-display text-xl font-bold text-[#10201A] dark:text-[#F4F1E6]">
              {profile.full_name}
            </h1>
            {profile.bio && (
              <p className="mt-1 text-sm text-[#10201A]/65 dark:text-[#F4F1E6]/65">{profile.bio}</p>
            )}

            <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#10201A]/55 dark:text-[#F4F1E6]/55">
              {profile.university_name && (
                <span className="flex items-center gap-1.5">
                  <GraduationCap size={13} /> {profile.university_name}
                </span>
              )}
              {profile.course && (
                <span className="flex items-center gap-1.5">
                  <BookOpen size={13} /> {profile.course}
                </span>
              )}
              {profile.year_of_study && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} /> Year {profile.year_of_study}
                </span>
              )}
            </div>
          </div>

          {!isMe && (
            <button
              onClick={() => startDm.mutate()}
              disabled={startDm.isPending}
              className="flex shrink-0 items-center gap-2 rounded-xl bg-[#10201A] px-4 py-2.5 text-xs font-semibold text-[#F5F1E4] transition-opacity hover:opacity-90 disabled:opacity-50 dark:bg-[#F0B429] dark:text-[#10201A]"
            >
              <MessageCircle size={14} />
              {startDm.isPending ? "Opening…" : "Message"}
            </button>
          )}
        </div>
      </div>

      {profile.modules?.length > 0 && (
        <div className="rounded-2xl border-2 border-dashed border-[#10201A]/12 bg-[#F5F1E4] p-5 dark:border-[#F4F1E6]/12 dark:bg-[#152922]">
          <h2 className="mb-3 font-display text-sm font-bold text-[#10201A] dark:text-[#F4F1E6]">
            Modules
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.modules.map((m: string) => (
              <span
                key={m}
                className="rounded-full bg-[#10201A]/5 px-3 py-1.5 text-xs font-medium text-[#10201A]/70 dark:bg-[#F4F1E6]/8 dark:text-[#F4F1E6]/70"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      )}

      {profile.interests?.length > 0 && (
        <div className="rounded-2xl border-2 border-dashed border-[#10201A]/12 bg-[#F5F1E4] p-5 dark:border-[#F4F1E6]/12 dark:bg-[#152922]">
          <h2 className="mb-3 flex items-center gap-1.5 font-display text-sm font-bold text-[#10201A] dark:text-[#F4F1E6]">
            <Sparkles size={14} className="text-[#F0B429]" /> Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full bg-[#F0B429]/15 px-3 py-1.5 text-xs font-medium text-[#B8860B] dark:text-[#F0B429]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}