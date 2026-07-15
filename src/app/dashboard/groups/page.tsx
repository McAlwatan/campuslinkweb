"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Search, Users, Plus, Lock, Globe } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Group {
  id: string;
  name: string;
  description: string | null;
  group_type: string;
  cover_url: string | null;
  created_by: string;
  created_at: string;
}

export default function GroupsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"recommended" | "all" | "mine">("recommended");

  const { data: groups, isLoading } = useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: () => api.get("/groups").then((r) => r.data),
  });

  const { data: profile } = useQuery({
    queryKey: ["my-profile"],
    queryFn: () => api.get("/users/me").then((r) => r.data),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const filtered = groups?.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.description?.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  // Simple recommendation — groups whose name/description matches user's course or modules
  const recommended = groups?.filter((g) => {
    if (!profile?.course && !profile?.modules?.length) return false;
    const text = `${g.name} ${g.description ?? ""}`.toLowerCase();
    const course = profile?.course?.toLowerCase() ?? "";
    const modules = (profile?.modules ?? []) as string[];
    return (
      (course && text.includes(course.split(" ")[0])) ||
      modules.some((m: string) => text.includes(m.toLowerCase()))
    );
  }) ?? [];

  const typeColors: Record<string, string> = {
    study: "bg-[#6C63FF]/10 text-[#6C63FF]",
    club: "bg-[#06B6D4]/10 text-[#06B6D4]",
    class: "bg-[#10B981]/10 text-[#10B981]",
  };

  const typeIcons: Record<string, any> = {
    study: Users,
    club: Globe,
    class: Lock,
  };

  const displayGroups =
    activeTab === "recommended"
      ? recommended.length > 0 ? recommended : filtered
      : filtered;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Groups</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {profile?.course
              ? `Showing groups relevant to ${profile.course}`
              : "Discover and join campus groups"}
          </p>
        </div>
        <Link
          href="/dashboard/groups/create"
          className="btn-primary h-9 px-4 flex items-center gap-2 text-sm"
        >
          <Plus size={15} /> New group
        </Link>
      </div>

      {/* Profile prompt */}
      {!profile?.profile_completed && !profile?.onboarding_skipped && (
        <div className="card p-4 border-primary/20 bg-primary/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Users size={18} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Get personalised recommendations</p>
            <p className="text-xs text-muted-foreground">Complete your profile to see groups relevant to your course</p>
          </div>
          <button
            onClick={() => {}}
            className="text-xs font-semibold text-primary hover:underline shrink-0"
          >
            Complete profile
          </button>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search groups by name or description…"
          className="input-field w-full pl-9"
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-muted rounded-xl w-fit">
        {[
          { key: "recommended", label: `Recommended${recommended.length ? ` (${recommended.length})` : ""}` },
          { key: "all", label: `All groups${groups?.length ? ` (${groups.length})` : ""}` },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm font-medium transition-colors",
              activeTab === key
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* No profile message for recommended tab */}
      {activeTab === "recommended" && recommended.length === 0 && !profile?.course && (
        <div className="card p-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-3">
            <Users size={24} className="text-primary" />
          </div>
          <p className="font-semibold text-foreground">No recommendations yet</p>
          <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
            Complete your profile with your course and modules to get group recommendations
          </p>
        </div>
      )}

      {/* Groups grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-5 h-32 animate-pulse" />
          ))}
        </div>
      ) : displayGroups.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-muted-foreground">
            {search ? `No groups matching "${search}"` : "No groups yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayGroups.map((group) => {
            const Icon = typeIcons[group.group_type] ?? Users;
            const colorClass = typeColors[group.group_type] ?? "bg-primary/10 text-primary";
            return (
              <Link
                key={group.id}
                href={`/dashboard/groups/${group.id}`}
                className="card p-5 hover:border-primary/30 transition-colors group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0", colorClass)}>
                    {group.cover_url ? (
                      <img src={group.cover_url} alt={group.name} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <Icon size={20} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      {group.name}
                    </p>
                    <span className={cn("text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full", colorClass)}>
                      {group.group_type}
                    </span>
                  </div>
                </div>
                {group.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">{group.description}</p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}