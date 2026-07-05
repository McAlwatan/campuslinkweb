"use client";
import { useState } from "react";
import {
  Folder, FolderOpen, FileText, Trash2,
  Plus, ChevronRight, ArrowLeft, BookOpen,
} from "lucide-react";
import {
  useFolders, useFolderDocuments,
  useSavedDocuments, useDeleteFolder,
  useCreateFolder,
} from "@/hooks/useFolders";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const FOLDER_COLORS = [
  "#6C63FF", "#FF7A00", "#10B981", "#3B82F6",
  "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4",
];

export default function FoldersPage() {
  const { data: folders, isLoading } = useFolders();
  const { data: savedDocs } = useSavedDocuments();
  const deleteFolder = useDeleteFolder();
  const createFolder = useCreateFolder();

  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState(FOLDER_COLORS[0]);

  const { data: folderDocs } = useFolderDocuments(activeFolder ?? "");

  const activeFolderData = folders?.find((f) => f.id === activeFolder);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      await createFolder.mutateAsync({ name: newName.trim(), color: newColor });
      toast.success("Folder created");
      setShowNew(false);
      setNewName("");
    } catch {
      toast.error("Failed to create folder");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete folder "${name}"? Saved documents won't be deleted.`)) return;
    try {
      await deleteFolder.mutateAsync(id);
      toast.success("Folder deleted");
      if (activeFolder === id) setActiveFolder(null);
    } catch {
      toast.error("Failed to delete folder");
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          {activeFolder ? (
            <button
              onClick={() => setActiveFolder(null)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-1"
            >
              <ArrowLeft size={14} />
              <span className="text-sm">All folders</span>
            </button>
          ) : null}
          <h1 className="text-2xl font-bold text-foreground">
            {activeFolderData ? activeFolderData.name : "My Folders"}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {activeFolder
              ? `${folderDocs?.length ?? 0} documents`
              : `${folders?.length ?? 0} folders · ${savedDocs?.length ?? 0} saved documents`
            }
          </p>
        </div>
        {!activeFolder && (
          <button
            onClick={() => setShowNew(true)}
            className="btn-primary h-9 px-4 flex items-center gap-2 text-sm"
          >
            <Plus size={15} /> New folder
          </button>
        )}
      </div>

      {/* New folder form */}
      {showNew && (
        <div className="card p-4 space-y-3">
          <h3 className="font-semibold text-foreground text-sm">Create folder</h3>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. CS301 Notes, Assignments, Past Papers"
            className="input-field w-full"
            autoFocus
            onKeyDown={(e) => { if (e.key === "Enter") handleCreate(); }}
          />
          <div>
            <p className="text-xs text-muted-foreground mb-2">Choose a color</p>
            <div className="flex items-center gap-2">
              {FOLDER_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setNewColor(c)}
                  className={cn(
                    "w-7 h-7 rounded-full transition-transform",
                    newColor === c && "scale-125 ring-2 ring-offset-2 ring-offset-card"
                  )}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setShowNew(false); setNewName(""); }}
              className="flex-1 h-10 rounded-xl border border-border text-sm text-muted-foreground hover:bg-accent transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!newName.trim() || createFolder.isPending}
              className="flex-1 h-10 btn-primary text-sm"
            >
              {createFolder.isPending ? "Creating…" : "Create folder"}
            </button>
          </div>
        </div>
      )}

      {/* Folder view */}
      {!activeFolder ? (
        <>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="card p-4 h-28 animate-pulse" />
              ))}
            </div>
          ) : folders?.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                <Folder size={28} className="text-primary" />
              </div>
              <p className="font-semibold text-foreground">No folders yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Create folders to organize your study materials
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {folders?.map((folder) => (
                <div
                  key={folder.id}
                  className="card p-4 hover:border-primary-border transition-colors group cursor-pointer relative"
                  onClick={() => setActiveFolder(folder.id)}
                >
                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(folder.id, folder.name);
                    }}
                    className="absolute top-3 right-3 w-7 h-7 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-destructive/10 flex items-center justify-center transition-all"
                  >
                    <Trash2 size={13} className="text-destructive" />
                  </button>

                  {/* Folder icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${folder.color ?? "#6C63FF"}22` }}
                  >
                    <FolderOpen
                      size={24}
                      style={{ color: folder.color ?? "#6C63FF" }}
                    />
                  </div>

                  <p className="font-semibold text-foreground text-sm truncate pr-6">
                    {folder.name}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <ChevronRight size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Open folder</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* All saved docs */}
          {(savedDocs?.length ?? 0) > 0 && (
            <div className="card p-5">
              <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <BookOpen size={16} className="text-primary" />
                All saved documents
              </h2>
              <div className="space-y-2">
                {savedDocs?.map((doc: any) => (
                  <div
                    key={doc.id}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText size={15} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.file_type?.toUpperCase()} · {doc.course_tag ?? "No tag"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        /* Folder contents */
        <div className="card p-5">
          {!folderDocs || folderDocs.length === 0 ? (
            <div className="text-center py-10">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: `${activeFolderData?.color ?? "#6C63FF"}22` }}
              >
                <Folder size={24} style={{ color: activeFolderData?.color ?? "#6C63FF" }} />
              </div>
              <p className="font-semibold text-foreground">Folder is empty</p>
              <p className="text-sm text-muted-foreground mt-1">
                Save documents here from the chat or documents page
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {folderDocs.map((doc: any) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText size={15} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{doc.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.file_type?.toUpperCase()} · {doc.course_tag ?? "No tag"}
                    </p>
                  </div>
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary font-medium hover:underline shrink-0"
                  >
                    Open
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}