const StockPrice = require("../models/StockPrice");

const fetch = require("isomorphic-unfetch");

function StockController() {
  this.handleOneStock = async function(stock, like, ip) {
    // console.log(stock, like);
    const stockData = await StockPrice.findOne({
      stock: stock.toUpperCase()
    });

    if (!stockData) {
      //find and create new stock
      const resData = await fetch(
        `https://repeated-alpaca.glitch.me/v1/stock/${stock}/quote`
      );
      const data = await resData.json();

      if (data.symbol) {
        // console.log(data.latestPrice);
        const newStock = new StockPrice({
          stock: data.symbol,
          price: data.latestPrice,
          likes: 0
        });

        if (like) {
          newStock.likes++;
          newStock.ipsLiked.push(ip);
        }

        await newStock.save();

        return newStock;
        //   res.send({
        //     stockData: {
        //       stock: newStock.stock,
        //       price: newStock.price,
        //       likes: newStock.likes
        //     }
        //   });
        //   return;
      }

      throw new Error("Invalid Stock");

      // res.send("invalid stock");
      // return;
    }

    if (like) {
      //verify if ip already liked it.
      if (stockData.ipsLiked.includes(ip)) {
        stockData.likes++;
      }
    }
    await stockData.save();

    return stockData;
    //   return res.send({
    //     stockData: {
    //       stock: stockData.stock,
    //       price: stockData.price,
    //       likes: stockData.likes
    //     }
    //   });
  };
}

module.exports = StockController;
