import express from "express";
const router = express.Router();
export default router;

import { getFolderById, getFolders } from "#db/queries/folders";
import { createFile } from "#db/queries/files";

router.get("/", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});

router.param("id", async (req, res, next, id) => {
  const folder = await getFolderById(id);
  if (!folder) return res.status(404).send("Folder not found.");

  req.folder = folder;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.folder);
});

router.post("/:id/files", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body required.");

  const folderId = req.params.id;
  const { name, size } = req.body;

  if (!name || !size) {
    return res.status(400).send("Request body needs: folderId, name, size");
  }

  const file = await createFile(folderId, name, size);
  res.status(201).send(file);
});
