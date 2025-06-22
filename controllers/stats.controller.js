const User = require('../models/User');
const Tontine = require('../models/Tontine');

const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    return res.json({ totalUsers });
  } catch (error) {
    console.error('Error fetching total users:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getTontineStats = async (req, res) => {
  try {
    const totalTontines = await Tontine.countDocuments();
    const activeTontines = await Tontine.countDocuments({ isActive: true });
    return res.json({ totalTontines, activeTontines });
  } catch (error) {
    console.error('Error fetching tontine stats:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getTotalContributions = async (req, res) => {
  try {
    // Sum length of contributionsList array for all tontines
    const tontines = await Tontine.find({}, 'contributionsList').lean();
    const totalContributions = tontines.reduce(
      (acc, tontine) => acc + (tontine.contributionsList?.length || 0),
      0
    );
    return res.json({ totalContributions });
  } catch (error) {
    console.error('Error fetching total contributions:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getTotalBalance = async (req, res) => {
  try {
    // Sum balance fields of all tontines
    const tontines = await Tontine.find({}, 'balance').lean();
    const totalBalance = tontines.reduce((acc, tontine) => acc + (tontine.balance || 0), 0);
    return res.json({ totalBalance });
  } catch (error) {
    console.error('Error fetching total balance:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTotalUsers,
  getTontineStats,
  getTotalContributions,
  getTotalBalance,
};
