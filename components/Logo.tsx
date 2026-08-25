import Link from "next/link";
import { MapPin } from "lucide-react";

export default function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity rounded-lg"
      aria-label="DMC – Go to home"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white dark:bg-accent">
        <MapPin className="h-5 w-5 text-white" aria-hidden />
      </div>
      <span className="font-display text-xl font-bold text-soil-950 dark:text-white tracking-tight">
        DMC
      </span>
    </Link>
  );
}
