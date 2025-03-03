const rapidapiService = require('../services/rapidapiService');

exports.getOpenEndedSchemes = async (req, res) => {
  const { fundFamily } = req.params;
  try {
    console.log(fundFamily);
    const data = await rapidapiService.fetchOpenEndedSchemes(fundFamily);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching fund data' });
  }
};
