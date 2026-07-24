import { ApiItem } from '../types';

export const API_LIST: ApiItem[] = [
  {
    id: 'spotify-web-api',
    name: 'Spotify Web API',
    shortName: 'Spotify',
    color: '#1db954',
    iconName: 'Music',
    category: 'Music & Audio',
    description: 'Query music metadata, playlist recommendations, artist stats, audio features, and web playback SDK controls.',
    docUrl: 'https://developer.spotify.com/documentation/web-api',
    sampleCode: `fetch('https://api.spotify.com/v1/search?q=daft+punk&type=artist', {
  headers: { 'Authorization': 'Bearer ' + accessToken }
})
  .then(res => res.json())
  .then(data => console.log(data));`,
    endpoints: [
      'GET /v1/search',
      'GET /v1/recommendations',
      'GET /v1/tracks/{id}'
    ]
  },
  {
    id: 'tmdb-api',
    name: 'TMDB (The Movie Database)',
    shortName: 'TMDB',
    color: '#01b4e4',
    iconName: 'Film',
    category: 'Movies & TV',
    description: 'Access movie & TV show metadata, cast profiles, high-resolution posters, user ratings, and trending media lists.',
    docUrl: 'https://developer.themoviedb.org/docs',
    sampleCode: `fetch('https://api.themoviedb.org/3/movie/popular?api_key=YOUR_KEY')
  .then(res => res.json())
  .then(data => console.log(data.results));`,
    endpoints: [
      'GET /3/movie/popular',
      'GET /3/search/movie',
      'GET /3/tv/{series_id}'
    ]
  },
  {
    id: 'pokeapi',
    name: 'PokéAPI',
    shortName: 'PokéAPI',
    color: '#ef4444',
    iconName: 'Gamepad2',
    category: 'Gaming & Data',
    description: 'RESTful API for complete Pokémon data, battle moves, abilities, types, evolutions, and competitive stats.',
    docUrl: 'https://pokeapi.co/docs/v2',
    sampleCode: `fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
  .then(res => res.json())
  .then(data => console.log(data.sprites.front_default));`,
    endpoints: [
      'GET /api/v2/pokemon/{id_or_name}',
      'GET /api/v2/type/{id_or_name}',
      'GET /api/v2/ability/{id}'
    ]
  },
  {
    id: 'youtube-data-api',
    name: 'YouTube Data API',
    shortName: 'YouTube Data',
    color: '#e11d48',
    iconName: 'Youtube',
    category: 'Video & Audio',
    description: 'Search YouTube videos, query channel analytics, fetch playlist items, and access live stream metadata.',
    docUrl: 'https://developers.google.com/youtube/v3',
    sampleCode: `fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&q=hackathon&key=YOUR_KEY')
  .then(res => res.json())
  .then(data => console.log(data.items));`,
    endpoints: [
      'GET /youtube/v3/search',
      'GET /youtube/v3/videos',
      'GET /youtube/v3/channels'
    ]
  },
  {
    id: 'openweathermap-api',
    name: 'OpenWeatherMap API',
    shortName: 'OpenWeather',
    color: '#f97316',
    iconName: 'CloudSun',
    category: 'Weather & Climate',
    description: 'Current real-time weather reports, 5-day forecasts, severe weather alerts, and global weather maps.',
    docUrl: 'https://openweathermap.org/api',
    sampleCode: `fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_KEY')
  .then(res => res.json())
  .then(data => console.log(data.main.temp, data.weather[0].description));`,
    endpoints: [
      'GET /data/2.5/weather?q={city}',
      'GET /data/2.5/forecast?lat={lat}&lon={lon}',
      'GET /data/3.0/onecall'
    ]
  },
  {
    id: 'openstreetmap-mapbox',
    name: 'OpenStreetMap / Mapbox',
    shortName: 'OSM / Mapbox',
    color: '#3b82f6',
    iconName: 'MapPin',
    category: 'Maps & Location',
    description: 'Build custom interactive maps, vector tiles, forward/reverse geocoding, turn-by-turn routing, and spatial visuals.',
    docUrl: 'https://docs.mapbox.com/api',
    sampleCode: `fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/Tokyo.json?access_token=YOUR_KEY')
  .then(res => res.json())
  .then(data => console.log(data.features));`,
    endpoints: [
      'GET /geocoding/v5/mapbox.places/{query}.json',
      'GET /directions/v5/mapbox/driving/{coords}',
      'GET /styles/v1/{username}'
    ]
  },
  {
    id: 'nasa-apis',
    name: 'NASA APIs',
    shortName: 'NASA APIs',
    color: '#2563eb',
    iconName: 'Rocket',
    category: 'Space & Science',
    description: 'Access Astronomy Picture of the Day (APOD), Mars Rover imagery, Near-Earth Asteroid feeds, and Earth imagery.',
    docUrl: 'https://api.nasa.gov',
    sampleCode: `fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
  .then(res => res.json())
  .then(data => console.log(data.url, data.title));`,
    endpoints: [
      'GET /planetary/apod',
      'GET /mars-photos/api/v1/rovers/curiosity/photos',
      'GET /neo/rest/v1/feed'
    ]
  },
  {
    id: 'rest-countries-api',
    name: 'REST Countries API',
    shortName: 'REST Countries',
    color: '#10b981',
    iconName: 'Globe',
    category: 'Geography & Demographics',
    description: 'Fetch world country information via RESTful endpoints including flags, capitals, populations, currencies, and borders.',
    docUrl: 'https://restcountries.com',
    sampleCode: `fetch('https://restcountries.com/v3.1/name/japan')
  .then(res => res.json())
  .then(data => console.log(data[0].capital, data[0].population));`,
    endpoints: [
      'GET /v3.1/all',
      'GET /v3.1/name/{name}',
      'GET /v3.1/alpha/{code}'
    ]
  },
  {
    id: 'coingecko-api',
    name: 'CoinGecko API',
    shortName: 'CoinGecko',
    color: '#8dc63f',
    iconName: 'Coins',
    category: 'Finance & Crypto',
    description: 'Track live cryptocurrency prices, market cap, 24h trading volume, historical chart data, and exchange tickers.',
    docUrl: 'https://www.coingecko.com/en/api/documentation',
    sampleCode: `fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd')
  .then(res => res.json())
  .then(data => console.log(data.bitcoin.usd));`,
    endpoints: [
      'GET /api/v3/simple/price',
      'GET /api/v3/coins/markets',
      'GET /api/v3/coins/{id}'
    ]
  },
  {
    id: 'open-food-facts-api',
    name: 'Open Food Facts API',
    shortName: 'Open Food Facts',
    color: '#f59e0b',
    iconName: 'Utensils',
    category: 'Food & Health',
    description: 'Crowdsourced open database of global food products with barcode lookup, ingredients, allergens, and Nutri-Score.',
    docUrl: 'https://openfoodfacts.github.io/api-documentation',
    sampleCode: `fetch('https://world.openfoodfacts.org/api/v2/product/737628064502.json')
  .then(res => res.json())
  .then(data => console.log(data.product.product_name, data.product.nutriscore_grade));`,
    endpoints: [
      'GET /api/v2/product/{barcode}',
      'GET /cgi/search.pl?search_terms={query}',
      'GET /api/v2/categories'
    ]
  },
  {
    id: 'news-api',
    name: 'NewsAPI',
    shortName: 'NewsAPI',
    color: '#8b5cf6',
    iconName: 'Newspaper',
    category: 'News & Media',
    description: 'Search live breaking news headlines, articles, and top news sources from over 80,000 global news publishers.',
    docUrl: 'https://newsapi.org/docs',
    sampleCode: `fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_KEY')
  .then(res => res.json())
  .then(data => console.log(data.articles));`,
    endpoints: [
      'GET /v2/top-headlines',
      'GET /v2/everything',
      'GET /v2/top-headlines/sources'
    ]
  },
  {
    id: 'exchangerate-api',
    name: 'ExchangeRate API',
    shortName: 'ExchangeRate',
    color: '#06b6d4',
    iconName: 'DollarSign',
    category: 'Finance & Forex',
    description: 'Real-time exchange rate conversions and historical currency data for over 160 currencies worldwide.',
    docUrl: 'https://www.exchangerate-api.com/docs/overview',
    sampleCode: `fetch('https://open.er-api.com/v6/latest/USD')
  .then(res => res.json())
  .then(data => console.log(data.rates.EUR));`,
    endpoints: [
      'GET /v6/latest/{currency}',
      'GET /v6/pair/{from}/{to}',
      'GET /v6/history/{currency}/{year}/{month}/{day}'
    ]
  },
  {
    id: 'open-trivia-db',
    name: 'Open Trivia Database',
    shortName: 'Open Trivia',
    color: '#ec4899',
    iconName: 'HelpCircle',
    category: 'Gaming & Trivia',
    description: 'Free community trivia questions database featuring multiple choice and true/false questions across various categories.',
    docUrl: 'https://opentdb.com/api_config.php',
    sampleCode: `fetch('https://opentdb.com/api.php?amount=10&type=multiple')
  .then(res => res.json())
  .then(data => console.log(data.results));`,
    endpoints: [
      'GET /api.php?amount={count}',
      'GET /api_category.php',
      'GET /api_count.php?category={id}'
    ]
  },
  {
    id: 'unsplash-api',
    name: 'Unsplash API',
    shortName: 'Unsplash',
    color: '#64748b',
    iconName: 'Camera',
    category: 'Images & Media',
    description: 'Search millions of high-resolution royalty-free photos with AI-powered search and curated photo collections.',
    docUrl: 'https://unsplash.com/documentation',
    sampleCode: `fetch('https://api.unsplash.com/photos/random?client_id=YOUR_ACCESS_KEY')
  .then(res => res.json())
  .then(data => console.log(data.urls.regular));`,
    endpoints: [
      'GET /search/photos',
      'GET /photos/random',
      'GET /topics'
    ]
  },
  {
    id: 'advice-slip-api',
    name: 'Advice Slip API',
    shortName: 'Advice Slip',
    color: '#14b8a6',
    iconName: 'MessageSquareQuote',
    category: 'Fun & Quotes',
    description: 'Generate random, humorous, or inspirational advice slips for digital applications and chatbots.',
    docUrl: 'https://api.adviceslip.com/',
    sampleCode: `fetch('https://api.adviceslip.com/advice')
  .then(res => res.json())
  .then(data => console.log(data.slip.advice));`,
    endpoints: [
      'GET /advice',
      'GET /advice/{slip_id}',
      'GET /advice/search/{query}'
    ]
  },
  {
    id: 'github-rest-api',
    name: 'GitHub REST API',
    shortName: 'GitHub REST',
    color: '#a855f7',
    iconName: 'Github',
    category: 'Developer Tools',
    description: 'Programmatically interact with repositories, pull requests, user profiles, issues, and workflow runs.',
    docUrl: 'https://docs.github.com/en/rest',
    sampleCode: `fetch('https://api.github.com/users/octocat/repos')
  .then(res => res.json())
  .then(data => console.log(data));`,
    endpoints: [
      'GET /users/{username}',
      'GET /repos/{owner}/{repo}',
      'GET /search/repositories'
    ]
  }
];

