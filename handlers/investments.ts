
const { Storage } = require("../storage");
const { sum } = require("../services/calculator");

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

const report = async (req, res, next) => {
  try {
    const email = req.body.email;

    const investmentsStorage = new Storage('investments');
    const userInvestments = investmentsStorage.get(email);

    if (!userInvestments) {
      res.status(200).send({ result: 0 });
    }

    const operationIds = Object.keys(userInvestments);
    const funds = operationIds.map(operation => userInvestments[operation]["funds"]);
    const total = sum(funds);
    const currency = userInvestments[operationIds[0]].currency;

    res.status(200).send({ result: `${total} ${currency}` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  report
};
