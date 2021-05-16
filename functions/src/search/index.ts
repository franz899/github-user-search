import express = require('express');
import type { Request, Response } from "express";
const router = express.Router();
import { getUsers } from "./search";
import type { SearchPage } from "./search";

router.get('/', getIndex);
async function getIndex(req: Request, res: Response) {
  const username = req.query.username;
  const pageNumber = Number(req.query.page) || 1;

  let page: SearchPage = {
    title: "GitHub User Search",
    query: "",
  };

  if (typeof username === "string" && username.length > 0) {
    const users = await getUsers(String(username), pageNumber);
    page = {
      ...page,
      query: username,
      results: users,
    };
  }

  res.render("index", page);
};

export default router;
