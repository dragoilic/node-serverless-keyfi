const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { create } = require('apisauce')
const AWS = require('aws-sdk');

const coingecko_api = create({
  baseURL: 'https://api.coingecko.com/api/v3/',
})

const app = express()

app.use(cors('*'))

app.set('port', 3030)
app.use(logger('dev'))
app.set('trust proxy', 1)

let bulk_data = [];

app.listen(app.get('port'), async () => {
  console.log(
    'KeyFi Pro Script is running'
  );

  const categories = ['All', 'DeFi', 'Stablecoins', 'Platforms', 'Governance'];

  await Promise.all(categories.map(async (category) => await eval(`getTokens${category}()`)));
  
  let data = JSON.stringify(bulk_data);

  const fileName = 'coingecko_coins.json';

  const ID = '';
  const SECRET = '';

  const BUCKET_NAME = 'coingecko-coins-historical';

  const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
  });

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: data
  };

  const delete_params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
  };

  s3.deleteObject(delete_params, function (err, data) {
    if (err) console.log(err);
    else
      console.log("Successfully deleted file from bucket");
  });

  s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }

      console.log(`File uploaded successfully. ${data.Location}`);

      process.exit();
  });
})

const getTokensAll = async () => {
  console.log("All");
  for (var i = 1; i < 80; i++) {
    let response = await coingecko_api.get('coins/markets?vs_currency=usd&order=market_cap_desc&per_page=150&page=' + i + "&sparkline=false&price_change_percentage=1h");
    
    if (response.data.status != 404) {
      response.data.forEach(token => {
        const insert_data = {
          category: "All",
          coin_id: token.id,
          symbol: token.symbol,
          name: token.name,
          icon: token.image,
          current_price: token.current_price,
          market_cap: token.market_cap,
          market_cap_rank: token.market_cap_rank,
          fully_diluted_valuation: token.fully_diluted_valuation,
          total_volume: token.total_volume,
          high_24h: token.high_24h,
          low_24h: token.low_24h,
          price_change_24h: token.price_change_24h,
          price_change_percentage_24h: token.price_change_percentage_24h,
          market_cap_change_24h: token.market_cap_change_24h,
          market_cap_change_percentage_24h: token.market_cap_change_percentage_24h,
          circulating_supply: token.circulating_supply,
          total_supply: token.total_supply,
          max_supply: token.max_supply,
          ath: token.ath,
          ath_change_percentage: token.ath_change_percentage,
          ath_date: token.ath_date,
          atl: token.atl,
          atl_change_percentage: token.atl_change_percentage,
          atl_date: token.atl_date,
          last_updated: token.last_updated,
        };
  
        bulk_data.push(insert_data);
      });
    }
    console.log(i);
  };
}

const getTokensDeFi = async () => {
  console.log("DeFi");
  for (var i = 1; i < 5; i++) {
    let response = await coingecko_api.get('coins/markets?vs_currency=usd&category=decentralized_finance_defi&order=market_cap_desc&per_page=100&page=' + i + "&sparkline=false&price_change_percentage=1h");
    
    if (response.data.status != 404) {
      response.data.forEach(token => {
        const insert_data = {
          category: "DeFi",
          coin_id: token.id,
          symbol: token.symbol,
          name: token.name,
          icon: token.image,
          current_price: token.current_price,
          market_cap: token.market_cap,
          market_cap_rank: token.market_cap_rank,
          fully_diluted_valuation: token.fully_diluted_valuation,
          total_volume: token.total_volume,
          high_24h: token.high_24h,
          low_24h: token.low_24h,
          price_change_24h: token.price_change_24h,
          price_change_percentage_24h: token.price_change_percentage_24h,
          market_cap_change_24h: token.market_cap_change_24h,
          market_cap_change_percentage_24h: token.market_cap_change_percentage_24h,
          circulating_supply: token.circulating_supply,
          total_supply: token.total_supply,
          max_supply: token.max_supply,
          ath: token.ath,
          ath_change_percentage: token.ath_change_percentage,
          ath_date: token.ath_date,
          atl: token.atl,
          atl_change_percentage: token.atl_change_percentage,
          atl_date: token.atl_date,
          last_updated: token.last_updated,
        };
  
        bulk_data.push(insert_data);
      });
    }
  };
}

