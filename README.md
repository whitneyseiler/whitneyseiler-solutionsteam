## Whitney Seiler - Solutions Team Hiring Assignment

Hi there! Thanks for considering my application, and for giving me the chance to demo my skills and ability to catch up quickly on new technology. I had a great time learning how to use the Algolia API.

### In The Repo
In this repo you'll find the answers to the sample customer questions saved in the main directory as customer-questions.txt.
The script I used to convert the csv records, combine them with the existing json records and import to Algolia is also in the root directory, and is named convert-and-import.js. I ran this file using the "import-records" script in my package.json.

### Fine Print
This site is powered by Algolia, and was created as part of a hiring application for the Agolia Solutions Team.

<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Restaurant Locator - by Algolia</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  </head>

  <body>
    <div id="root" className="app">
    </div>

    <script src='https://npmcdn.com/react-algoliasearch-helper@1/umd/reactAlgoliaSearchHelper.js'></script>
    <script src='https://npmcdn.com/algoliasearch@3/dist/algoliasearchLite.js'></script>
    <script src='https://npmcdn.com/algoliasearch-helper@2/dist/algoliasearch.helper.js'></script>
    <script type="text/javascript" src="https://www.l2.io/ip.js?var=myip"></script>
  </body>
  <script type="text/javascript" src="bundle.js"></script>

  </html>
