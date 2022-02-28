import express from "express";
import { gzipHeaders } from "../../adapters/responseAdapters.mjs";

export default function staticController(staticFilesDir) {
  return express.static(staticFilesDir, {
    index: "index.json.gz",
    setHeaders: gzipHeaders,
    extensions: ["gz"],
    redirect: false,
    fallthrough: true,
  });
}
