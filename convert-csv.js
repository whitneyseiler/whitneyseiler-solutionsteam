const algoliasearch = require('algoliasearch');
const fs = require('fs');
const chunk = require('lodash.chunk')
const csv = require('csvtojson/v2');
const converter = csv({ delimiter:";", toArrayString:true });
const listArr = require('./resources/dataset/restaurants_list.json');
const csvFilePath = 'resources/dataset/restaurants_info.csv'
const apiKey = require('./config.js');

const appId = 'LPTM5TFU7O';
const client = algoliasearch(appId, apiKey.KEY);
const index = client.initIndex('restaurants');


converter
.fromFile(csvFilePath)
.then((infoArr)=>{
  
  let combined = listArr.map(x => Object.assign(x, infoArr.find(y => Number(y.objectID) === x.objectID)));
    
  const chunks = chunk(combined, 1000);

  chunks.map(function(batch) {
    return index.addObjects(batch, function(err, content) {
      if(err) {
          console.error(err);
      }
      });
  });
})

index.setSettings({
  hitsPerPage: 3,
  attributesForFaceting: ['food_type', 'stars_count', 'payment_options', 'price_range'],
  searchableAttributes: [
    'name',
    'city',
    'country',
    'iata_code',
    'food_type',
    'stars_count', 
    'payment_options', 
    'pricepayment_options', 
    'price_range'
  ],
  maxValuesPerFacet: 10,
  paginationLimitedTo: 0,
  }, function(err) {
    if (!err) {
    console.log('success');
    }
});