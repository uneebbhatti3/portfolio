/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <div className="w-full h-48 bg-muted" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
      onError={() => setImageError(true)}
    />
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "flex flex-col h-full border border-border rounded-xl overflow-hidden hover:ring-2 cursor-pointer hover:ring-muted transition-all duration-200",
          className,
        )}
      >
        <div className="relative shrink-0">
          <Link
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {video ? (
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-48 object-cover"
              />
            ) : image ? (
              <ProjectImage src={image} alt={title} />
            ) : (
              <div className="w-full h-48 bg-muted" />
            )}
          </Link>
          {links && links.length > 0 && (
            <div className="absolute top-2 right-2 flex flex-wrap gap-2">
              {links.map((link, idx) => (
                <Link
                  href={link.href}
                  key={idx}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Badge
                    className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90"
                    variant="default"
                  >
                    {link.icon}
                    {link.type}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col gap-3 flex-1">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{title}</h3>
            <time className="text-xs text-muted-foreground">{dates}</time>
          </div>
          <div className="text-xs prose max-w-full font-sans leading-relaxed text-muted-foreground dark:prose-invert line-clamp-3">
            <Markdown>{description}</Markdown>
          </div>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  className="text-[11px] font-medium border border-border h-6 w-fit px-2"
                  variant="outline"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex gap-2 pt-1">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 h-8 text-xs"
              onClick={() => setDialogOpen(true)}
            >
              Read more
            </Button>
            {href && (
              <Button
                size="sm"
                variant="default"
                className="flex-1 h-8 text-xs"
                asChild
              >
                <Link href={href} target="_blank" rel="noopener noreferrer">
                  Website
                  <ArrowUpRight className="h-3 w-3 ml-1" aria-hidden />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col p-0 gap-0 overflow-hidden">
          <div className="flex flex-col gap-4 overflow-y-auto p-6">
            {(image || video) && (
              <div className="rounded-md overflow-hidden">
                {video ? (
                  <video
                    src={video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full object-cover"
                  />
                ) : (
                  <img
                    src={image}
                    alt={title}
                    className="w-full object-cover"
                  />
                )}
              </div>
            )}
            <DialogHeader className="p-0 space-y-0 gap-1">
              <DialogTitle>{title}</DialogTitle>
              <time className="text-xs text-muted-foreground">{dates}</time>
            </DialogHeader>
            <div className="prose max-w-full text-pretty font-sans text-sm leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>{description}</Markdown>
            </div>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="text-[11px] font-medium border border-border h-6 w-fit px-2"
                    variant="outline"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            {href && (
              <Button size="sm" className="w-fit" asChild>
                <Link href={href} target="_blank" rel="noopener noreferrer">
                  Visit Website
                  <ArrowUpRight className="h-3.5 w-3.5 ml-1.5" aria-hidden />
                </Link>
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
