/* 
Kode ini dilindungi hak cipta oleh Arifi Razzaq. 
 * Arifi Razzaq adalah pembuat kode ini. 
 * Pengguna dapat menghubungi Arifi Razzaq melalui WhatsApp atau berlangganan saluran YouTube-nya.
 * Hubungi WhatsApp : https://wa.me/6283193905842
 * Saluran YouTube : Arifi Razzaq Ofc
*/

export class wadah {
  static storage = new Proxy({}, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      throw new Error(`Variabel "${String(prop)}" tidak ditemukan.`);
    },
    set(target, prop, value) {
      target[prop] = value;
      return true;
    },
    deleteProperty(target, prop) {
      if (prop in target) {
        delete target[prop];
        return true;
      }
      throw new Error(`Variabel "${String(prop)}" tidak ditemukan.`);
    }
  });

  static async setel(name, value) {
    if (typeof value === 'function') {
      this.storage[name] = await value();
    } else {
      this.storage[name] = value;
    }
  }

  static ambil(name) {
    return this.storage[name];
  }

  static hapus(name) {
    delete this.storage[name];
  }
}

Object.prototype.setel = async function(name, value) {
  await wadah.setel(name, value);
  return this;
};

Object.prototype.ambil = function(name) {
  return wadah.ambil(name);
};

Object.prototype.hapus = function(name) {
  wadah.hapus(name);
  return this;
};

/* 
Kode ini dilindungi hak cipta oleh Arifi Razzaq. 
 * Arifi Razzaq adalah pembuat kode ini. 
 * Pengguna dapat menghubungi Arifi Razzaq melalui WhatsApp atau berlangganan saluran YouTube-nya.
 * Hubungi WhatsApp : https://wa.me/6283193905842
 * Saluran YouTube : Arifi Razzaq Ofc
*/
