import React from 'react';
import ReactDOM from 'react-dom';
import algoliasearch from 'algoliasearch';
import StarRatingComponent from 'react-star-rating-component';

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
      placeholder="Search for Restaurants by Name, Cuisine, Location"
      onChange={e => helper.setQuery(e.target.value).search()}
    />
  </div>
);

const getHighlighted = s => ({__html: s});

const Hit = ({hit}) => (
  <div className="hit" >
    <div className="image">
      <img src={hit.image_url}></img>
    </div>
    <div className="details">
      <div class="name"><strong>{hit.name}</strong></div>
      <div className="upper-details">
        <div class="stars">{hit.stars_count}&nbsp;</div>
        <StarRatingComponent 
            starCount={5}
            value={hit.stars_count}
            emptyStarColor={'rgb(150, 150, 150)'}
        />
        <div class="reviews">&nbsp;({hit.reviews_count} reviews)</div>
      </div>
      <div className="lower-details">
        <div class="food-type">{hit.food_type}&nbsp;|&nbsp;</div>
        <div class="neighborhood">{hit.neighborhood}&nbsp;|&nbsp;</div>
        <div class="price">{hit.price_range}</div><br />
      </div>
    </div>
  </div>
)

const Hits = connect(state => ({results: state.searchResults}))(
  ({results}) => results &&
    <div className="hits">
      {results.hits.map((hit) => 
        <Hit key={hit.objectID} hit={hit} {...hit} />
      )}
    </div>
);
  
const Category = ({
  name,
  count,
  isRefined,
  handleClick
  }) => (
  <div>
    <li>
      <div className="category">
        <div onClick={handleClick}><span className="category-name">{name}&nbsp;</span></div>
        <div><span className="badge">{count}</span></div>
      </div>
    </li>
  </div>
)

const Rating = function(){

}


const Categories = connect(
  state => ({
    categories: state.searchResults &&
      state.searchResults.getFacetValues('food_type', 'stars_count', 'price', 'payment_options', {sortBy: ['count:desc', 'selected']}) ||
      []
  }))(
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
      <div id="ratings-facet">
        <StarRatingComponent 
            starCount={5}
            value={0}
            onStarClick={e => helper.toggleRefine('stars_count', 0).search()}
            emptyStarColor={'rgb(150, 150, 150)'}
        />
        <StarRatingComponent 
            starCount={5}
            value={1}
            onStarClick={e => helper.toggleRefine('stars_count', 1).search()}
            emptyStarColor={'rgb(150, 150, 150)'}
        />
        <StarRatingComponent 
            starCount={5}
            value={2}
            onStarClick={e => helper.toggleRefine('stars_count', 2).search()}
            emptyStarColor={'rgb(150, 150, 150)'}
        />
        <StarRatingComponent 
            starCount={5}
            value={3}
            onStarClick={e => helper.toggleRefine('stars_count', 3).search()}
            emptyStarColor={'rgb(150, 150, 150)'}
        />
        <StarRatingComponent 
            starCount={5}
            value={4}
            onStarClick={e => helper.toggleRefine('stars_count', 4).search()}
            emptyStarColor={'rgb(150, 150, 150)'}
        />
        <StarRatingComponent 
            starCount={5}
            value={5}
            onStarClick={e => helper.toggleRefine('stars_count', 5).search()}
            emptyStarColor={'rgb(150, 150, 150)'}
        />
      </div>
      <h3>Payment Options</h3>
      <h3>Price</h3>
    </ul>
);
  
const Pagination = connect(
  ({searchResults}) => (
    searchResults === null ?
      {page: 0, nbPages: 0} :
      {page: searchResults.page, nbPages: searchResults.nbPages}
  ))(
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