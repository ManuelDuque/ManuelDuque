import { existsSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

export function getFiles({ path, extension = '' }) {
    const folderPath = join(process.cwd(), path);
    const files = readdirSync(folderPath);
    if (extension) {
        return files.filter(file => file.endsWith(extension));
    }
    return files;
}

export function read({ path }) {
    const packagePath = join(process.cwd(), path);
    const packageContent = readFileSync(packagePath, 'utf8');
    return packageContent;
}

export function write({ path, content }) {
    const packagePath = join(process.cwd(), path);
    writeFileSync(packagePath, content, 'utf8');
}

export function exists({ path }) {
    const packagePath = join(process.cwd(), path);
    return existsSync(packagePath);
}