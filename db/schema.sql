DROP TABLE IF EXISTS folders;
DROP TABLE IF EXISTS files;

CREATE TABLE folders (
    id serial PRIMARY KEY,
    name text UNIQUE NOT NULL
);

CREATE TABLE files(
    id serial PRIMARY KEY,
    folder_id integer NOT NULL REFERENCES folders(id) ON DELETE CASCADE,
    name text NOT NULL,
    size integer NOT NULL,
    UNIQUE (name, folder_id)
);