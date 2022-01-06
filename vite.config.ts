import childProcess from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import url from 'node:url';
import {defineConfig} from 'vite';

const currentDir = path.dirname(url.fileURLToPath(import.meta.url));

const buildDir = path.join(currentDir, 'public');
const sourceDir = path.join(currentDir, 'source');

function gitRevParse(): string {
  const revParse = childProcess.spawnSync(
    'git',
    ['rev-parse', '--short', '--verify', 'main'],
    {encoding: 'utf-8'},
  );

  if (revParse.error) {
    throw revParse.error;
  }

  return JSON.stringify(revParse.stdout.trim());
}

const hrefPlusVersion = process.env.npm_package_version ?? '<unknown version>';

export default defineConfig({
  build: {
    outDir: buildDir,
    sourcemap: true,
  },
  define: {
    hrefPlusVersion: JSON.stringify(hrefPlusVersion),
    hrefPlusCommitHash: gitRevParse(),
    hrefPlusUserAgent: `"href-plus/${hrefPlusVersion} (https://github.com/Bauke/href-plus)"`,
  },
  publicDir: path.join(sourceDir, 'assets'),
  root: sourceDir,
});
