"use client";
import { useState } from "react";
import { X, Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  doc: {
    id: string;
    title: string;
    file_url: string;
    file_type: string;
  };
  onClose: () => void;
}

export default function DocumentViewer({ doc, onClose }: Props) {
  const [scale, setScale] = useState(1);

  const isPdf = doc.file_type === "pdf";
  const isOffice = ["docx", "pptx"].includes(doc.file_type);

  // For DOCX/PPTX use Microsoft Office Online viewer
  const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(doc.file_url)}`;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-modal overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border shrink-0">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-text-primary truncate">{doc.title}</p>
            <p className="text-xs text-text-hint uppercase">{doc.file_type}</p>
          </div>

          {isPdf && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-surface transition-colors"
              >
                <ZoomOut size={14} className="text-text-secondary" />
              </button>
              <span className="text-xs text-text-secondary w-10 text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale((s) => Math.min(3, s + 0.25))}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-surface transition-colors"
              >
                <ZoomIn size={14} className="text-text-secondary" />
              </button>
            </div>
          )}

          <a
            href={doc.file_url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 h-8 rounded-lg border border-border text-xs text-text-secondary hover:bg-surface transition-colors"
          >
            <Download size={13} />
            Download
          </a>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-surface transition-colors"
          >
            <X size={14} className="text-text-secondary" />
          </button>
        </div>

        {/* Viewer */}
        <div className="flex-1 overflow-auto bg-[#f5f5f5]">
          {isPdf ? (
            <div className="flex justify-center p-6">
              <iframe
                src={`${doc.file_url}#zoom=${Math.round(scale * 100)}`}
                className="w-full rounded-xl shadow-card"
                style={{
                  height: "75vh",
                  transform: `scale(${scale})`,
                  transformOrigin: "top center",
                  border: "none",
                }}
                title={doc.title}
              />
            </div>
          ) : isOffice ? (
            <iframe
              src={officeViewerUrl}
              className="w-full h-full border-none"
              title={doc.title}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-3">
                <p className="text-text-secondary">
                  Preview not available for this file type.
                </p>
                <a
                  href={doc.file_url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-2 px-4 h-10 text-sm"
                >
                  <Download size={14} />
                  Download file
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}