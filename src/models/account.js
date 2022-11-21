const mysql = require("mysql2");
const connection = require("../models/db");
const moment = require("moment");

module.exports = {
  getAllRecord: function () {
    return new Promise((resolve) => {
      const sql = "select * from transaction";
      connection.query(sql, (error, data) => {
        resolve(error ? [] : data == null ? [] : data);
      });
    });
  },

  findTokenByUserAddress: function (userAddress) {
    return new Promise((resolve) => {
      const sql = "select token from transaction where user_address = ?";
      connection.query(sql, [userAddress], (error, data) => {
        resolve(error ? [] : data == null ? [] : data);
      });
    });
  },

  findUserAddressByToken: function (token) {
    return new Promise((resolve) => {
      const sql = "select user_address from transaction where token = ?";
      connection.query(sql, [token], (error, data) => {
        resolve(error ? [] : data == null ? [] : data);
      });
    });
  },

  insert_data: function (data) {
    return new Promise((resolve) => {
      const sql = `INSERT INTO transaction(user_address, referrer_address, token) VALUES (?,?,?)`;
      connection.query(
        sql,
        [data.userAddress, data.referrerAddress, data.token],
        (err, data) => {
          resolve(err ? [] : data == null ? [] : data);
        }
      );
    });
  },

  findByuserAddress: function (userAddress) {
    return new Promise((resolve) => {
      const sql = "select * from transaction where user_address = ?";
      connection.query(sql, [userAddress], (error, data) => {
        resolve(error ? [] : data == null ? [] : data);
      });
    });
  },

  findByToken: function (token) {
    return new Promise((resolve) => {
      const sql = "select * from transaction where token = ?";
      connection.query(sql, [token], (error, data) => {
        resolve(error ? [] : data == null ? [] : data);
      });
    });
  },

  findByReferrerAddress: function (referrerAddress) {
    return new Promise((resolve) => {
      const sql =
        "select * from transaction where referrer_address = ? limit 1";
      connection.query(sql, [referrerAddress], (error, data) => {
        resolve(error ? [] : data == null ? [] : data);
      });
    });
  },

  getAffiliteCommission: function () {
    return new Promise((resolve) => {
      const sql = "select * from affiliate_commission";
      connection.query(sql, (error, data) => {
        resolve(error ? [] : data == null ? [] : data);
      });
    });
  },

  insertAffiliteCommission: async function (
    level,
    referrer,
    purchasedInBusd,
    yourCommission,
    tx,
    user_wallet_address,
    date
  ) {
    // console.log("date", date)
    // let newDate = moment(date).format('YYYY-MM-DD');
    const newDate = new Date(date);
    return new Promise((resolve) => {
      const sql = `INSERT INTO affiliate_commission(level, referrer, purchased_in_busd, your_commission, tx, user_wallet_address, date) VALUES (?,?,?,?,?,?,?)`;
      connection.query(
        sql,
        [
          level,
          referrer,
          purchasedInBusd,
          yourCommission,
          tx,
          user_wallet_address,
          newDate,
        ],
        (err, data) => {
          resolve(err ? [] : data == null ? [] : data);
        }
      );
    });
  },

  findByTxId: function (tx) {
    return new Promise((resolve) => {
      const sql = "select * from affiliate_commission where tx = ?";
      connection.query(sql, [tx], (error, data) => {
        resolve(error ? [] : data == null ? [] : data);
      });
    });
  },

  getTransactionHistory: function () {
    return new Promise((resolve) => {
      const sql = "select * from transaction_history";
      connection.query(sql, (error, data) => {
        resolve(error ? [] : data == null ? [] : data);
      });
    });
  },

  insertTransactionHistory: function (
    transaction,
    phase,
    purchasedInBusd,
    tokenAmount,
    user_wallet_address,
    date
  ) {
    // let newDate = moment(date).format('YYYY-MM-DD');
    const newDate = new Date(date);
    return new Promise((resolve) => {
      const sql = `INSERT INTO transaction_history(trascation, phase, purchased_in_busd, token_amount, user_wallet_address, date) VALUES (?, ?,?,?,?,?)`;
      connection.query(
        sql,
        [
          transaction,
          phase,
          purchasedInBusd,
          tokenAmount,
          user_wallet_address,
          newDate,
        ],
        (err, data) => {
          resolve(err ? [] : data == null ? [] : data);
        }
      );
    });
  },

  findByTransactionId: function (trascation) {
    return new Promise((resolve) => {
      const sql = "select * from transaction_history where trascation = ?";
      connection.query(sql, [trascation], (error, data) => {
        resolve(error ? [] : data == null ? [] : data);
      });
    });
  },

  getUserAffiliateCommission: function (referrer) {
    return new Promise((resolve) => {
      const sql = "select * from affiliate_commission where referrer = ?";
      connection.query(sql, [referrer], (error, data) => {
        resolve(error ? [] : data == null ? [] : data);
      });
    });
  },
};
