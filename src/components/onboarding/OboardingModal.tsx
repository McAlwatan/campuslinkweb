"use client";
import { useState, useEffect } from "react";
import { X, ChevronRight, GraduationCap, BookOpen, Calendar, Layers } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface University {
  id: string;
  name: string;
  short_name: string;
  id_prefix: string | null;
}

const YEAR_OPTIONS = [
  { value: 1, label: "1st Year" },
  { value: 2, label: "2nd Year" },
  { value: 3, label: "3rd Year" },
  { value: 4, label: "4th Year" },
  { value: 5, label: "5th Year" },
  { value: 6, label: "Postgraduate" },
];

const COMMON_MODULES = [
  "Mathematics", "Physics", "Chemistry", "Biology",
  "Computer Science", "Programming", "Algorithms", "Data Structures",
  "Calculus", "Statistics", "Linear Algebra", "Discrete Mathematics",
  "Engineering Drawing", "Thermodynamics", "Electronics",
  "Accounting", "Economics", "Finance", "Management",
  "Law", "Medicine", "Nursing", "Pharmacy",
  "Agriculture", "Architecture", "Civil Engineering",
  "Electrical Engineering", "Mechanical Engineering",
  "Software Engineering", "Information Technology",
  "Education", "Psychology", "Sociology", "Philosophy",
];

export default function OnboardingModal() {
  const qc = useQueryClient();
  const [step, setStep] = useState(1);
  const [uniSearch, setUniSearch] = useState("");
  const [selectedUni, setSelectedUni] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState<number | null>(null);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [customModule, setCustomModule] = useState("");
  const [detectedUni, setDetectedUni] = useState<University | null>(null);

  const { data: universities } = useQuery<University[]>({
    queryKey: ["universities"],
    queryFn: () => api.get("/universities").then((r) => r.data),
  });

  const { data: profile } = useQuery({
    queryKey: ["my-profile"],
    queryFn: () => api.get("/users/me").then((r) => r.data),
  });

  const updateProfile = useMutation({
    mutationFn: (data: any) => api.patch("/users/me/profile", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-profile"] }),
  });

  const skipOnboarding = useMutation({
    mutationFn: () => api.post("/users/me/skip-onboarding"),
    // onSuccess: () => qc.invalidateQueries({ queryKey: ["my-profile"] }),
    onSuccess: () => {
    // Immediately update the cache — no waiting for refetch
    qc.setQueryData(["my-profile"], (old: any) => ({
      ...old,
      onboarding_skipped: true,
    }));
  },
  });

  // Auto-detect university from university_id
  useEffect(() => {
    const uid = profile?.university_id;
    if (!uid || !universities) return;
    const upper = uid.toUpperCase();
    const match = universities.find(
      (u) => u.id_prefix && upper.startsWith(u.id_prefix.toUpperCase())
    );
    if (match) {
      setDetectedUni(match);
      setSelectedUni(match.name);
    }
  }, [profile, universities]);

  // Don't show if already completed or skipped
  if (!profile || profile.profile_completed || profile.onboarding_skipped) {
    return null;
  }

  const filteredUnis = universities?.filter((u) =>
    u.name.toLowerCase().includes(uniSearch.toLowerCase()) ||
    u.short_name.toLowerCase().includes(uniSearch.toLowerCase())
  ) ?? [];

  const toggleModule = (mod: string) => {
    setSelectedModules((prev) =>
      prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod]
    );
  };

  const addCustomModule = () => {
    const trimmed = customModule.trim();
    if (!trimmed || selectedModules.includes(trimmed)) return;
    setSelectedModules((prev) => [...prev, trimmed]);
    setCustomModule("");
  };

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync({
        university_name: selectedUni || undefined,
        course: course || undefined,
        year_of_study: year || undefined,
        modules: selectedModules.length > 0 ? selectedModules : undefined,
      });
      toast.success("Profile saved! We'll personalise your experience.");
    } catch {
      toast.error("Failed to save profile");
    }
  };

  const handleSkip = async () => {
    await skipOnboarding.mutateAsync();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {step === 1 && "Your university"}
                {step === 2 && "Your course"}
                {step === 3 && "Your modules"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {step === 1 && "Tell us where you study so we can connect you with the right people"}
                {step === 2 && "What are you studying and which year are you in?"}
                {step === 3 && "Select modules you study — we'll recommend relevant content"}
              </p>
            </div>
            <button
              onClick={handleSkip}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0 ml-4"
            >
              Skip for now
            </button>
          </div>

          {/* Step indicators */}
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  s === step ? "w-8 bg-primary" : s < step ? "w-4 bg-primary/40" : "w-4 bg-muted"
                )}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* Step 1 — University */}
          {step === 1 && (
            <div className="space-y-4">
              {detectedUni && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20">
                  <GraduationCap size={18} className="text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">Detected from your ID</p>
                    <p className="text-xs text-muted-foreground">{detectedUni.name}</p>
                  </div>
                  <button
                    onClick={() => setSelectedUni(detectedUni.name)}
                    className={cn(
                      "text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors",
                      selectedUni === detectedUni.name
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    )}
                  >
                    {selectedUni === detectedUni.name ? "Selected" : "Use this"}
                  </button>
                </div>
              )}

              <input
                value={uniSearch}
                onChange={(e) => setUniSearch(e.target.value)}
                placeholder="Search university…"
                className="input-field w-full"
              />

              <div className="max-h-56 overflow-y-auto space-y-1">
                {filteredUnis.slice(0, 20).map((uni) => (
                  <button
                    key={uni.id}
                    onClick={() => setSelectedUni(uni.name)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors",
                      selectedUni === uni.name
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "hover:bg-accent"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0",
                      selectedUni === uni.name ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                    )}>
                      {uni.short_name.slice(0, 3)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{uni.name}</p>
                      <p className="text-xs text-muted-foreground">{uni.short_name}</p>
                    </div>
                    {selectedUni === uni.name && (
                      <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Course + Year */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                  Course / Programme
                </label>
                <input
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="e.g. Bachelor of Science in Computer Science"
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                  Year of Study
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {YEAR_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setYear(opt.value)}
                      className={cn(
                        "py-2.5 px-3 rounded-xl text-sm font-medium transition-colors border",
                        year === opt.value
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border hover:bg-accent"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Modules */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  value={customModule}
                  onChange={(e) => setCustomModule(e.target.value)}
                  placeholder="Add a module not listed…"
                  className="input-field flex-1"
                  onKeyDown={(e) => { if (e.key === "Enter") addCustomModule(); }}
                />
                <button
                  onClick={addCustomModule}
                  className="btn-primary px-4 h-10 text-sm shrink-0"
                >
                  Add
                </button>
              </div>

              {selectedModules.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Selected ({selectedModules.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedModules.map((mod) => (
                      <span
                        key={mod}
                        onClick={() => toggleModule(mod)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium cursor-pointer hover:bg-primary/20 transition-colors"
                      >
                        {mod}
                        <X size={11} />
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs text-muted-foreground mb-2">Common modules</p>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                  {COMMON_MODULES.filter((m) => !selectedModules.includes(m)).map((mod) => (
                    <button
                      key={mod}
                      onClick={() => toggleModule(mod)}
                      className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-medium hover:bg-accent hover:text-foreground transition-colors"
                    >
                      {mod}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="btn-primary px-6 h-10 flex items-center gap-2 text-sm"
            >
              Continue <ChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={updateProfile.isPending}
              className="btn-primary px-6 h-10 text-sm"
            >
              {updateProfile.isPending ? "Saving…" : "Save & continue"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}