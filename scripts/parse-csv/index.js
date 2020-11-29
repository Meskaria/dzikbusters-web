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
        headers: 'adns;voivodeship_case_number;voivodeship;TRACES;TERYT_district;borough;city;DWK;latitude;longitude;method_of_neutralization;date_of_filling;date_of_sample_dispatch;date_of_confirmation;test_id;type_of_test;number_of_sick_boar;cause_of_suspicion;gender_age_weight;corpse_state_one;corpse_state_two;corpse_state_three;corpse_state_bones'.split(';'),
        colParser: {
          adns: 'number',
          voivodeship_case_number: 'number',
          number_of_sick_boar: 'number',
          corpse_state_one: 'number',
          corpse_state_two: 'number',
          corpse_state_three: 'number',
          corpse_state_bones: (input) => (input === '1' ? Number(input) : 0),
        }
      })
        .fromFile(csvFilePath);
    })

  // Do whatever you want to do with the file
  );

  storeData(res.flat().sort((a, b) => a['NR ADNS'] - b['NR ADNS']), path.join(__dirname, '../../src/res.json'));
  return res;
})();
