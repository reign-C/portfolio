"use client";

import { useRef } from "react";

/**
 * Click-to-enlarge for a project plate. The board captures render small on a
 * phone, so the full-resolution file opens in a modal dialog at natural size.
 */
export function PlateZoom({ src, alt }: { src: string; alt: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="label shrink-0 text-signal underline decoration-transparent underline-offset-4 transition-colors hover:decoration-signal"
      >
        Enlarge
      </button>

      <dialog
        ref={dialogRef}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto w-[min(94vw,1200px)] max-w-none border border-paper/30 bg-ink p-0 text-paper backdrop:bg-ink/85"
      >
        <img src={src} alt={alt} className="block h-auto w-full" />
        <form
          method="dialog"
          className="flex items-center justify-between gap-4 border-t border-paper/20 px-4 py-3"
        >
          <span className="label text-paper/50">Full resolution</span>
          <button className="label border border-paper/40 px-3 py-1.5 transition-colors hover:bg-paper hover:text-ink">
            Close
          </button>
        </form>
      </dialog>
    </>
  );
}
