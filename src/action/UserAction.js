const UserModel = require("../models/account");
const randToken = require("rand-token");

module.exports = {
  getAll: function (req, res) {
    UserModel.getAllRecord().then(async (data) => {
      res.json({ status: true, data: data, message: "shows all record" });
    });
  },

  getToken: async function (req, res) {
    const { userAddress } = req.params;
    //check user is available or not
    const userAddressData = await UserModel.findByuserAddress(userAddress);
    if (userAddressData.length == 0) {
      res.json({ status: false, message: "user address not found" });
    } else {
      UserModel.findTokenByUserAddress(userAddress).then(async (data) => {
        res.json({ status: true, data: data, message: "record found" });
      });
    }
  },

  getUserAddressByToken: async function (req, res) {
    const { token } = req.params;

    // check data for token is available or not
    const tokenData = await UserModel.findByToken(token);
    if (tokenData.length === 0) {
      res.json({ status: false, message: "data from this token not found" });
    } else {
      UserModel.findUserAddressByToken(token).then((data) => {
        res.json({ status: true, data, message: "Record Found" });
      });
    }
  },

  addReferrer: async function (req, res) {
    const { userAddress, referrerAddress } = req.body;

    //check referrer address must not be blank
    if (referrerAddress == "") {
      res.json({ status: false, message: "referrer address not be blank" });
    } else {
      //check for referrer address is already used or not
      const userAddressData = await UserModel.findByuserAddress(userAddress);
      if (userAddressData.length > 0) {
        res.json({
          status: false,
          message: "user address has already referrer",
        });
      } else {
        const data = {
          userAddress,
          referrerAddress,
          token: randToken.generate(10),
        };
        UserModel.insert_data(data).then(async () => {
          res.json({ status: true, message: "Referrer added successfully" });
        });
      }
    }
  },

  getAffiliteCommission: function (req, res) {
    UserModel.getAffiliteCommission().then(async (data) => {
      res.json({
        status: true,
        data: data,
        message: "All Affilite Commission record",
      });
    });
  },

  addAffiliteCommission: async function (req, res) {
    let {
      level,
      referrer,
      purchasedInBusd,
      yourCommission,
      tx,
      user_wallet_address,
      date,
    } = req.body;

    //check for transaction is alreay exist
    // const findTx = await UserModel.findByTxId(tx)
    // if(findTx.length > 0){
    //   res.json({status: false, message: "transaction is already exists"})
    // }else{
    UserModel.insertAffiliteCommission(
      level,
      referrer,
      purchasedInBusd,
      yourCommission,
      tx,
      user_wallet_address,
      date
    ).then(async () => {
      res.json({
        status: true,
        message: "Affilite Commission added successfully",
      });
    });
    // }
  },

  getTransactionHistory: function (req, res) {
    UserModel.getTransactionHistory().then(async (data) => {
      res.json({
        status: true,
        data: data,
        message: "All transaction history record",
      });
    });
  },

  addTransactionHistory: async function (req, res) {
    const {
      transaction,
      phase,
      purchasedInBusd,
      tokenAmount,
      user_wallet_address,
      date,
    } = req.body;
    //check for transaction is alreay exist
    //  const findTx = await UserModel.findByTransactionId(trascation)
    //   if(findTx.length > 0){
    //      res.json({status: false, message: "transaction is already exists"})
    //   }else{
    UserModel.insertTransactionHistory(
      transaction,
      phase,
      purchasedInBusd,
      tokenAmount,
      user_wallet_address,
      date
    ).then(async () => {
      res.json({ status: true, message: "transation added successfully" });
    });
    // }
  },

  getUserAffiliateCommission: function (req, res) {
    const { referrer } = req.body;
    UserModel.getUserAffiliateCommission(referrer).then(async (data) => {
      res.json({
        status: true,
        data: data,
        message: "User Affilite Commission record",
      });
    });
  },
};
