import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);

const envLocal = path.join(root, '.env.local');
const envExample = path.join(root, '.env.example');
if (!existsSync(envLocal) && existsSync(envExample)) {
  copyFileSync(envExample, envLocal);
  console.log('Creado .env.local desde .env.example (modo demo).');
}

const packDir = path.join(root, 'public', 'packs', 'mar-2026');
mkdirSync(packDir, { recursive: true });

const requiredGuide = path.join(packDir, 'guia-instagram-30-posts.pdf');
if (!existsSync(requiredGuide)) {
  console.log('Generando guías PDF…');
  const result = spawnSync(process.execPath, [path.join(root, 'scripts', 'generate-guides.mjs')], {
    cwd: root,
    stdio: 'inherit',
  });
  if (result.status !== 0) {
    console.warn('No se pudieron generar las guías PDF. El sitio igual puede abrir.');
  }
}

const zipPath = path.join(packDir, 'kitnegocio-pack-marzo.zip');
if (!existsSync(zipPath)) {
  const files = readdirSync(packDir).filter((name) => name.endsWith('.pdf') || name.endsWith('.xlsx'));
  if (files.length > 0) {
    const python = spawnSync(
      'python3',
      [
        '-c',
        'import zipfile, pathlib, sys; root=pathlib.Path(sys.argv[1]); zip_path=root/sys.argv[2]; names=sys.argv[3:]; z=zipfile.ZipFile(zip_path,"w",zipfile.ZIP_DEFLATED); [z.write(root/n, n) for n in names]; z.close()',
        packDir,
        'kitnegocio-pack-marzo.zip',
        ...files,
      ],
      { cwd: root, stdio: 'inherit' }
    );
    if (python.status === 0) {
      console.log('Creado kitnegocio-pack-marzo.zip');
    }
  }
}
