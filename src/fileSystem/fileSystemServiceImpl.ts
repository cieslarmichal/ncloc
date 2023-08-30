import {
  CheckIfPathExistsPayload,
  CheckIfPathIsDirectoryPayload,
  FileSystemService,
  GetAllFilesFromDirectoryPayload,
} from './fileSystemService';
import { existsSync, lstatSync } from 'fs';
import { readdir } from 'node:fs/promises';

export class FileSystemServiceImpl implements FileSystemService {
  public checkIfPathIsDirectory(payload: CheckIfPathIsDirectoryPayload): boolean {
    const { path } = payload;

    return lstatSync(path).isDirectory();
  }

  public checkIfPathExists(payload: CheckIfPathExistsPayload): boolean {
    const { path } = payload;

    return existsSync(path);
  }

  public async getAllFilesFromDirectory(payload: GetAllFilesFromDirectoryPayload): Promise<string[]> {
    const { directoryPath } = payload;

    const files = await readdir(directoryPath, { recursive: true });

    return files;
  }
}
