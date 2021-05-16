import type { Application } from "express";
import path = require("path");
import express = require("express");

export function createMockServer(): Application {
  const app: Application = express();
  app.set("views", path.join(process.cwd(), "views"));
  app.set("view engine", "pug");

  return app;
}