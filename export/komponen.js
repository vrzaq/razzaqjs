/* 
Kode ini dilindungi hak cipta oleh Arifi Razzaq. 
 * Arifi Razzaq adalah pembuat kode ini. 
 * Pengguna dapat menghubungi Arifi Razzaq melalui WhatsApp atau berlangganan saluran YouTube-nya.
 * Hubungi WhatsApp : https://wa.me/6283193905842
 * Saluran YouTube : Arifi Razzaq Ofc
*/

import '../prototype/import.js';

import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';

const require = createRequire(import.meta.url);
const watchedFiles = new Set();

export const komponen = async (file) => {
  const importedModule = async (file) => {
    const url = `${file}?t=${Date.now()}`;
    const module = await url.import();
    return module;
  };

  const resolvedPath = file.startsWith('./') || file.startsWith('../') ? path.resolve(file) : file;

  if (!watchedFiles.has(resolvedPath)) {
    try {
      if (fs.existsSync(resolvedPath)) {
        fs.watch(resolvedPath, (eventType, filename) => {
          if (eventType === 'change') {
            console.log(`File changed: ${resolvedPath}. Reloading...`);
            watchedFiles.delete(resolvedPath);
          }
        });
        watchedFiles.add(resolvedPath);
      } else {
        console.error(`File not found: ${resolvedPath}`);
      }
    } catch (error) {
      console.error(`Failed to watch file ${resolvedPath}:`, error);
    }
  }

  const result = await importedModule(resolvedPath);
  return result;
};

/* 
Kode ini dilindungi hak cipta oleh Arifi Razzaq. 
 * Arifi Razzaq adalah pembuat kode ini. 
 * Pengguna dapat menghubungi Arifi Razzaq melalui WhatsApp atau berlangganan saluran YouTube-nya.
 * Hubungi WhatsApp : https://wa.me/6283193905842
 * Saluran YouTube : Arifi Razzaq Ofc
*/
