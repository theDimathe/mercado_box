import { cpSync, mkdirSync, rmSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist/src', { recursive: true });
cpSync('index.html', 'dist/index.html');
cpSync('src/style.css', 'dist/src/style.css');
cpSync('src/main.js', 'dist/src/main.js');

console.log('Build completed: dist/');
