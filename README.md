# RazzaqJS

## Penjelasan `razzaqjs`

`razzaqjs` adalah sebuah modul Node.js yang menyediakan berbagai fungsi prototype & global yang memudahkan manipulasi jalur file, pengelolaan kelas, deklarasi variabel global, dan lain-lain. Modul ini dirancang untuk menyederhanakan dan mempercepat pengembangan aplikasi dengan memberikan utilitas yang sering dibutuhkan dalam pengembangan aplikasi berbasis JavaScript.

### Fitur Utama:

1. **Manipulasi Jalur File**: Fungsi untuk mengkonversi jalur file ke URL dan sebaliknya.
2. **Pengelolaan Kelas**: Deklarasi dan pewarisan kelas secara dinamis.
3. **Deklarasi Variabel Global**: Deklarasi variabel global menggunakan template string.
4. **Utilitas Tambahan**: Fungsi untuk memeriksa apakah jalur file bersifat absolut dan lain-lain.
5. **Mengimpor Modul Dinamis**: Mengimpor modul berdasarkan jalur relatif, absolut, npm, atau modul bawaan Node.js.
6. **Pemantauan Perubahan File**: Memantau perubahan pada file modul lokal dan memuat ulang modul secara otomatis.
7. **Pewarnaan Teks**: Menambahkan warna pada teks.
8. **Pewarnaan Latar Belakang**: Menambahkan warna latar belakang pada teks.
9. **Efek Teks Tebal**: Membuat teks menjadi tebal.
10. **Kombinasi Warna Teks dan Latar Belakang**: Kombinasi warna teks dan latar belakang yang menarik.
11. **Pewarnaan Teks Kustom**: Mendukung berbagai warna dan efek tambahan.
12. **mendeklarasikan variabel global menggunakan template string**: Fungsi ini akan mengevaluasi nilai variabel dan menjadikannya variabel global jika belum ada dengan nilai yang berbeda.
13. **Kelas `wadah` digunakan untuk mengelola variabel global dengan menggunakan proxy**: Kelas ini menyediakan metode untuk menetapkan (`setel`), mengambil (`ambil`), dan menghapus (`hapus`) variabel global.

## Contoh Penggunaan dan Manfaat Modul

### Import Modules
Letak di awal file pada script kamu. (misalnya: main.js / index.js)

```javascript
import 'razzaqjs';
```

### Mengimpor Modul

Untuk mengimpor modul, cukup panggil metode `import` pada string yang berisi jalur modul. Metode ini mendukung jalur relatif, jalur absolut, nama modul npm, dan nama modul bawaan Node.js.

#### Contoh:

```javascript
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
```

### Mengimpor Modul Relatif

```javascript
const myModule = await './myModule.js'.import();
```

### Mengimpor Modul Absolut

```javascript
const myModule = await '/path/to/myModule.js'.import();
```

### Mengimpor Modul NPM

```javascript
const express = await 'express'.import();
```

### Mengimpor Modul Bawaan Node.js

```javascript
const fs = await 'fs'.import();
```

### Pemantauan Perubahan File

Ketika Anda mengimpor modul lokal (dengan jalur relatif atau absolut), utility ini akan memantau perubahan pada file tersebut dan memuat ulang modul secara otomatis saat file berubah.

#### Contoh:

```javascript
const myLocalModule = await './myLocalModule.js'.import();
```

Setelah file `./myLocalModule.js` berubah, utility akan mendeteksi perubahan dan memuat ulang modul.

### Contoh Penggunaan Fungsi Pewarnaan

Berikut adalah contoh penggunaan fungsi-fungsi pewarnaan:

```javascript
import warnaTambahan from './path/to/your/module';

const teksBerwarna = warnaTeks('Hello, world!', '31');
console.log(teksBerwarna);

const teksDenganLatar = warnaLatar('Hello, world!', '47');
console.log(teksDenganLatar);

const teksTebalDenganLatar = teksTebal('Hello, world!', '44');
console.log(teksTebalDenganLatar);

const teksLatarMerahHijau = latarMerahTeksHijau('Hello, world!');
console.log(teksLatarMerahHijau);

const teksHijauStabilo = teksHijau('Hello, world!');
console.log(teksHijauStabilo);
```

