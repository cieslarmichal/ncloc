import {
  CheckIfPathExistsPayload,
  CheckIfPathIsDirectoryPayload,
  FileSystemService,
  GetAllFilesFromDirectoryPayload,
  ReadFilePayload,
} from './fileSystemService.js';
import { existsSync } from 'fs';
import { readdir, readFile as readFileAsync, lstat } from 'node:fs/promises';
import { join } from 'path';

export class FileSystemServiceImpl implements FileSystemService {
  public async checkIfPathIsDirectory(payload: CheckIfPathIsDirectoryPayload): Promise<boolean> {
    const { path } = payload;

    const stats = await lstat(path);

    return stats.isDirectory();
  }

  public checkIfPathExists(payload: CheckIfPathExistsPayload): boolean {
    const { path } = payload;

    return existsSync(path);
  }

  public async getAllFilesFromDirectory(payload: GetAllFilesFromDirectoryPayload): Promise<string[]> {
    const { directoryPath } = payload;

    const allPaths: string[] = [];

    await this.getAllFilesFromDirectoryHelper(directoryPath, allPaths);

    return allPaths;
  }

  private async getAllFilesFromDirectoryHelper(directoryPath: string, allPaths: string[]): Promise<void> {
    const relativePaths = await readdir(directoryPath);

    await Promise.all(
      relativePaths.map(async (relativePath) => {
        const absolutePath = join(directoryPath, relativePath);

        if (await this.checkIfPathIsDirectory({ path: absolutePath })) {
          await this.getAllFilesFromDirectoryHelper(absolutePath, allPaths);
        } else {
          allPaths.push(absolutePath);
        }
      }),
    );
  }

  public async readFile(payload: ReadFilePayload): Promise<string> {
    const { filePath } = payload;

    const content = await readFileAsync(filePath, 'utf-8');

    return content.toString();
  }
}
