const csvFilePath = 'resources/dataset/restaurants_info.csv'
const listArr = require('./resources/dataset/restaurants_list.json');
const csv = require('csvtojson/v2');
const converter = csv({ delimiter:";", toArrayString:true });
const fs = require('fs');


converter
  .fromFile(csvFilePath)
  .then((infoArr)=>{

    let combined = listArr.map(x => Object.assign(x, infoArr.find(y => Number(y.objectID) === x.objectID)));
    combined = JSON.stringify(combined);

    fs.writeFile('resources/dataset/complete_restaurant_data.json', combined, 'utf8', (err) => { 
      if (err) throw err;
      console.log('success');
    });
  })
