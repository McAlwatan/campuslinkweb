"use client";
import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import api from "@/lib/api";
import { toast } from "sonner";
import { FileText, Upload, Download, Trash2, Filter, Eye } from "lucide-react";
import DocumentViewer from "@/components/documents/DocumentViewer";

export default function DocumentsPage() {
  const queryClient = useQueryClient();
  const [courseTag, setCourseTag] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [viewingDoc, setViewingDoc] = useState<any>(null);

  const { data: documents, isLoading } = useQuery({
    queryKey: ["documents", courseTag],
    queryFn: () =>
      api
        .get("/documents", { params: courseTag ? { course_tag: courseTag } : {} })
        .then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/documents/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("Document deleted");
    },
  });

  const onDrop = useCallback(
    async (files: File[]) => {
      if (!title) { toast.error("Enter a title first"); return; }
      const file = files[0];
      const form = new FormData();
      form.append("file", file);
      form.append("title", title);
      if (tag) form.append("course_tag", tag);
      form.append("is_public", "true");
      setUploading(true);
      try {
        await api.post("/documents/upload", form, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) =>
            setProgress(Math.round((e.loaded / (e.total ?? 1)) * 100)),
        });
        toast.success("Document uploaded!");
        setTitle("");
        setTag("");
        queryClient.invalidateQueries({ queryKey: ["documents"] });
      } catch {
        toast.error("Upload failed");
      } finally {
        setUploading(false);
        setProgress(0);
      }
    },
    [title, tag, queryClient]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": [],
    },
    maxFiles: 1,
  });

  const fileTypeColor: Record<string, string> = {
    pdf: "bg-red-50 text-red-500",
    docx: "bg-blue-50 text-blue-500",
    pptx: "bg-amber-50 text-amber-500",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Documents</h1>
          <p className="text-sm text-text-secondary mt-0.5">
            Upload and share study materials
          </p>
        </div>
      </div>

      {/* Upload card */}
      <div className="card p-5 space-y-3">
        <h2 className="font-semibold text-text-primary">Upload document</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide block mb-1.5">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Database Systems Notes"
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary uppercase tracking-wide block mb-1.5">
              Course tag
            </label>
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="e.g. CS301"
              className="input-field w-full"
            />
          </div>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary-tint"
              : "border-border hover:border-primary-border"
          }`}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <div className="space-y-2">
              <p className="text-sm text-text-secondary">Uploading… {progress}%</p>
              <div className="w-full bg-surface rounded-full h-1.5">
                <div
                  className="bg-primary h-1.5 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload size={24} className="mx-auto text-text-hint" />
              <p className="text-sm text-text-secondary">
                Drag a PDF, DOCX or PPTX here, or{" "}
                <span className="text-primary font-medium">click to browse</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <Filter size={14} className="text-text-hint" />
        <input
          value={courseTag}
          onChange={(e) => setCourseTag(e.target.value)}
          placeholder="Filter by course tag…"
          className="input-field w-48"
        />
        {courseTag && (
          <button
            onClick={() => setCourseTag("")}
            className="text-xs text-primary font-medium"
          >
            Clear
          </button>
        )}
      </div>

      {/* Document list */}
      <div className="space-y-2">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 bg-surface rounded w-48" />
                  <div className="h-3 bg-surface rounded w-24" />
                </div>
              </div>
            </div>
          ))
        ) : documents?.length === 0 ? (
          <div className="card p-12 text-center">
            <FileText size={32} className="mx-auto text-text-hint mb-3" />
            <p className="text-text-secondary">No documents yet</p>
          </div>
        ) : (
          documents?.map((doc: any) => (
            <div
              key={doc.id}
              className="card p-4 flex items-center gap-3 hover:border-primary-border transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${fileTypeColor[doc.file_type] ?? "bg-surface text-text-secondary"}`}>
                <FileText size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-primary truncate">
                  {doc.title}
                </p>
                <p className="text-xs text-text-hint">
                  {doc.course_tag ?? "No tag"} ·{" "}
                  {doc.file_type?.toUpperCase()} ·{" "}
                  {new Date(doc.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setViewingDoc(doc)}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary-tint hover:border-primary-border transition-colors"
                >
                  <Eye size={14} className="text-text-secondary" />
                </button>
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-surface transition-colors"
                >
                  <Download size={14} className="text-text-secondary" />
                </a>
                <button
                  onClick={() => deleteMutation.mutate(doc.id)}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors"
                >
                  <Trash2 size={14} className="text-text-secondary hover:text-red-500" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Document viewer */}
      {viewingDoc && (
        <DocumentViewer
          doc={viewingDoc}
          onClose={() => setViewingDoc(null)}
        />
      )}
    </div>
  );
}