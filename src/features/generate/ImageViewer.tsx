import { useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Copy,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export type ViewerImage = {
  id: string;
  url: string;
  prompt: string;
};

type Props = {
  images: ViewerImage[];
  activeIndex: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function ImageViewer({ images, activeIndex, onClose, onIndexChange }: Props) {
  const open = activeIndex !== null;
  const active = open && activeIndex !== null ? images[activeIndex] : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && activeIndex !== null && activeIndex > 0) {
        onIndexChange(activeIndex - 1);
      }
      if (e.key === "ArrowRight" && activeIndex !== null && activeIndex < images.length - 1) {
        onIndexChange(activeIndex + 1);
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, activeIndex, images.length, onClose, onIndexChange]);

  if (!open || !active) return null;

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(active.url);
      toast.success("Image URL copied");
    } catch {
      toast.error("Couldn't copy URL");
    }
  };

  const download = () => {
    const a = document.createElement("a");
    a.href = active.url;
    a.download = `Zenivra-${active.id}.png`;
    a.target = "_blank";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 p-3 text-white">
        <p className="font-mono line-clamp-1 max-w-[60%] text-xs text-white/70">{active.prompt}</p>
        <div className="flex items-center gap-2">
          <p className="font-mono text-[10px] text-white/40">
            {activeIndex! + 1} / {images.length}
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-white hover:bg-white/10"
            aria-label="Close viewer"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stage */}
      <div className="relative flex-1 overflow-hidden">
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={8}
          centerOnInit
          wheel={{ step: 0.15 }}
          doubleClick={{ mode: "toggle", step: 1.5 }}
          pinch={{ step: 5 }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <TransformComponent
                wrapperClass="!w-full !h-full"
                contentClass="!w-full !h-full flex items-center justify-center"
              >
                <img
                  src={active.url}
                  alt={active.prompt}
                  className="max-h-full max-w-full select-none object-contain"
                  draggable={false}
                />
              </TransformComponent>

              {/* Prev / Next */}
              {activeIndex! > 0 && (
                <button
                  onClick={() => onIndexChange(activeIndex! - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur transition hover:bg-white/20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}
              {activeIndex! < images.length - 1 && (
                <button
                  onClick={() => onIndexChange(activeIndex! + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur transition hover:bg-white/20"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}

              {/* Bottom toolbar */}
              <div className="absolute inset-x-0 bottom-4 flex justify-center">
                <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-2 py-1 backdrop-blur">
                  <ToolbarBtn onClick={() => zoomOut()} aria-label="Zoom out (-)">
                    <ZoomOut className="h-4 w-4" />
                  </ToolbarBtn>
                  <ToolbarBtn onClick={() => zoomIn()} aria-label="Zoom in (+)">
                    <ZoomIn className="h-4 w-4" />
                  </ToolbarBtn>
                  <ToolbarBtn onClick={() => resetTransform()} aria-label="Reset zoom (0)">
                    <RotateCcw className="h-4 w-4" />
                  </ToolbarBtn>
                  <span className="mx-1 h-5 w-px bg-white/15" />
                  <ToolbarBtn onClick={download} aria-label="Download image">
                    <Download className="h-4 w-4" />
                  </ToolbarBtn>
                  <ToolbarBtn onClick={copyUrl} aria-label="Copy image URL">
                    <Copy className="h-4 w-4" />
                  </ToolbarBtn>
                  <ToolbarBtn
                    onClick={() => window.open(active.url, "_blank", "noopener")}
                    aria-label="Open in new tab"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </ToolbarBtn>
                </div>
              </div>
            </>
          )}
        </TransformWrapper>
      </div>

      {/* Keyboard hints */}
      <div className="hidden border-t border-white/10 px-4 py-2 text-center font-mono text-[10px] text-white/40 md:block">
        Esc close · ← → navigate · + − zoom · 0 reset · scroll to zoom · drag to pan
      </div>
    </div>
  );
}

function ToolbarBtn({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
    >
      {children}
    </button>
  );
}
