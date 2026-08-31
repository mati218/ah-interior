"use client";

import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRef } from "react";
import { UploadCloud, X, ArrowLeft, ArrowRight } from "lucide-react";

async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: formData, credentials: "include" });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.url as string;
}

interface GalleryUploaderProps {
  label?: string;
  value: string[];
  onChange: (urls: string[]) => void;
}

export function GalleryUploader({ label, value, onChange }: GalleryUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const mutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: (url) => onChange([...value, url]),
  });

  function move(index: number, dir: -1 | 1) {
    const next = [...value];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <span className="text-xs uppercase tracking-wider text-taupe">{label}</span>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {value.map((url, i) => (
          <div key={url + i} className="relative aspect-square overflow-hidden border border-border">
            <Image src={url} alt="" fill className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-charcoal/70 px-2 py-1">
              <button type="button" onClick={() => move(i, -1)} className="text-white hover:text-gold">
                <ArrowLeft size={13} />
              </button>
              <button type="button" onClick={() => remove(i)} className="text-white hover:text-error">
                <X size={13} />
              </button>
              <button type="button" onClick={() => move(i, 1)} className="text-white hover:text-gold">
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}

        <div
          onClick={() => inputRef.current?.click()}
          className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-border bg-cream/50 text-taupe transition-colors hover:border-gold"
        >
          <UploadCloud size={20} />
          <span className="text-xs">{mutation.isPending ? "Uploading..." : "Add photo"}</span>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) mutation.mutate(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
