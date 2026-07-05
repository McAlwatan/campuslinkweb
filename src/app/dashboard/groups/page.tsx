// "use client";
// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import api from "@/lib/api";
// import { toast } from "sonner";
// import { Users, Plus, X } from "lucide-react";
// import Link from "next/link";

// export default function GroupsPage() {
//   const queryClient = useQueryClient();
//   const [showCreate, setShowCreate] = useState(false);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [groupType, setGroupType] = useState("study");

//   const { data: groups, isLoading } = useQuery({
//     queryKey: ["groups"],
//     queryFn: () => api.get("/groups").then((r) => r.data),
//   });

//   const createMutation = useMutation({
//     mutationFn: () =>
//       api.post("/groups", { name, description, group_type: groupType }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["groups"] });
//       toast.success("Group created!");
//       setShowCreate(false);
//       setName("");
//       setDescription("");
//     },
//     onError: () => toast.error("Failed to create group"),
//   });

//   const joinMutation = useMutation({
//     mutationFn: (groupId: string) => api.post(`/groups/${groupId}/join`),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["groups"] });
//       toast.success("Joined group!");
//     },
//     onError: (err: any) =>
//       toast.error(err.response?.data?.detail ?? "Failed to join"),
//   });

//   const typeColors: Record<string, string> = {
//     study: "bg-blue-50 text-blue-600",
//     club: "bg-purple-50 text-purple-600",
//     class: "bg-green-50 text-green-600",
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-text-primary">Groups</h1>
//           <p className="text-sm text-text-secondary mt-0.5">
//             Join study groups, clubs and classes
//           </p>
//         </div>
//         <button
//           onClick={() => setShowCreate(true)}
//           className="btn-primary flex items-center gap-2 px-4 h-9"
//         >
//           <Plus size={16} />
//           Create group
//         </button>
//       </div>

//       {/* Create group modal */}
//       {showCreate && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-modal">
//             <div className="flex items-center justify-between mb-5">
//               <h2 className="font-bold text-text-primary text-lg">Create group</h2>
//               <button
//                 onClick={() => setShowCreate(false)}
//                 className="w-8 h-8 rounded-lg border border-border flex items-center justify-center"
//               >
//                 <X size={14} />
//               </button>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide block mb-1.5">
//                   Group name
//                 </label>
//                 <input
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="e.g. CS301 Study Group"
//                   className="input-field w-full"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide block mb-1.5">
//                   Description
//                 </label>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="What is this group about?"
//                   rows={3}
//                   className="input-field w-full resize-none"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide block mb-1.5">
//                   Type
//                 </label>
//                 <select
//                   value={groupType}
//                   onChange={(e) => setGroupType(e.target.value)}
//                   className="input-field w-full"
//                 >
//                   <option value="study">Study Group</option>
//                   <option value="club">Club</option>
//                   <option value="class">Class</option>
//                 </select>
//               </div>
//               <button
//                 onClick={() => createMutation.mutate()}
//                 disabled={!name || createMutation.isPending}
//                 className="btn-primary w-full h-11"
//               >
//                 {createMutation.isPending ? "Creating…" : "Create group"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Groups grid */}
//       {isLoading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {Array.from({ length: 6 }).map((_, i) => (
//             <div key={i} className="card p-5 animate-pulse space-y-3">
//               <div className="h-4 bg-surface rounded w-32" />
//               <div className="h-3 bg-surface rounded w-full" />
//               <div className="h-3 bg-surface rounded w-20" />
//             </div>
//           ))}
//         </div>
//       ) : groups?.length === 0 ? (
//         <div className="card p-12 text-center">
//           <Users size={32} className="mx-auto text-text-hint mb-3" />
//           <p className="text-text-secondary">No groups yet. Create one!</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {groups?.map((group: any) => (
//             <div key={group.id} className="card p-5 hover:border-primary-border transition-colors space-y-3">
//               <div className="flex items-start justify-between">
//                 <div className="w-10 h-10 rounded-xl bg-primary-tint flex items-center justify-center">
//                   <span className="text-primary font-bold text-sm">
//                     {group.name.slice(0, 2).toUpperCase()}
//                   </span>
//                 </div>
//                 <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${typeColors[group.group_type] ?? "bg-surface text-text-secondary"}`}>
//                   {group.group_type}
//                 </span>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-text-primary">{group.name}</h3>
//                 {group.description && (
//                   <p className="text-xs text-text-secondary mt-1 line-clamp-2">
//                     {group.description}
//                   </p>
//                 )}
//               </div>
//               <div className="flex items-center gap-2 pt-1">
//                 <Link
//                   href={`/dashboard/groups/${group.id}`}
//                   className="btn-ghost flex-1 h-8 text-xs flex items-center justify-center"
//                 >
//                   View
//                 </Link>
//                 <button
//                   onClick={() => joinMutation.mutate(group.id)}
//                   className="btn-primary flex-1 h-8 text-xs"
//                 >
//                   Join
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

      
//     </div>
//   );
// }



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