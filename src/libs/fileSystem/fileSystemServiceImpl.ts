import {
  CheckIfPathExistsPayload,
  CheckIfPathIsDirectoryPayload,
  FileSystemService,
  GetAllFilesFromDirectoryPayload,
  ReadFilePayload,
} from './fileSystemService';
import { existsSync, lstatSync } from 'fs';
import { readdir, readFile as readFileAsync } from 'node:fs/promises';

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

  public async readFile(payload: ReadFilePayload): Promise<string> {
    const { filePath } = payload;

    const content = await readFileAsync(filePath, 'utf-8');

    return content.toString();
  }
}
