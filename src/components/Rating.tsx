"use client";

import React, { useState } from "react";
import { Star, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitToSheet, getClientIP } from "@/lib/sheets";

interface RatingProps {
  projectId: string;
  projectTitle: string;
}

export function Rating({ projectId, projectTitle }: RatingProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleRating = async (value: number) => {
    if (status !== "idle") return;
    setRating(value);
    setStatus("loading");

    const ip = await getClientIP();

    await submitToSheet("Ratings", {
      Timestamp: new Date().toISOString(),
      "Project ID": projectId,
      "Project Title": projectTitle,
      Rating: value,
      IP: ip,
      "User Agent": navigator.userAgent,
      Referrer: document.referrer || "direct",
    });

    setStatus("done");
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
      <p className="text-sm font-medium text-zinc-400">Rate this project</p>

      {status === "done" ? (
        <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
          <CheckCircle className="w-4 h-4" />
          Thanks for your {rating}★ rating!
        </div>
      ) : (
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              disabled={status === "loading"}
              className="focus:outline-none disabled:cursor-not-allowed"
              onClick={() => handleRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              aria-label={`Rate ${star} out of 5 stars`}
              title={`Rate ${star} stars`}
            >
              <Star
                aria-hidden="true"
                className={cn(
                  "w-6 h-6 transition-colors",
                  hoveredRating >= star || rating >= star
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-zinc-600"
                )}
              />
            </button>
          ))}
          {status === "loading" && (
            <Loader2 className="w-4 h-4 ml-2 animate-spin text-zinc-500" />
          )}
        </div>
      )}
    </div>
  );
}
