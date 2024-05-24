/* 
Kode ini dilindungi hak cipta oleh Arifi Razzaq. 
 * Arifi Razzaq adalah pembuat kode ini. 
 * Pengguna dapat menghubungi Arifi Razzaq melalui WhatsApp atau berlangganan saluran YouTube-nya.
 * Hubungi WhatsApp : https://wa.me/6283193905842
 * Saluran YouTube : Arifi Razzaq Ofc
*/

import './prototype/import.js';
import './prototype/warna.js';

import path from 'path';
import { fileURLToPath } from 'url';

global.pathToFileURL = function(filepath, addTimestamp = false) {
  let resolvedPath = path.resolve(filepath).replace(/\\/g, '/');
  if (resolvedPath[0] !== '/') {
    resolvedPath = `/${resolvedPath}`;
  }
  const url = new URL(`file://${resolvedPath}`);
  if (addTimestamp) {
    url.searchParams.append('v', Date.now());
  }
  return url;
}

global.fileURLToPath = function(fileUrl) {
  return fileURLToPath(new URL(fileUrl));
}

global.isAbsolutePath = function(filepath) {
  return path.isAbsolute(filepath);
}

global.kelas = function(className, constructorFunc, parentClass = null) {
  if (parentClass) {
    global[className] = class extends global[parentClass] {
      constructor(...args) {
        super(...args);
        constructorFunc.apply(this, args);
      }
    }
  } else {
    global[className] = class {
      constructor(...args) {
        constructorFunc.apply(this, args);
      }
    }
  }
}

global.paket = async function(strings, ...values) {
  let fullString = strings[0];
  for (let i = 0; i < values.length; i++) {
    fullString += `</${values[i]}>` + strings[i + 1];
  }

  if (fullString.includes('${')) {
    console.error('Error: Gunakan </kodenya> sebagai pengganti ${kodenya}');
    return;
  }

  const declarations = fullString.trim().split(';').map(s => s.trim()).filter(Boolean);
  for (const declaration of declarations) {
    let [varName, ...varValueParts] = declaration.split('=').map(s => s.trim());
    let varValue = varValueParts.join('=');
    
    const isPublic = varValue.includes('--public');
    const isContinue = varValue.includes('--continue');
    
    varValue = varValue.replace('--public', '').replace('--continue', '').trim();
    
    if (!paket.isi[varName]) {
      let evalValue;
      try {
        evalValue = await evalVarValue(varValue);
      } catch (error) {
        evalValue = varValue;
      }

      paket.isi[varName] = evalValue;
      if (isPublic || !isContinue) { // Default to public
        global[varName] = evalValue;
      }
    } else {
      if (isContinue) {
        paket.isi[varName] += ` ${varValue}`;
      } else {
        const existingValue = paket.isi[varName];
        let newValue;
        try {
          newValue = await evalVarValue(varValue);
        } catch (error) {
          newValue = varValue;
        }
        if (typeof paket.isi === 'function') {
          let openContents;
          try {
            openContents = await import(`${paket.isi}`)
          } catch (error) {
            openContents = await eval(`${paket.isi}`)
          }
          return openContents;
        }
        
        if (!paket.cekFungsi(existingValue, newValue)) {
          throw new Error(`Nama variabel "${varName}" sudah ada dengan nilai yang berbeda.`);
        } else {
          global[varName] = newValue; // Default to public
        }
      }
    }
  }
};

async function evalVarValue(varValue) {
  if (varValue.startsWith('</') && varValue.endsWith('>')) {
    const code = varValue.slice(2, -1);
    return await eval(code);
  } else {
    return eval(`(${varValue})`);
  }
}

paket.isi = {};
paket.cekFungsi = (existingValue, newValue) => {
  if (typeof existingValue === 'object' && typeof newValue === 'object') {
    return JSON.stringify(existingValue) === JSON.stringify(newValue);
  }
  return existingValue === newValue;
};

String.prototype.cepat = function() {
  const originalString = this;
  return async function(strings, ...values) {
    const result = await paket(strings, ...values);
    return result !== undefined ? result : originalString.toString();
  };
};

/*
Kode ini dilindungi hak cipta oleh Arifi Razzaq. 
 * Arifi Razzaq adalah pembuat kode ini. 
 * Pengguna dapat menghubungi Arifi Razzaq melalui WhatsApp atau berlangganan saluran YouTube-nya.
 * Hubungi WhatsApp : https://wa.me/6283193905842
 * Saluran YouTube : Arifi Razzaq Ofc
*/
