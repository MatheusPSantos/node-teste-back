"use strict";

module.exports.count = async (event) => {
  const axios = require("axios");

  const apiURL = "https://api.countapi.xyz/hit/matheus/";
  

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v2.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};
