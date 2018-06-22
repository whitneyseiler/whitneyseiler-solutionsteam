const algoliasearch = require('algoliasearch');
const chunk = require('lodash.chunk')
const records = require('./resources/dataset/complete_restaurant_data.json');
const apiKey = require('./config.js');

const appId = 'LPTM5TFU7O';
const client = algoliasearch(appId, apiKey.KEY);
const index = client.initIndex('restaurants');

const chunks = chunk(records, 1000);

chunks.map(function(batch) {
  return index.addObjects(batch, function(err, content) {
    if(err) {
        console.error(err);
    }
    });
});

index.setSettings({
  hitsPerPage: 3,
  attributesForFaceting: ['food_type', 'stars_count', 'payment_options', 'price'],
  searchableAttributes: [
    'name',
    'city',
    'country',
    'iata_code',
    'food_type',
    'stars_count', 
    'payment_options', 
    'pricepayment_options', 
    'price'
  ],
  maxValuesPerFacet: 10,
  paginationLimitedTo: 0,
  }, function(err) {
    if (!err) {
    console.log('success');
    }
});