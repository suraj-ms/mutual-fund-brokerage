const db = require('../models');
const Investment = db.Investment;

exports.addInvestment = async (req, res) => {
  const { fundFamily, schemeName, amountInvested, purchaseNav } = req.body;
  const userId = req.user.id;
  try {
    const investment = await Investment.create({
      userId,
      fundFamily,
      schemeName,
      amountInvested,
      purchaseNav,
      currentNav: purchaseNav, // initial NAV equals purchase price
    });
    res.status(201).json(investment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding investment' });
  }
};

exports.getPortfolio = async (req, res) => {
  const userId = req.user.id;
  try {
    const investments = await Investment.findAll({ where: { userId } });
    res.json(investments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching portfolio' });
  }
};
