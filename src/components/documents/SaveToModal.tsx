"use client";
import { useState } from "react";
import { X, FolderPlus, Folder, Check, Loader2 } from "lucide-react";
import { useFolders, useCreateFolder, useSaveDocument } from "@/hooks/useFolders";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

const FOLDER_COLORS = [
  "#6C63FF", "#FF7A00", "#10B981", "#3B82F6",
  "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4",
];

interface Props {
  url: string;
  documentTitle: string;
  onClose: () => void;
}

export default function SaveToModal({ url, documentTitle, onClose }: Props) {
  const { data: folders, isLoading } = useFolders();
  const createFolder = useCreateFolder();
  const saveDocument = useSaveDocument();

  const [showNewFolder, setShowNewFolder] = useState(false);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState(FOLDER_COLORS[0]);
  const [saving, setSaving] = useState<string | null>(null);

  const handleSave = async (folderId?: string) => {
  setSaving(folderId ?? "none");
  try {
    // Find document by URL
    const docs = await api.get("/documents").then((r) => r.data);
    const doc = docs.find((d: any) => d.file_url === url);
    if (!doc) {
      toast.error("Document not found in system");
      return;
    }
    await saveDocument.mutateAsync({
      document_id: doc.id,
      folder_id: folderId,
    });
    toast.success(folderId ? "Saved to folder" : "Saved to library");
    onClose();
  } catch (err: any) {
    if (err?.response?.status === 409) {
      toast.info("Already saved in this folder");
    } else {
      toast.error("Failed to save");
    }
  } finally {
    setSaving(null);
  }
};

  const handleCreateFolder = async () => {
    if (!newName.trim()) return;
    try {
      const folder = await createFolder.mutateAsync({
        name: newName.trim(),
        color: newColor,
      });
      setShowNewFolder(false);
      setNewName("");
      await handleSave(folder.id);
    } catch {
      toast.error("Failed to create folder");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-sm overflow-hidden shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h3 className="font-semibold text-foreground text-sm">Save to</h3>
            <p className="text-xs text-muted-foreground truncate max-w-[240px] mt-0.5">
              {documentTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Save to library (no folder) */}
        <button
          onClick={() => handleSave(undefined)}
          disabled={!!saving}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors border-b border-border"
        >
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            {saving === "none"
              ? <Loader2 size={16} className="text-primary animate-spin" />
              : <Check size={16} className="text-primary" />
            }
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">My Library</p>
            <p className="text-xs text-muted-foreground">Save without a folder</p>
          </div>
        </button>

        {/* Folder list */}
        <div className="max-h-64 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={20} className="animate-spin text-muted-foreground" />
            </div>
          ) : folders?.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-6">
              No folders yet — create one below
            </p>
          ) : (
            folders?.map((folder) => (
              <button
                key={folder.id}
                onClick={() => handleSave(folder.id)}
                disabled={!!saving}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors border-b border-border/50 last:border-0"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${folder.color ?? "#6C63FF"}22` }}
                >
                  {saving === folder.id
                    ? <Loader2 size={16} className="animate-spin" style={{ color: folder.color ?? "#6C63FF" }} />
                    : <Folder size={16} style={{ color: folder.color ?? "#6C63FF" }} />
                  }
                </div>
                <span className="text-sm font-medium text-foreground">{folder.name}</span>
              </button>
            ))
          )}
        </div>

        {/* New folder form */}
        {showNewFolder ? (
          <div className="p-4 border-t border-border space-y-3">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Folder name e.g. CS301 Notes"
              className="input-field w-full text-sm"
              autoFocus
              onKeyDown={(e) => { if (e.key === "Enter") handleCreateFolder(); }}
            />
            {/* Color picker */}
            <div className="flex items-center gap-2">
              {FOLDER_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setNewColor(c)}
                  className={cn(
                    "w-6 h-6 rounded-full transition-transform",
                    newColor === c && "scale-125 ring-2 ring-offset-1 ring-offset-card"
                  )}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowNewFolder(false)}
                className="flex-1 h-9 rounded-xl border border-border text-sm text-muted-foreground hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                disabled={!newName.trim() || createFolder.isPending}
                className="flex-1 h-9 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {createFolder.isPending ? "Creating…" : "Create & save"}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowNewFolder(true)}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors border-t border-border"
          >
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
              <FolderPlus size={16} className="text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">New folder</span>
          </button>
        )}
      </div>
    </div>
  );
}