import express from "express";
import { gzipHeaders } from "../../adapters/responseAdapters.mjs";

export default function staticController(staticFilesDir) {
  return express.static(staticFilesDir, {
    index: "index.html",
    setHeaders: gzipHeaders,
    extensions: ["gz"],
    redirect: false,
  });
}
