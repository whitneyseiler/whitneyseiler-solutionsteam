// Algolia client. Mandatory to instantiate the Helper.
const appId = 'LPTM5TFU7O';
const apiKey = '6bb0204efbeb96a181f5a9e153e466ca';
const indexName = 'restaurants';
const client = algoliasearch(appId, apiKey);

// Algolia client. Mandatory to instantiate the Helper.
var algolia = algoliasearch(appId, apiKey);

// Algolia Helper
var helper = algoliasearchHelper(algolia, indexName, {
  disjunctiveFacets: ['food-type','stars-count','payment-options','demo'],
  hitsPerPage: 3,
  maxValuesPerFacet: 5
});

// Bind the result event to a function that will update the results
helper.on("result", searchCallback);

// The different parts of the UI that we want to use in this example
var $hits = $('#hits');
var $facets = $('#facets');

$facets.on('click', handleFacetClick);

// Trigger a first search, so that we have a page with results
// from the start.
helper.search();

// Result event callback
function searchCallback(results) {
  if (results.hits.length === 0) {
    // If there is no result we display a friendly message
    // instead of an empty page.
    $hits.empty().html("No results :(");
    return;
  }

	// Hits/results rendering
  renderHits($hits, results);
  renderFacets($facets, results);
}


function renderFacets($facets, results) {
  // We use the disjunctive facets attribute.
  var facets = results.disjunctiveFacets.map(function(facet) {
    var name = facet.name;
    var header = '<h4>' + name + '</h4>';
    var facetValues = results.getFacetValues(name);
    var facetsValuesList = $.map(facetValues, function(facetValue) {
      var facetValueClass = facetValue.isRefined ? 'refined'  : '';
      var valueAndCount = '<a data-attribute="' + name + '" data-value="' + facetValue.name + '" href="#">' + facetValue.name + ' (' + facetValue.count + ')' + '</a>';
      return '<li class="' + facetValueClass + '">' + valueAndCount + '</li>';
    })
    return header + '<ul>' + facetsValuesList.join('') + '</ul>';
  });
  
  $facets.html(facets.join(''));
}

function handleFacetClick(e) {
  e.preventDefault();
  var target = e.target;
  var attribute = target.dataset.attribute;
  var value = target.dataset.value;
  // Because we are listening in the parent, the user might click where there is no data
  if(!attribute || !value) return;
  // The toggleRefine method works for disjunctive facets as well
  helper.toggleRefine(attribute, value).search();
}

function renderHits($hits, results) {
  let attrs = ['name', 'stars_count', 'reviews_count', 'food_type', 'neighborhood', 'price_range']

  var hits = results.hits.map(function renderHit(hit) {
    var highlighted = hit._highlightResult;

    return '<div class="hit-panel">' + 
      '<div class="image">' + '<img src="' + highlighted.image_url.value + '">' + '</div>' +
      '<div class="name">' + '<strong>' + highlighted.name.value + '</strong>' + '</div>' +
      '<div class="stars">' + '<strong>' + highlighted.stars_count.value + '</strong>' + '</div>' +
      '<div class="reviews">' + '<strong>' + highlighted.reviews_count.value + '</strong>' + '</div>' +
      '<div class="food-type">' + '<strong>' + highlighted.food_type.value + '</strong>' + ' | ' + '</div>' +
      '<div class="neighborhood">' + '<strong>' + highlighted.neighborhood.value + '</strong>' + ' | ' + '</div>' +
      '<div class="price">' + '<strong>' + highlighted.price_range.value + '</strong>' + '</div>' + '<br>'
  });

  $hits.html(hits);
}

var itemsCount = 0,
    itemsMax = $('.outer div').length;
$('.outer div').hide();

function showNextItems() {
    var pagination = 3;
    
    for (var i = itemsCount; i < (itemsCount + pagination); i++) {
        $('.outer div:eq(' + i + ')').show();
    }

    itemsCount += pagination;
    
    if (itemsCount > itemsMax) {
        $('#showMore').hide();
    }
};

showNextItems();

$('#showMore').on('click', function (e) {
    e.preventDefault();
    showNextItems();
});