import React from 'react';
import ReactDOM from 'react-dom';
import algoliasearch from 'algoliasearch';

import '../dist/css/style.css';
import '../dist/scss/style.scss';

const appId = 'LPTM5TFU7O';
const apiKey = '6bb0204efbeb96a181f5a9e153e466ca';
const indexName = 'restaurants';
const client = algoliasearch(appId, apiKey);

const helper = algoliasearchHelper(
  client, indexName, {
    facets: ['food_type', 'stars_count', 'price', 'payment_options'],
    hitsPerPage: 3,
    maxValuesPerFacet: 3
  }
);

const Provider = reactAlgoliaSearchHelper.Provider;
const connect = reactAlgoliaSearchHelper.connect;

const SearchBox = connect()(
  ({helper}) =>
  <div className="search-container">
    <input
      className="search-box"
      placeholder="Search here"
      onChange={e => helper.setQuery(e.target.value).search()}
    />
  </div>
);

const getHighlighted = s => ({__html: s});

const Hit = ({hit}) => 
  <div className="hit" >
    <div className="image">
      <div class="image"><img src={hit.image_url.value}></img></div>
    </div>
    <div className="details">
      <div class="name"><strong>{hit.name.value}</strong></div>
      <div class="stars"><strong>{hit.stars_count.value}</strong></div>
      <div class="reviews"><strong>{hit.reviews_count.value}</strong></div>
      <div class="food-type"><strong>{hit.food_type.value}</strong> | </div>
      <div class="neighborhood"><strong>{hit.neighborhood.value}</strong> | </div>
      <div class="price"><strong>{hit.price_range.value}</strong></div><br />
    </div>
  </div>


const Hits = connect(state => ({results: state.searchResults}))(
  ({results}) => results &&
    <div className="results">
      {results.hits.map(hit => 
        <Hit key={hit.objectID} hit={hit} {...hit} />
      )}
    </div>
);
  
const Category = ({
  name,
  count,
  isRefined,
  handleClick
}) =>
  <div>
    <li>
      <label className="category">
        <input
          type="checkbox"
          checked={isRefined}
          value={name}
          onChange={handleClick}
        />
        <span className="category-name">{name}{' '}</span>
        <span className="badge">{count}</span>
      </label>
    </li>
  </div>

const Categories = connect(
  state => ({
    categories: state.searchResults &&
      state.searchResults.getFacetValues('food_type', 'stars_count', 'price', 'payment_options', {sortBy: ['count:desc', 'selected']}) ||
      []
  })
)(
  ({categories, helper}) =>
    <ul className="categories">
      <h3>Cuisine/Food Type</h3>
      {categories.map(
        category =>
          <Category
            key={category.name}
            {...category}
            handleClick={e => helper.toggleRefine(category, category.name).search()}
          />
      )}
      <h3>Rating</h3>
      <h3>Payment Options</h3>
      <h3>Price</h3>
    </ul>
);
  
const Pagination = connect(
  ({searchResults}) => (
    searchResults === null ?
      {page: 0, nbPages: 0} :
      {page: searchResults.page, nbPages: searchResults.nbPages}
  )
)(
  ({page, nbPages, helper}) =>
  <div className="pager">
    <button className="previous" onClick={e => helper.setPage(page - 1).search()} disabled={page === 0}>Previous</button>
    <span className="current-page">
      {page + 1}
    </span>
    <button className="next" onClick={e => helper.setPage(page + 1).search()} disabled={page + 1 >= nbPages}>Next</button>
  </div>
);
  
const App = () =>
<Provider helper={helper}>
  <div className="app">
    <SearchBox />
    <div className="main">
      <Categories />
      <div className="results">
        <Hits />
        <Pagination />
      </div>
    </div>
  </div>
</Provider>;

ReactDOM.render(<App />, document.querySelector('#root'));

helper.search();