### Contoh Penggunaan Template Literal

Berikut adalah contoh penggunaan template literal untuk pewarnaan:

```javascript
const teksMerah = warna.warnaTeks`Hello, world!`('31');
console.log(teksMerah);

const latarPutihTeksHitam = warna.warnaLatar`Hello, world!`('47');
console.log(latarPutihTeksHitam);

const teksTebalDenganLatar = warna.teksTebal`Hello, world!`('44');
console.log(teksTebalDenganLatar);
```

### Penggunaan dengan Prototype String

Anda juga dapat menggunakan metode pewarnaan pada prototype string:

```javascript
const teksBerwarna = 'Hello, world!'.warnaTeks('31');
console.log(teksBerwarna);

const teksDenganLatar = 'Hello, world!'.warnaLatar('47');
console.log(teksDenganLatar);

const teksTebalDenganLatar = 'Hello, world!'.teksTebal('44');
console.log(teksTebalDenganLatar);

const teksLatarMerahHijau = 'Hello, world!'.latarMerahTeksHijau();
console.log(teksLatarMerahHijau);

const teksHijauStabilo = 'Hello, world!'.teksHijau();
console.log(teksHijauStabilo);
```

### Pewarnaan Kustom

Utility ini mendukung berbagai warna dan efek tambahan yang dapat digunakan sesuai kebutuhan:

```javascript
const teksBiruTerang = 'Hello, world!'.biruTerang();
console.log(teksBiruTerang);

const teksMerahTebal = 'Hello, world!'.merahTebal();
console.log(teksMerahTebal);
```

### Ekspor Modul Warna Tambahan

Utility ini juga mengekspor objek `warnaTambahan` yang berisi kode-kode warna tambahan:

```javascript
export default warnaTambahan;
```

## Penjelasan Paket

Fungsi `paket` dan kelas `wadah` dalam modul `razzaqjs` memberikan cara untuk mendeklarasikan dan mengelola variabel global secara dinamis. Mereka memanfaatkan template string untuk deklarasi variabel dan menggunakan proxy untuk pengelolaan variabel global.

### 1. Fungsi `paket`

#### Deskripsi:
Fungsi `paket` digunakan untuk mendeklarasikan variabel global menggunakan template string. Fungsi ini akan mengevaluasi nilai variabel dan menjadikannya variabel global jika belum ada dengan nilai yang berbeda.

#### Manfaat:
- Mempermudah deklarasi variabel global dengan format template string.
- Menghindari deklarasi variabel global yang duplikat dengan nilai yang berbeda.
- Menyederhanakan pengelolaan variabel global dalam aplikasi Node.js.

#### Contoh Penggunaan:

```javascript
paket`
  server = "localhost";
`;

console.log(global.server); // Output: localhost
```

### 2. Kelas `wadah`

#### Deskripsi:
Kelas `wadah` digunakan untuk mengelola variabel global dengan menggunakan proxy. Kelas ini menyediakan metode untuk menetapkan (`setel`), mengambil (`ambil`), dan menghapus (`hapus`) variabel global.

#### Manfaat:
- Mengelola variabel global dengan cara yang lebih terstruktur.
- Menghindari kesalahan saat mengakses variabel global yang tidak ada.
- Memberikan metode untuk menghapus variabel global dengan aman.

#### Contoh Penggunaan:

```javascript
// Menetapkan variabel global
wadah.setel('port', 8080);
console.log(wadah.ambil('port')); // Output: 8080

// Menghapus variabel global
wadah.hapus('port');
console.log(wadah.ambil('port')); // Error: Variabel "port" tidak ditemukan.
```

### 3. Menambahkan Metode ke Object.prototype

#### Deskripsi:
Metode `setel`, `ambil`, dan `hapus` ditambahkan ke `Object.prototype` untuk memudahkan penggunaan kelas `wadah` pada objek apapun.

#### Manfaat:
- Memungkinkan penggunaan metode `setel`, `ambil`, dan `hapus` pada semua objek secara langsung.
- Menyederhanakan pengelolaan variabel global dari konteks objek apapun.

