export interface CheckIfPathIsDirectoryPayload {
  path: string;
}

export interface CheckIfPathIsFilePayload {
  path: string;
}

export interface CheckIfPathExistsPayload {
  path: string;
}

export interface GetAllFilesFromDirectoryPayload {
  directoryPath: string;
}

export interface ReadFilePayload {
  filePath: string;
}

export interface FileSystemService {
  checkIfPathIsDirectory(payload: CheckIfPathIsDirectoryPayload): boolean;
  checkIfPathIsFile(payload: CheckIfPathIsFilePayload): boolean;
  checkIfPathExists(payload: CheckIfPathExistsPayload): boolean;
  getAllFilesFromDirectory(payload: GetAllFilesFromDirectoryPayload): Promise<string[]>;
  readFile(payload: ReadFilePayload): Promise<string>;
}
