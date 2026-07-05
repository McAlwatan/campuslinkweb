import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export interface Folder {
  id: string;
  name: string;
  color: string | null;
  icon: string | null;
  created_at: string;
}

export interface SavedDocument {
  id: string;
  document_id: string;
  folder_id: string | null;
  saved_at: string;
}

export const useFolders = () =>
  useQuery<Folder[]>({
    queryKey: ["folders"],
    queryFn: () => api.get("/folders").then((r) => r.data),
  });

export const useFolderDocuments = (folderId: string) =>
  useQuery({
    queryKey: ["folder-docs", folderId],
    queryFn: () => api.get(`/folders/${folderId}/documents`).then((r) => r.data),
    enabled: !!folderId,
  });

export const useSavedDocuments = () =>
  useQuery({
    queryKey: ["saved-documents"],
    queryFn: () => api.get("/folders/saved").then((r) => r.data),
  });

export const useCreateFolder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; color?: string; icon?: string }) =>
      api.post("/folders", data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["folders"] }),
  });
};

export const useDeleteFolder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/folders/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["folders"] }),
  });
};

export const useSaveDocument = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { document_id: string; folder_id?: string }) =>
      api.post("/folders/save", data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["folders"] });
      qc.invalidateQueries({ queryKey: ["saved-documents"] });
    },
  });
};

export const useRemoveSaved = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (savedId: string) => api.delete(`/folders/saved/${savedId}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["saved-documents"] }),
  });
};