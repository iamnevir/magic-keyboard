import React, { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import { defaultExtensions } from "./default-extensions";
import { cn } from "./utils";
export default function GenerateHtml({
  json,
  className,
}: {
  json: any;
  className?: string;
}) {
  const output = useMemo(() => {
    try {
      return generateHTML(json, defaultExtensions);
    } catch (error) {
      return null;
    }
  }, [json]);
  if (!output) {
    return null;
  }
  return (
    <article
      className={cn("prose", className)}
      dangerouslySetInnerHTML={{ __html: output }}
    ></article>
  );
}
