import path from 'path';

const url = new URL(import.meta.url);
console.log('URL:', url);
console.log('pathname:', url.pathname);

const dirname = path.dirname(url.pathname);
console.log('dirname:', dirname);

const fixedDirname = dirname.replace(/^\/([A-Z]):/, '$1:');
console.log('fixed dirname:', fixedDirname);

const distPath = path.join(fixedDirname, 'dist');
console.log('dist path:', distPath);
console.log('exists:', await import('fs').then(fs => fs.existsSync(distPath)));

const cwd = process.cwd();
console.log('cwd:', cwd);
console.log('dist from cwd:', path.join(cwd, 'dist'));
console.log('exists from cwd:', await import('fs').then(fs => fs.existsSync(path.join(cwd, 'dist'))));