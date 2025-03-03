const cron = require('node-cron');
const db = require('../models');
const Investment = db.Investment;
const rapidapiService = require('./rapidapiService');

const updateInvestmentNavs = async () => {
  console.log('Starting portfolio NAV update...');
  try {
    const investments = await Investment.findAll();
    for (const inv of investments) {
      try {
        // Fetch latest NAV for the investment’s scheme
        const latestNav = await rapidapiService.fetchLatestNav(inv.schemeName);
        if (latestNav) {
          inv.currentNav = latestNav;
          inv.lastUpdated = new Date();
          await inv.save();
          console.log(`Updated ${inv.schemeName} to NAV ${latestNav}`);
        } else {
          console.log(`No NAV data available for ${inv.schemeName}`);
        }
      } catch (err) {
        console.error(`Error updating ${inv.schemeName}: ${err.message}`);
      }
    }
  } catch (err) {
    console.error('Error fetching investments: ', err.message);
  }
};

exports.start = () => {
  // Schedule the task to run at the top of every hour
  cron.schedule('0 * * * *', updateInvestmentNavs);
  console.log('Portfolio updater scheduled to run every hour.');
};
