const csv = require('csvtojson');
const path = require('path');
const fs = require('fs');

(async () => {
  const csvDir = path.join(__dirname, 'csv');

  const storeData = (data, path) => {
    try {
      fs.writeFileSync(path, JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  };

  const fileNames = fs.readdirSync(csvDir);
  const res = await Promise.all(
    fileNames.map(async (file) => {
      const csvFilePath = path.join(csvDir, file);
      return csv({
        ignoreColumns: /field/,
        noheader: false,
        trim: true,
        delimiter: ';',
        headers: 'NR ADNS;Nr przypadku w województwie;Województwo;Kod jednostki TRACES;Powiat wg kodu TERYT;Gmina;Miejscowość (najbliższa lub Nr obwodu łowieckiego) - jeśli możliwe;Nazwa obszaru z DWK 2014/709;Szerokość;Długość;Sposób unieszkodliwienia zwłok;Data zgłoszenia;Data wysłania próbek;Data potwierdzenia;Nr sprawozdania z badań (ostatecznego);Rodzaj badania;Liczba dzików dodatnich;Przyczyna podejrzenia;Płeć - wiek (w miesiącach) - waga;+;++;+++;Kości'.split(';'),
        colParser: {
          'NR ADNS': 'number',
          'Nr przypadku w województwie': 'number',
          'Liczba dzików dodatnich': 'number',
          '+': 'number',
          '++': 'number',
          '+++': 'number',
          "Kości": 'number',
        }
      })
        .fromFile(csvFilePath);
    })

  // Do whatever you want to do with the file
  );

  storeData(res.flat().sort((a, b) => a['NR ADNS'] - b['NR ADNS']), path.join(__dirname, '../../src/res.json'));
  return res;
})();
