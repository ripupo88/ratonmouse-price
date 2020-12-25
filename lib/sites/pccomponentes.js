"use strict";

const siteUtils = require("../site-utils");
const logger = require("../logger")();

class PcComponentes {
  constructor(uri) {
    if (!PcComponentes.isSite(uri)) {
      logger.log("erorr");
      throw new Error("invalid uri for Google Play: %s", uri);
    }

    this._uri = uri;
  }

  getURIForPageData() {
    return this._uri;
  }

  isJSON() {
    return false;
  }

  findPriceOnPage($) {
    const priceString = $("#precio-main").attr("data-price");

    if (!priceString) {
      logger.error(
        "price was not found on google play page, uri: %s",
        this._uri
      );
      return -1;
    }

    const price = siteUtils.processPrice(priceString);

    return price;
  }

  static isSite(uri) {
    if (uri.indexOf("pccomponentes.com") > -1) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = PcComponentes;
