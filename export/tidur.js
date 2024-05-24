/* 
Kode ini dilindungi hak cipta oleh Arifi Razzaq. 
 * Arifi Razzaq adalah pembuat kode ini. 
 * Pengguna dapat menghubungi Arifi Razzaq melalui WhatsApp atau berlangganan saluran YouTube-nya.
 * Hubungi WhatsApp : https://wa.me/6283193905842
 * Saluran YouTube : Arifi Razzaq Ofc
*/

export async function tidur(ms) {
  if (isNaN(ms) || ms <= 0) {
    throw new Error('Waktu tidur harus berupa angka positif.');
  }

  return new Promise((resolve) => setTimeout(resolve, ms));
};

/* 
Kode ini dilindungi hak cipta oleh Arifi Razzaq. 
 * Arifi Razzaq adalah pembuat kode ini. 
 * Pengguna dapat menghubungi Arifi Razzaq melalui WhatsApp atau berlangganan saluran YouTube-nya.
 * Hubungi WhatsApp : https://wa.me/6283193905842
 * Saluran YouTube : Arifi Razzaq Ofc
*/
