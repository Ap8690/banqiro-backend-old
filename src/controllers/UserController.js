const express = require("express");
const router = express.Router();
const UserAction = require("../action/UserAction");

router.post("/addReferrer", UserAction.addReferrer);
router.get("/getToken/:userAddress", UserAction.getToken);
router.get("/getUserAddressByToken/:token", UserAction.getUserAddressByToken);
router.get("/getAll", UserAction.getAll);

//Affilite Commission route
router.get("/getAffiliateCommission", UserAction.getAffiliteCommission);
router.post("/addAffiliateCommission", UserAction.addAffiliteCommission);
router.post(
  "/getUserAffiliateCommission",
  UserAction.getUserAffiliateCommission
);

//transaction history route
router.get("/getTransactionHistory", UserAction.getTransactionHistory);
router.post("/addTransactionHistory", UserAction.addTransactionHistory);

module.exports = router;
