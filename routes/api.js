/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;

const StockHandler = require("../controllers/stockHandler");

const stockController = new StockHandler();
module.exports = function(app) {
  app.route("/api/stock-prices").get(async function(req, res) {
    const { stock, like } = req.query;

    try {
      if (Array.isArray(stock)) {
        //logic for comparing stocks
        const stock1 = await stockController.handleOneStock(
          stock[0],
          like,
          req.clientIp
        );

        const stock2 = await stockController.handleOneStock(
          stock[1],
          like,
          req.clientIp
        );

        const rel_likes = [
          stock1.likes - stock2.likes,
          stock2.likes - stock1.likes
        ];

        return res.json({
          stockData: [
            {
              stock: stock1.stock,
              price: stock1.price,
              rel_likes: rel_likes[0]
            },
            {
              stock: stock2.stock,
              price: stock2.price,
              rel_likes: rel_likes[1]
            }
          ]
        });
      }

      const stockData = await stockController.handleOneStock(
        stock,
        like,
        req.clientIp
      );
      res.json({
        stockData: {
          stock: stockData.stock,
          price: stockData.price,
          likes: stockData.likes
        }
      });
    } catch (error) {
      console.log(error);
      res.send("Server Error");
    }
  });
};
