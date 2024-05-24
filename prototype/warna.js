/*
Kode ini dilindungi hak cipta oleh Arifi Razzaq. 
* Arifi Razzaq adalah pembuat kode ini. 
* Pengguna dapat menghubungi Arifi Razzaq melalui WhatsApp atau berlangganan saluran YouTube-nya.
* Hubungi WhatsApp: https://wa.me/6283193905842
* Saluran YouTube: Arifi Razzaq Ofc
*/

const warnaTeks = (teks, kodeWarna = '32') => `\x1b[${kodeWarna}m${teks}\x1b[0m`;
const warnaLatar = (teks, kodeWarnaLatar = '42') => `\x1b[${kodeWarnaLatar}m${teks}\x1b[0m`;
const teksTebal = (teks, kodeWarnaLatar = '42') => `\x1b[1m\x1b[${kodeWarnaLatar}m${teks}\x1b[0m`;
const latarMerahTeksHijau = (teks) => `\x1b[41m\x1b[92m${teks}\x1b[0m`; // Latar belakang merah dengan teks hijau stabilo
const teksHijau = (teks) => `\x1b[92m${teks}\x1b[0m`; // Teks hijau stabilo

const fungsiWarna = {
  warnaTeks: (strings, ...values) => (kodeWarna = '32') => `\x1b[${kodeWarna}m${strings.join('')}\x1b[0m`,
  warnaLatar: (strings, ...values) => (kodeWarnaLatar = '42') => `\x1b[${kodeWarnaLatar}m${strings.join('')}\x1b[0m`,
  teksTebal: (strings, ...values) => (kodeWarnaLatar = '42') => `\x1b[1m\x1b[${kodeWarnaLatar}m${strings.join('')}\x1b[0m`,
  latarMerahTeksHijau: (strings, ...values) => () => `\x1b[41m\x1b[92m${strings.join('')}\x1b[0m`,
  teksHijau: (strings, ...values) => () => `\x1b[92m${strings.join('')}\x1b[0m`,
};

const handler = {
  get: (obj, prop) => {
    if (prop in obj) {
      return (...args) => obj[prop](...args);
    } else {
      throw new Error(`Fungsi ${prop} tidak ditemukan`);
    }
  }
}; 

const warna = new Proxy(fungsiWarna, handler);

String.prototype.warnaLatar = function(kodeWarnaLatar) {
  return `\x1b[${kodeWarnaLatar}m${this}\x1b[0m`;
};

String.prototype.warnaTeks = function(kodeWarna) {
  return `\x1b[${kodeWarna}m${this}\x1b[0m`;
};

String.prototype.teksTebal = function(kodeWarnaLatar) {
  return `\x1b[1m\x1b[${kodeWarnaLatar}m${this}\x1b[0m`;
};

String.prototype.latarMerahTeksHijau = function() {
  return `\x1b[41m\x1b[92m${this}\x1b[0m`;
};

String.prototype.teksHijau = function() {
  return `\x1b[92m${this}\x1b[0m`;
};

const warnaTambahan = {
  hitamTerang: '90',
  merahTerang: '91',
  hijauTerang: '92',
  kuningTerang: '93',
  biruTerang: '94',
  magentaTerang: '95',
  cyanTerang: '96',
  putihTerang: '97',
  latarHitamTerang: '100',
  latarMerahTerang: '101',
  latarHijauTerang: '102',
  latarKuningTerang: '103',
  latarBiruTerang: '104',
  latarMagentaTerang: '105',
  latarCyanTerang: '106',
  latarPutihTerang: '107',
  hitam: '30',
  merah: '31',
  hijau: '32',
  kuning: '33',
  biru: '34',
  magenta: '35',
  cyan: '36',
  putih: '37',
  hitamTebal: '90;1',
  merahTebal: '91;1',
  hijauTebal: '92;1',
  kuningTebal: '93;1',
  biruTebal: '94;1',
  magentaTebal: '95;1',
  cyanTebal: '96;1',
  putihTebal: '97;1',
  latarHitam: '40',
  latarMerah: '41',
  latarHijau: '42',
  latarKuning: '43',
  latarBiru: '44',
  latarMagenta: '45',
  latarCyan: '46',
  latarPutih: '47',
  hitamGarisBawah: '30;4',
  merahGarisBawah: '31;4',
  hijauGarisBawah: '32;4',
  kuningGarisBawah: '33;4',
  biruGarisBawah: '34;4',
  magentaGarisBawah: '35;4',
  cyanGarisBawah: '36;4',
  putihGarisBawah: '37;4',
  latarHitam: '40',
  latarMerah: '41',
  latarHijau: '42',
  latarKuning: '43',
  latarBiru: '44',
  latarMagenta: '45',
  latarCyan: '46',
  latarPutih: '47',
  latarHitamTerangTebal: '100;1',
  latarMerahTerangTebal: '101;1',
  latarHijauTerangTebal: '102;1',
  latarKuningTerangTebal: '103;1',
  latarBiruTerangTebal: '104;1',
  latarMagentaTerangTebal: '105;1',
  latarCyanTerangTebal: '106;1',
  latarPutihTerangTebal: '107;1',
  hitamMerahTerang: '90;101',
  hijauBiruTerang: '92;104',
  kuningMagentaTerang: '93;105',
  biruCyanTerang: '94;106',
  magentaPutihTerang: '95;107',
  cyanHitamTerang: '96;100',
  putihMerahTerang: '97;101',
  hitamRedup: '30;2',
  merahRedup: '31;2',
  hijauRedup: '32;2',
  kuningRedup: '33;2',
  biruRedup: '34;2',
  magentaRedup: '35;2',
  cyanRedup: '36;2',
  putihRedup: '37;2',
  hitamBerkedip: '30;5',
  merahBerkedip: '31;5',
  hijauBerkedip: '32;5',
  kuningBerkedip: '33;5',
  biruBerkedip: '34;5',
  magentaBerkedip: '35;5',
  cyanBerkedip: '36;5',
  putihBerkedip: '37;5'
};

export default warnaTambahan;


Object.keys(warnaTambahan).forEach(warna => {
  String.prototype[warna] = function() {
    return `\x1b[${warnaTambahan[warna]}m${this}\x1b[0m`;
  };
  fungsiWarna[warna] = (strings, ...values) => () => `\x1b[${warnaTambahan[warna]}m${strings.join('')}\x1b[0m`;
});

/*
Kode ini dilindungi hak cipta oleh Arifi Razzaq. 
* Arifi Razzaq adalah pembuat kode ini. 
* Pengguna dapat menghubungi Arifi Razzaq melalui WhatsApp atau berlangganan saluran YouTube-nya.
* Hubungi WhatsApp: https://wa.me/6283193905842
* Saluran YouTube: Arifi Razzaq Ofc
*/
