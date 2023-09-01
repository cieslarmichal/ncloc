import {
  CheckIfPathExistsPayload,
  CheckIfPathIsDirectoryPayload,
  CheckIfPathIsFilePayload,
  FileSystemService,
  GetAllFilesFromDirectoryPayload,
  ReadFilePayload,
} from './fileSystemService.js';
import { existsSync, lstatSync } from 'fs';
import { readdir, readFile as readFileAsync } from 'node:fs/promises';
import { join } from 'path';

export class FileSystemServiceImpl implements FileSystemService {
  public checkIfPathIsDirectory(payload: CheckIfPathIsDirectoryPayload): boolean {
    const { path } = payload;

    return lstatSync(path).isDirectory();
  }

  public checkIfPathIsFile(payload: CheckIfPathIsFilePayload): boolean {
    const { path } = payload;

    return lstatSync(path).isFile();
  }

  public checkIfPathExists(payload: CheckIfPathExistsPayload): boolean {
    const { path } = payload;

    return existsSync(path);
  }

  public async getAllFilesFromDirectory(payload: GetAllFilesFromDirectoryPayload): Promise<string[]> {
    const { directoryPath } = payload;

    const relativePaths = await readdir(directoryPath, { recursive: true });

    const absolutePaths = relativePaths.map((relativePath) => join(directoryPath, relativePath));

    const absoluteFilePaths = absolutePaths.filter((absolutePath) => this.checkIfPathIsFile({ path: absolutePath }));

    return absoluteFilePaths;
  }

  public async readFile(payload: ReadFilePayload): Promise<string> {
    const { filePath } = payload;

    const content = await readFileAsync(filePath, 'utf-8');

    return content.toString();
  }
}
