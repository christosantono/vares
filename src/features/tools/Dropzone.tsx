import { useRef, useState, type DragEvent } from "react";
import { motion } from "motion/react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Dropzone({
  file,
  onFile,
  accept = "image/*",
  hint = "PNG, JPG or WebP — up to 20 MB",
}: {
  file: File | null;
  onFile: (file: File | null) => void;
  accept?: string;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  function handleFile(f: File | null) {
    onFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f && f.type.startsWith("image/") ? URL.createObjectURL(f) : null);
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  }

  if (file && preview) {
    return (
      <div className="group relative overflow-hidden rounded-2xl border border-border/60">
        <img src={preview} alt="" className="aspect-square w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-background/95 to-transparent p-3">
          <div className="min-w-0 text-xs">
            <p className="truncate font-medium">{file.name}</p>
            <p className="text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => handleFile(null)}
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={`flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
        dragging ? "border-primary bg-primary/5" : "border-border/60 bg-muted/20 hover:border-primary/60"
      }`}
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary">
        <Upload className="h-5 w-5" />
      </span>
      <span className="text-sm font-medium">Drop an image or click to upload</span>
      <span className="text-xs text-muted-foreground">{hint}</span>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
    </motion.button>
  );
}
