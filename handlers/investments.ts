
const { Storage } = require("../storage");

const create = async (req, res, next) => {
  try {
    const title = req.body.title;
    const type = req.body.type;
    const funds = req.body.funds;
    const currency = req.body.currency;
    const userId = req.body.email;

    const investmentsStorage = new Storage('investments');
    investmentsStorage.update(userId, { [Date.now()]: {
      title, type, funds, currency
    }});

    res.status(200).send({ result: "OK" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create
};
