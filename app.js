import express from "express";
const app = express();
export default app;

import filesRouter from "#api/files";
import foldersRouter from "#api/folders";

app.use(express.json());

// app.use here from the routers folders and files
app.use("/files", filesRouter);
app.use("/folders", foldersRouter);
