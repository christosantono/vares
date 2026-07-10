import Link from "next/link";
import { ChevronDown, Image as ImageIcon, Video, Mic, Maximize2, Scissors } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const TOOLS = [
  {
    to: "/app/generate",
    label: "Text to Image",
    desc: "Create images from a prompt",
    icon: ImageIcon,
  },
  { to: "/app/video", label: "Text to Video", desc: "Animate ideas into short clips", icon: Video },
  { to: "/app/voice", label: "Text to Voice", desc: "Realistic AI voiceovers", icon: Mic },
  {
    to: "/app/upscale",
    label: "Upscale / 4K",
    desc: "Sharpen and enlarge images",
    icon: Maximize2,
  },
  {
    to: "/app/remove-bg",
    label: "Remove Background",
    desc: "Cut subjects in one click",
    icon: Scissors,
  },
] as const;

export function ToolsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus:outline-none">
        Tools <ChevronDown className="h-3.5 w-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72 p-2">
        {TOOLS.map((t) => (
          <DropdownMenuItem key={t.to} asChild className="cursor-pointer">
            <Link href={t.to} className="flex items-start gap-3 rounded-md p-2">
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-surface">
                <t.icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">{t.label}</span>
                <span className="block truncate text-xs text-muted-foreground">{t.desc}</span>
              </span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