const getTokensStablecoins = async () => {
  console.log("Stablecoins");
  let response = await coingecko_api.get('coins/markets?vs_currency=usd&category=stablecoins&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h');
  
  if (response.data.status != 404) {
    response.data.forEach(token => {
      const insert_data = {
        category: "Stablecoins",
        coin_id: token.id,
        symbol: token.symbol,
        name: token.name,
        icon: token.image,
        current_price: token.current_price,
        market_cap: token.market_cap,
        market_cap_rank: token.market_cap_rank,
        fully_diluted_valuation: token.fully_diluted_valuation,
        total_volume: token.total_volume,
        high_24h: token.high_24h,
        low_24h: token.low_24h,
        price_change_24h: token.price_change_24h,
        price_change_percentage_24h: token.price_change_percentage_24h,
        market_cap_change_24h: token.market_cap_change_24h,
        market_cap_change_percentage_24h: token.market_cap_change_percentage_24h,
        circulating_supply: token.circulating_supply,
        total_supply: token.total_supply,
        max_supply: token.max_supply,
        ath: token.ath,
        ath_change_percentage: token.ath_change_percentage,
        ath_date: token.ath_date,
        atl: token.atl,
        atl_change_percentage: token.atl_change_percentage,
        atl_date: token.atl_date,
        last_updated: token.last_updated,
      };

      bulk_data.push(insert_data);
    });
  }
}

const getTokensPlatforms = async () => {
  console.log("Platforms");

  let response = await coingecko_api.get("coins/markets?vs_currency=usd&category=Platform&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h");
  
  if (response.data.status != 404) {
    console.log(response.data);
    response.data.forEach(token => {
      const insert_data = {
        category: "Platforms",
        coin_id: token.id,
        symbol: token.symbol,
        name: token.name,
        icon: token.image,
        current_price: token.current_price,
        market_cap: token.market_cap,
        market_cap_rank: token.market_cap_rank,
        fully_diluted_valuation: token.fully_diluted_valuation,
        total_volume: token.total_volume,
        high_24h: token.high_24h,
        low_24h: token.low_24h,
        price_change_24h: token.price_change_24h,
        price_change_percentage_24h: token.price_change_percentage_24h,
        market_cap_change_24h: token.market_cap_change_24h,
        market_cap_change_percentage_24h: token.market_cap_change_percentage_24h,
        circulating_supply: token.circulating_supply,
        total_supply: token.total_supply,
        max_supply: token.max_supply,
        ath: token.ath,
        ath_change_percentage: token.ath_change_percentage,
        ath_date: token.ath_date,
        atl: token.atl,
        atl_change_percentage: token.atl_change_percentage,
        atl_date: token.atl_date,
        last_updated: token.last_updated,
      };

      bulk_data.push(insert_data);
    });
  };
}

const getTokensGovernance = async () => {
  console.log("Governance");

  for (var i = 1; i < 3; i++) {
    let response = await coingecko_api.get('coins/markets?vs_currency=usd&category=governance&order=market_cap_desc&per_page=100&page=' + i + "&sparkline=false&price_change_percentage=1h");
    
    if (response.data.status != 404) {
      response.data.forEach(token => {
        const insert_data = {
          category: "Governance",
          coin_id: token.id,
          symbol: token.symbol,
          name: token.name,
          icon: token.image,
          current_price: token.current_price,
          market_cap: token.market_cap,
          market_cap_rank: token.market_cap_rank,
          fully_diluted_valuation: token.fully_diluted_valuation,
          total_volume: token.total_volume,
          high_24h: token.high_24h,
          low_24h: token.low_24h,
          price_change_24h: token.price_change_24h,
          price_change_percentage_24h: token.price_change_percentage_24h,
          market_cap_change_24h: token.market_cap_change_24h,
          market_cap_change_percentage_24h: token.market_cap_change_percentage_24h,
          circulating_supply: token.circulating_supply,
          total_supply: token.total_supply,
          max_supply: token.max_supply,
          ath: token.ath,
          ath_change_percentage: token.ath_change_percentage,
          ath_date: token.ath_date,
          atl: token.atl,
          atl_change_percentage: token.atl_change_percentage,
          atl_date: token.atl_date,
          last_updated: token.last_updated,
        };
  
        bulk_data.push(insert_data);
      });
    }
  };
}

module.exports = app
