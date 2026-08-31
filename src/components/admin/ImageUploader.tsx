"use client";

import { useMutation } from "@tanstack/react-query";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";

async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: formData, credentials: "include" });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.url as string;
}

interface ImageUploaderProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  className?: string;
}

export function ImageUploader({ label, value, onChange, className }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const mutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (url) => onChange(url),
  });

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <span className="text-xs uppercase tracking-wider text-taupe">{label}</span>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        className="relative flex h-40 w-full cursor-pointer items-center justify-center overflow-hidden border border-dashed border-border bg-cream/50 transition-colors hover:border-gold"
      >
        {value ? (
          <>
            <Image src={value} alt="Uploaded" fill className="object-cover" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="absolute right-2 top-2 rounded-full bg-charcoal/70 p-1 text-white hover:bg-error"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-taupe">
            <UploadCloud size={22} />
            <span className="text-xs">
              {mutation.isPending ? "Uploading..." : "Click to upload"}
            </span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) mutation.mutate(file);
        }}
      />

      {mutation.isError && (
        <span className="text-xs text-error">Upload failed. Try again.</span>
      )}
    </div>
  );
}
