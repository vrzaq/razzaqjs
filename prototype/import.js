// node_modules/razzaqJs/prototype.js

/* 
Kode ini dilindungi hak cipta oleh Arifi Razzaq. 
 * Arifi Razzaq adalah pembuat kode ini. 
 * Pengguna dapat menghubungi Arifi Razzaq melalui WhatsApp atau berlangganan saluran YouTube-nya.
 * Hubungi WhatsApp : https://wa.me/6283193905842
 * Saluran YouTube : Arifi Razzaq Ofc
*/

import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';

const require = createRequire(import.meta.url);
const watchedFiles = new Set();

String.prototype.import = async function() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  let modulePath;
  let shouldWatch = false;

  if (this.startsWith('./') || this.startsWith('../')) {
    modulePath = path.resolve(__dirname, this);
    shouldWatch = true;
  } else if (this.startsWith('/')) {
    modulePath = path.resolve(this);
    shouldWatch = true;
  } else {
    try {
      const npmModule = await import(`${this}?t=${Date.now()}`);
      return npmModule.default !== undefined ? npmModule.default : npmModule;
    } catch (npmError) {
      try {
        const builtInModule = await import(`node:${this}?t=${Date.now()}`);
        return builtInModule.default !== undefined ? builtInModule.default : builtInModule;
      } catch (builtInError) {
        try {
          const projectRoot = path.resolve(__dirname, '../../');
          modulePath = path.resolve(projectRoot, this);
          shouldWatch = true;
        } catch (projectRootError) {
          console.error(`Gagal mengimpor modul ${this} sebagai npm, modul bawaan, atau dari akar proyek:`, projectRootError);
          throw projectRootError;
        }
      }
    }
  }

  if (shouldWatch && !watchedFiles.has(modulePath)) {
    try {
      if (fs.existsSync(modulePath)) {
        fs.watch(modulePath, (eventType, filename) => {
          if (eventType === 'change') {
            console.log(`File berubah: ${modulePath}. Reloading...`);
            watchedFiles.delete(modulePath);
            delete require.cache[require.resolve(modulePath)];
          }
        });
        watchedFiles.add(modulePath);
      } else {
        console.error(`Membaca File: ${modulePath}`);
      }
    } catch (watchError) {
      console.error(`Gagal melihat file ${modulePath}:`, watchError);
    }
  }

  try {
    const importedModule = await import(`${modulePath}?t=${Date.now()}`);
    return importedModule.default !== undefined ? importedModule.default : importedModule;
  } catch (error) {
    console.error(`Gagal mengimpor modul ${this}:`, error);
    throw error;
  }
};

/* 
Kode ini dilindungi hak cipta oleh Arifi Razzaq. 
 * Arifi Razzaq adalah pembuat kode ini. 
 * Pengguna dapat menghubungi Arifi Razzaq melalui WhatsApp atau berlangganan saluran YouTube-nya.
 * Hubungi WhatsApp : https://wa.me/6283193905842
 * Saluran YouTube : Arifi Razzaq Ofc
*/
