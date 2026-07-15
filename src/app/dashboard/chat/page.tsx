"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import {
  Send, Plus, X, MessageCircle, Paperclip,
  Mic, MicOff, SmilePlus, FileIcon, Play, Pause,
  RotateCcw, Check, CheckCheck, ImageIcon,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import SaveToModal from "@/components/documents/SaveToModal";
import { useSearchParams } from "next/navigation";

interface Message {
  id: string;
  room_id: string;
  sender_id: string;
  sender_name: string;
  content: string;
  sent_at: string;
  pending?: boolean;
  failed?: boolean;
}

interface Room {
  id: string;
  name: string | null;
  is_group: boolean;
  created_at: string;
  other_user?: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  } | null;
}


// ── Image cache ──────────────────────────────────────────
const imageCache = new Map<string, string>();

function CachedImage({ src, alt, className, onClick }: {
  src: string; alt: string; className?: string; onClick?: () => void;
}) {
  const [loaded, setLoaded] = useState(imageCache.has(src));
  const [error, setError] = useState(false);

  useEffect(() => {
    if (imageCache.has(src)) { setLoaded(true); return; }
    const img = new Image();
    img.src = src;
    img.onload = () => { imageCache.set(src, src); setLoaded(true); };
    img.onerror = () => setError(true);
  }, [src]);

  if (error) return (
    <div className="w-48 h-32 rounded-xl bg-muted flex items-center justify-center">
      <ImageIcon size={20} className="text-muted-foreground" />
    </div>
  );

  return (
    <div className="relative w-48 h-32 rounded-xl overflow-hidden cursor-pointer" onClick={onClick}>
      {!loaded && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover transition-opacity", loaded ? "opacity-100" : "opacity-0", className)}
      />
    </div>
  );
}

// ── Voice player ─────────────────────────────────────────
function VoicePlayer({ src, isMe }: { src: string; isMe: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const speeds = [1, 1.5, 2];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress((audio.currentTime / audio.duration) * 100 || 0);
    const onLoad = () => setDuration(audio.duration);
    const onEnd = () => { setPlaying(false); setProgress(0); };
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoad);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoad);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play(); setPlaying(true); }
  };

  const cycleSpeed = () => {
    const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
    setSpeed(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (audioRef.current) audioRef.current.currentTime = pct * audioRef.current.duration;
  };

  const formatTime = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  };

  const current = audioRef.current ? audioRef.current.currentTime : 0;

  return (
    <div className="flex items-center gap-2.5 w-52">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Play/pause */}
      <button
        onClick={togglePlay}
        className={cn(
          "w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors",
          isMe ? "bg-white/20 hover:bg-white/30" : "bg-primary/15 hover:bg-primary/25"
        )}
      >
        {playing
          ? <Pause size={16} className={isMe ? "text-white" : "text-primary"} />
          : <Play size={16} className={cn("translate-x-0.5", isMe ? "text-white" : "text-primary")} />
        }
      </button>

      {/* Waveform + progress */}
      <div className="flex-1 flex flex-col gap-1">
        <div
          className="relative h-6 flex items-center gap-px cursor-pointer"
          onClick={seek}
        >
          {Array.from({ length: 28 }).map((_, i) => {
            const barProgress = (i / 28) * 100;
            const filled = barProgress <= progress;
            const heights = [3, 5, 8, 6, 10, 7, 4, 9, 6, 8, 5, 10, 7, 4, 6, 9, 5, 8, 6, 10, 4, 7, 9, 5, 8, 6, 4, 7];
            return (
              <div
                key={i}
                className={cn(
                  "w-1 rounded-full transition-colors flex-shrink-0",
                  filled
                    ? isMe ? "bg-white/90" : "bg-primary"
                    : isMe ? "bg-white/30" : "bg-primary/25"
                )}
                style={{ height: `${heights[i % heights.length]}px` }}
              />
            );
          })}
        </div>
        <div className="flex items-center justify-between">
          <span className={cn("text-[10px]", isMe ? "text-white/60" : "text-muted-foreground")}>
            {playing ? formatTime(current) : formatTime(duration)}
          </span>
          <button
            onClick={cycleSpeed}
            className={cn(
              "text-[10px] font-semibold px-1.5 py-0.5 rounded transition-colors",
              isMe ? "text-white/70 hover:bg-white/10" : "text-primary hover:bg-primary/10"
            )}
          >
            {speed}×
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Image preview modal ───────────────────────────────────
function ImageModal({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
        <X size={18} className="text-white" />
      </button>
      <img
        src={src}
        alt="Full size"
        className="max-w-[90vw] max-h-[90vh] rounded-xl object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

// ── Image compose modal (crop + caption) ─────────────────
function ImageComposeModal({
  file,
  onSend,
  onClose,
}: {
  file: globalThis.File;
  onSend: (file: globalThis.File, caption: string) => void;
  onClose: () => void;
}) {
  const [caption, setCaption] = useState("");
  const [preview] = useState(() => URL.createObjectURL(file));

  return (
    <div className="fixed inset-0 bg-black/70 flex items-end justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-sm overflow-hidden">
        {/* Image preview */}
        <div className="relative bg-black flex items-center justify-center" style={{ height: 280 }}>
          <img src={preview} alt="Preview" className="max-h-full max-w-full object-contain" />
          <button
            onClick={onClose}
            className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center"
          >
            <X size={15} className="text-white" />
          </button>
        </div>

        {/* Caption input + send */}
        <div className="flex items-center gap-2 p-3 border-t border-border">
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add a caption…"
            className="input-field flex-1 h-9 text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") onSend(file, caption);
            }}
            autoFocus
          />
          <button
            onClick={() => onSend(file, caption)}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0"
          >
            <Send size={15} className="text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main chat page ────────────────────────────────────────
export default function ChatPage() {
  
  const [saveModal, setSaveModal] = useState<{ url: string; title: string } | null>(null);
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [imageCompose, setImageCompose] = useState<globalThis.File | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const attachRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  const { data: rooms, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => api.get("/chat/rooms").then((r) => r.data),
  });

  const { data: history } = useQuery({
    queryKey: ["messages", activeRoom?.id],
    queryFn: () =>
      api.get(`/chat/rooms/${activeRoom!.id}/messages`)
        .then((r) => r.data.reverse()),
    enabled: !!activeRoom,
    staleTime: 30_000,
  });

  useEffect(() => {
    if (history) setMessages(history);
  }, [history]);

  // WebSocket
  useEffect(() => {
    if (!activeRoom) return;
    const token = sessionStorage.getItem("access_token");
    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}/ws/chat/${activeRoom.id}?token=${token}`
    );
    ws.onmessage = (e) => {
      const msg: Message = JSON.parse(e.data);
      setMessages((prev) => {
        // exact id already present? nothing to do
        if (prev.some((m) => m.id === msg.id)) return prev;

        // match the still-pending optimistic bubble by id prefix, not the
        // pending flag (which we flip early and causes a race)
        const idx = prev.findIndex(
          (m) =>
            m.id.startsWith("pending-") &&
            m.sender_id === msg.sender_id &&
            m.content === msg.content
        );
        if (idx !== -1) {
          const next = [...prev];
          next[idx] = msg;
          return next;
        }
        return [...prev, msg];
      });
    };
    ws.onerror = () => toast.error("Connection error");
    wsRef.current = ws;
    return () => { ws.close(); wsRef.current = null; };
  }, [activeRoom]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node))
        setShowEmoji(false);
      if (attachRef.current && !attachRef.current.contains(e.target as Node))
        setShowAttachMenu(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const createRoomMutation = useMutation({
    mutationFn: () =>
      api.post("/chat/rooms", { name: roomName, is_group: true, member_ids: [] }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Room created!");
      setShowCreate(false);
      setRoomName("");
    },
  });

  useEffect(() => {
    const targetRoomId = searchParams.get("room");
    if (!targetRoomId || !rooms || activeRoom) return;
    const match = rooms.find((r: Room) => r.id === targetRoomId);
    if(match) setActiveRoom(match);
  }, [searchParams, rooms, activeRoom])

  // Optimistic send text
  const sendMessage = () => {
    if (!input.trim() || !wsRef.current) return;
    const optimistic: Message = {
      id: `pending-${Date.now()}`,
      room_id: activeRoom!.id,
      sender_id: user!.id,
      sender_name: user!.full_name,
      content: input.trim(),
      sent_at: new Date().toISOString(),
      pending: true,
    };
    setMessages((prev) => [...prev, optimistic]);
    wsRef.current.send(input.trim());
    setInput("");
    setShowEmoji(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const onEmojiClick = (data: EmojiClickData) => setInput((p) => p + data.emoji);

  // Upload helper with optimistic message
  const uploadAndSend = async (
    file: globalThis.File,
    type: "image" | "file" | "voice",
    caption?: string
  ) => {
    if (!wsRef.current || !activeRoom) return;

    // optimistic placeholder
    const tempUrl = type === "image" ? URL.createObjectURL(file) : "";
    const optimisticContent = type === "image"
      ? `🖼️ Shared an image: ${file.name} — ${tempUrl}${caption ? `\n${caption}` : ""}`
      : type === "voice"
      ? `🎤 Voice note: uploading…`
      : `📎 Shared a file: ${file.name} — uploading…`;

    const optimistic: Message = {
      id: `pending-${Date.now()}`,
      room_id: activeRoom.id,
      sender_id: user!.id,
      sender_name: user!.full_name,
      content: optimisticContent,
      sent_at: new Date().toISOString(),
      pending: true,
    };
    setMessages((prev) => [...prev, optimistic]);

    const form = new FormData();
    form.append("file", file);
    if (type === "file") {
      form.append("title", file.name);
      form.append("is_public", "true");
    }

    try {
      const endpoint = type === "file" ? "/documents/upload" : "/documents/media";
      const { data } = await api.post(endpoint, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      let realContent: string;
      if (type === "image") {
        realContent = `🖼️ Shared an image: ${data.title} — ${data.file_url}${caption ? `\n${caption}` : ""}`;
        imageCache.set(data.file_url, data.file_url);
      } else if (type === "voice") {
        realContent = `🎤 Voice note: ${data.file_url}`;
      } else {
        realContent = `📎 Shared a file: ${data.title} — ${data.file_url}`;
      }

      wsRef.current?.send(realContent);

      // update optimistic message with real URL
      setMessages((prev) =>
        prev.map((m) =>
          m.id === optimistic.id ? { ...m, content: realContent, pending: false } : m
        )
      );
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((m) => m.id === optimistic.id ? { ...m, failed: true, pending: false } : m)
      );
      toast.error(err.response?.data?.detail ?? "Upload failed");
    }
  };

  // Voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const file = new globalThis.File([blob], `voice_${Date.now()}.webm`, { type: "audio/webm" });
        await uploadAndSend(file, "voice");
        stream.getTracks().forEach((t) => t.stop());
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingSeconds(0);
      recordingTimerRef.current = setInterval(() => setRecordingSeconds((s) => s + 1), 1000);
    } catch {
      toast.error("Microphone access denied");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    setRecordingSeconds(0);
  };

  const formatRecording = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const isDark = typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  // ── Message renderer ──────────────────────────────────
  const renderBubble = (msg: Message) => {
    const isMe = msg.sender_id === user?.id;
    const isVoice = msg.content.startsWith("🎤 Voice note:");
    const isImage = msg.content.startsWith("🖼️ Shared an image:");
    const isFile = msg.content.startsWith("📎 Shared a file:");

    if (isImage) {
      const rest = msg.content.replace("🖼️ Shared an image: ", "");
      const parts = rest.split(" — ");
      const url = parts[1]?.split("\n")[0] ?? "";
      const caption = rest.includes("\n") ? rest.split("\n").slice(1).join("\n") : "";
      const isUploading = url === "uploading…" || url.startsWith("blob:");

      return (
        <div className="space-y-1">
          <div className="relative">
            {isUploading ? (
              <div className="w-48 h-32 rounded-xl bg-muted flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
            ) : (
              <CachedImage
                src={url}
                alt="Shared image"
                onClick={() => setLightboxSrc(url)}
              />
            )}
            {msg.pending && (
              <div className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-black/40 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full border border-white/60 border-t-transparent animate-spin" />
              </div>
            )}
          </div>
          {caption && (
            <p className={cn("text-xs px-1", isMe ? "text-primary-foreground/80" : "text-muted-foreground")}>
              {caption}
            </p>
          )}
        </div>
      );
    }

    if (isVoice) {
      const url = msg.content.replace("🎤 Voice note: ", "");
      const isUploading = url === "uploading…";
      return isUploading ? (
        <div className="flex items-center gap-2 w-52">
          <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
            <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
          <span className={cn("text-xs", isMe ? "text-primary-foreground/70" : "text-muted-foreground")}>
            Sending voice note…
          </span>
        </div>
      ) : (
        <VoicePlayer src={url} isMe={isMe} />
      );
    }

    if (isFile) {
      const rest = msg.content.replace("📎 Shared a file: ", "");
      const parts = rest.split(" — ");
      const name = parts[0];
      const url = parts[1];
      const isUploading = url === "uploading…";
      return (
        <div className="flex items-center gap-2.5">
          <div className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
            isMe ? "bg-white/20" : "bg-primary/15"
          )}>
            {isUploading
              ? <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              : <FileIcon size={16} className={isMe ? "text-white/80" : "text-primary"} />
            }
          </div>
          <div className="flex-1 min-w-0">
            <p className={cn("text-xs font-medium truncate max-w-[140px]", isMe ? "text-white/90" : "text-foreground")}>
              {isUploading ? "Uploading…" : "Document"}
            </p>
            {!isUploading && url && (
                <div className="flex items-center gap-2">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("text-[10px] underline", isMe ? "text-white/60" : "text-primary")}
                  >
                    Open file
                  </a>
                  <button
                    onClick={() => setSaveModal({ url, title: name })}
                    className={cn("text-[10px] font-medium", isMe ? "text-white/70" : "text-primary")}
                  >
                    · Save
                  </button>
                </div>
            )}
          </div>
        </div>
      );
    }

    // plain text
    return <span className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</span>;
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">

      {/* Room list */}
      <div className="w-64 shrink-0 card flex flex-col overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Messages</h2>
          <button
            onClick={() => setShowCreate(true)}
            className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
          >
            <Plus size={14} className="text-primary" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-3 rounded-xl animate-pulse flex gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-muted shrink-0" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-3 bg-muted rounded w-3/4" />
                    <div className="h-2.5 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))
            : rooms?.map((room: Room) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left",
                    activeRoom?.id === room.id ? "bg-accent" : "hover:bg-accent/50"
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <span className="text-primary text-xs font-bold">
                      {room.is_group ? (room.name ?? "Group") : (room.other_user?.full_name ?? "Direct Message")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm font-medium truncate", activeRoom?.id === room.id ? "text-primary" : "text-foreground")}>
                      {(room.is_group ? room.name : room.other_user?.full_name)?.slice(0, 2).toUpperCase() ?? "DM"}
                    </p>
                    <p className="text-xs text-muted-foreground">{room.is_group ? "Group" : "DM"}</p>
                  </div>
                </button>
              ))
          }
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 card flex flex-col overflow-hidden">
        {activeRoom ? (
          <>
            {/* Topbar */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
                <span className="text-primary text-xs font-bold">
                  {(activeRoom.name ?? "DM").slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{activeRoom.name ?? "Direct Message"}</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
              {messages.map((msg) => {
                const isMe = msg.sender_id === user?.id;
                const isImage = msg.content.startsWith("🖼️ Shared an image:");
                const isVoice = msg.content.startsWith("🎤 Voice note:");
                const isFile = msg.content.startsWith("📎 Shared a file:");
                const isMedia = isImage || isVoice || isFile;

                return (
                  <div
                    key={msg.id}
                    className={cn("flex", isMe ? "justify-end" : "justify-start")}
                  >
                    <div className={cn("max-w-[65%] flex flex-col", isMe ? "items-end" : "items-start")}>
                      {!isMe && (
                        <p className="text-[11px] text-muted-foreground mb-0.5 px-3">
                          {msg.sender_name}
                        </p>
                      )}
                      <div
                        className={cn(
                          "rounded-2xl",
                          isMedia ? "p-1.5" : "px-3.5 py-2",
                          isMe
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-muted text-foreground rounded-bl-sm",
                          msg.failed && "opacity-60"
                        )}
                      >
                        {renderBubble(msg)}
                      </div>
                      <div className={cn("flex items-center gap-1 mt-0.5 px-1", isMe ? "flex-row-reverse" : "flex-row")}>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(msg.sent_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        {isMe && (
                          msg.failed
                            ? <RotateCcw size={11} className="text-destructive" />
                            : msg.pending
                            ? <Check size={11} className="text-primary-foreground/50" />
                            : <CheckCheck size={11} className="text-primary-foreground/70" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div className="px-3 py-2.5 border-t border-border shrink-0">
              {isRecording && (
                <div className="flex items-center gap-2 mb-2 px-3 py-1.5 bg-red-50 dark:bg-red-950/30 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs text-red-600 dark:text-red-400 font-medium flex-1">
                    {formatRecording(recordingSeconds)}
                  </span>
                  <button onClick={stopRecording} className="text-xs text-red-600 dark:text-red-400 font-semibold">
                    Send
                  </button>
                  <button onClick={() => {
                    mediaRecorderRef.current?.stop();
                    setIsRecording(false);
                    if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
                    audioChunksRef.current = [];
                  }} className="text-xs text-muted-foreground">
                    Cancel
                  </button>
                </div>
              )}

              <div className="flex items-center gap-1.5">
                {/* Attach */}
                <div className="relative" ref={attachRef}>
                  <button
                    onClick={() => setShowAttachMenu(!showAttachMenu)}
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center transition-colors",
                      showAttachMenu ? "bg-primary text-primary-foreground" : "hover:bg-accent text-muted-foreground"
                    )}
                  >
                    <Paperclip size={18} />
                  </button>
                  {showAttachMenu && (
                    <div className="absolute bottom-11 left-0 bg-card border border-border rounded-2xl shadow-modal p-2 w-40 space-y-0.5 z-10">
                      <button
                        onClick={() => { imageInputRef.current?.click(); setShowAttachMenu(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-accent text-sm text-foreground transition-colors"
                      >
                        <ImageIcon size={16} className="text-primary" /> Image
                      </button>
                      <button
                        onClick={() => { fileInputRef.current?.click(); setShowAttachMenu(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-accent text-sm text-foreground transition-colors"
                      >
                        <FileIcon size={16} className="text-primary" /> Document
                      </button>
                    </div>
                  )}
                  <input ref={imageInputRef} type="file" accept="image/*" className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setImageCompose(file);
                      e.target.value = "";
                    }}
                  />
                  <input ref={fileInputRef} type="file" accept=".pdf,.docx,.pptx" className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadAndSend(file, "file");
                      e.target.value = "";
                    }}
                  />
                </div>

                {/* Text input + emoji */}
                <div className="relative flex-1" ref={emojiRef}>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message…"
                    className="w-full h-10 bg-muted rounded-full px-4 pr-10 text-sm border-none outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    onClick={() => setShowEmoji(!showEmoji)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <SmilePlus size={17} />
                  </button>
                  {showEmoji && (
                    <div className="absolute bottom-12 right-0 z-20">
                      <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        theme={isDark ? Theme.DARK : Theme.LIGHT}
                        height={360}
                        width={300}
                      />
                    </div>
                  )}
                </div>

                {/* Mic or send */}
                {input.trim() ? (
                  <button
                    onClick={sendMessage}
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
                  >
                    <Send size={16} className="text-primary-foreground translate-x-0.5" />
                  </button>
                ) : (
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
                      isRecording ? "bg-red-500" : "hover:bg-accent text-muted-foreground"
                    )}
                  >
                    {isRecording
                      ? <MicOff size={18} className="text-white" />
                      : <Mic size={18} />
                    }
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center">
              <MessageCircle size={28} className="text-primary" />
            </div>
            <p className="font-semibold text-foreground">Select a conversation</p>
            <p className="text-sm text-muted-foreground">
              Or{" "}
              <button onClick={() => setShowCreate(true)} className="text-primary font-medium">
                create a new room
              </button>
            </p>
          </div>
        )}
      </div>

      {/* Create room modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-modal">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-foreground text-lg">New room</h2>
              <button onClick={() => setShowCreate(false)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center">
                <X size={14} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="e.g. CS301 Group Chat"
                className="input-field w-full"
                onKeyDown={(e) => { if (e.key === "Enter" && roomName) createRoomMutation.mutate(); }}
              />
              <button
                onClick={() => createRoomMutation.mutate()}
                disabled={!roomName || createRoomMutation.isPending}
                className="btn-primary w-full h-11"
              >
                {createRoomMutation.isPending ? "Creating…" : "Create room"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image compose modal */}
      {imageCompose && (
        <ImageComposeModal
          file={imageCompose}
          onSend={(file, caption) => {
            uploadAndSend(file, "image", caption);
            setImageCompose(null);
          }}
          onClose={() => setImageCompose(null)}
        />
      )}

      {/* Lightbox */}
      {lightboxSrc && (
        <ImageModal src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}

      {/* Save to modal */}
        {saveModal && (
          <SaveToModal
            url={saveModal.url}
            documentTitle={saveModal.title}
            onClose={() => setSaveModal(null)}
          />
        )}
    </div>
  );
}