#### Contoh Penggunaan:

```javascript
const obj = {};
obj.setel('database', 'myDatabase');
console.log(obj.ambil('database')); // Output: myDatabase

obj.hapus('database');
console.log(obj.ambil('database')); // Error: Variabel "database" tidak ditemukan.
```

### 1. `global.pathToFileURL`

#### Deskripsi:
Mengkonversi jalur file ke URL file. Bisa menambahkan timestamp sebagai query parameter untuk keperluan cache busting.

#### Contoh Penggunaan:

```javascript
const fileUrl = pathToFileURL('/path/to/file.txt', true);
console.log(fileUrl.href); // Output: file:///path/to/file.txt?v=1653465678901
```

#### Manfaat:
Memudahkan konversi jalur file lokal ke URL file yang bisa digunakan dalam berbagai operasi yang membutuhkan URL file.

### 2. `global.fileURLToPath`

#### Deskripsi:
Mengkonversi URL file ke jalur file.

#### Contoh Penggunaan:

```javascript
const filePath = fileURLToPath('file:///path/to/file.txt');
console.log(filePath); // Output: /path/to/file.txt
```

#### Manfaat:
Memudahkan konversi URL file kembali ke jalur file lokal, yang berguna dalam operasi file sistem.

### 3. `global.isAbsolutePath`

#### Deskripsi:
Memeriksa apakah sebuah jalur merupakan jalur absolut.

#### Contoh Penggunaan:

```javascript
const isAbsolute = isAbsolutePath('/path/to/file.txt');
console.log(isAbsolute); // Output: true
```

#### Manfaat:
Memudahkan validasi jalur file untuk memastikan apakah jalur tersebut bersifat absolut.

### 4. `global.kelas`

#### Deskripsi:
Mendeklarasikan kelas secara global dengan opsi pewarisan dari kelas induk.

#### Contoh Penggunaan:

```javascript
kelas('Animal', function(name) {
  this.name = name;
});

const myDog = new global.Animal('Dog');
console.log(myDog.name); // Output: Dog

kelas('Dog', function(name, breed) {
  this.breed = breed;
}, 'Animal');

const myPet = new global.Dog('Rex', 'Labrador');
console.log(myPet.name); // Output: Rex
console.log(myPet.breed); // Output: Labrador
```

#### Manfaat:
Memudahkan pembuatan dan pewarisan kelas secara dinamis tanpa harus menulis banyak boilerplate code.

### 5. `global.paket`

#### Deskripsi:
Mendeklarasikan variabel global dengan format template string. Memungkinkan deklarasi variabel dalam jumlah banyak sekaligus.

#### Contoh Penggunaan:

```javascript
paket`
  server = "localhost";
  port = 8080;
`;

console.log(server); // Output: localhost
console.log(port); // Output: 8080
```

#### Manfaat:
Mempercepat dan menyederhanakan deklarasi variabel global dengan format yang mudah dibaca dan ditulis.

### 6. `String.prototype.cepat`

#### Deskripsi:
Mendeklarasikan variabel global dengan memanfaatkan template string pada objek string. Memberikan cara alternatif untuk mendeklarasikan variabel global.

#### Contoh Penggunaan:

```javascript
"Hello".cepat()`
  greeting = "Hello, World!";
`;

console.log(greeting); // Output: Hello, World!
```

#### Manfaat:
Memberikan fleksibilitas lebih dalam mendeklarasikan variabel global, terutama ketika bekerja dengan objek string.

## Instalasi

Install modul `razzaqjs` dengan npm:

```bash
npm install razzaqjs
```

## Kontribusi

Kontribusi terbuka untuk siapa saja. Silakan buat pull request atau buka issue untuk fitur atau bug yang ingin Anda tambahkan atau perbaiki.

## Lisensi

`razzaqjs` dilisensikan di bawah [MIT License](LICENSE).

Semoga penjelasan ini membantu Anda memahami dan menggunakan `razzaqjs` dengan lebih baik.

### Credits

* [Follow me on Instagram](https://www.instagram.com/ar.zzq)
* [Follow me on GitHub](https://github.com/vrzaq)

Proyek ini dibuat oleh [Arifi Razzaq].
