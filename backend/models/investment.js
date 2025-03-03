module.exports = (sequelize, DataTypes) => {
    const Investment = sequelize.define('Investment', {
      fundFamily: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      schemeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amountInvested: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      purchaseNav: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      currentNav: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      lastUpdated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }
    });
  
    return Investment;
  };
  