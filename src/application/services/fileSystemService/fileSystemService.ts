export interface CheckIfPathIsDirectoryPayload {
  readonly path: string;
}

export interface CheckIfPathExistsPayload {
  readonly path: string;
}

export interface GetAllFilesFromDirectoryPayload {
  readonly directoryPath: string;
}

export interface ReadFilePayload {
  readonly filePath: string;
}

export interface FileSystemService {
  checkIfPathIsDirectory(payload: CheckIfPathIsDirectoryPayload): Promise<boolean>;
  checkIfPathExists(payload: CheckIfPathExistsPayload): boolean;
  getAllFilesFromDirectory(payload: GetAllFilesFromDirectoryPayload): Promise<string[]>;
  readFile(payload: ReadFilePayload): Promise<string>;
}
