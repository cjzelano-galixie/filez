import db from "#db/client";
import { createFolder } from "#db/queries/folders";
import { createFile } from "#db/queries/files";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 3; i++) {
    await createFolder("Folder" + i);
  }

  let fileCount = 1;
  for (let folderId = 1; folderId <= 3; folderId++) {
    for (let f = 1; f <= 5; f++) {
      await createFile(folderId, "File " + fileCount, fileCount * 10);
      fileCount++;
    }
  }
}
