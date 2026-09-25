import db from "#db/client";

export async function createFile(folderId, name, size) {
  const sql = `
  INSERT INTO files
    (folder_id, name, size)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  const {
    rows: [file],
  } = await db.query(sql, [folderId, name, size]);
  return file;
}

export async function getFiles() {
  const sql = `
  SELECT files.*,
  folders.name AS folder_name
  FROM files 
  JOIN folders ON files.folder_id = folders.id
  `;

  const { rows: files } = await db.query(sql);
  return files;
}
