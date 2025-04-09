const db = require('../config/db');

const Dashboard = {
  superadminDashboard: async () => {
    try {
      const [users] = await db.execute(`SELECT COUNT(*) AS row_count FROM users`);
      const [banners] = await db.execute(`SELECT COUNT(*) AS row_count FROM banners`);
      const [pagescategory] = await db.execute(`SELECT COUNT(*) AS row_count FROM pagescategory`);
      const [pages] = await db.execute(`SELECT COUNT(*) AS row_count FROM pages`);
      const [roles] = await db.execute(`SELECT COUNT(*) AS row_count FROM roles`);
      const [players] = await db.execute(`SELECT COUNT(*) AS row_count FROM players`);
      const [deposits] = await db.execute(`SELECT COUNT(*) AS row_count FROM deposit`);
      const [totalDepositAmt] = await db.execute(`SELECT SUM(amount) AS totalDeposit FROM deposit WHERE isApproved = true`);
      const [withdraws] = await db.execute(`SELECT COUNT(*) AS row_count FROM withdraw`);
      const [totalWithdrawAmt] = await db.execute(`SELECT SUM(amount) AS totalwithdraw FROM withdraw WHERE isApproved = true`);

      let dashboardJson = [
        {
          totalUsers: users[0].row_count,
          totalBanners: banners[0].row_count,
          totalPagescategory: pagescategory[0].row_count,
          totalPages: pages[0].row_count,
          totalRoles: roles[0].row_count,
          totalPlayers: players[0].row_count,
          totalDepositsCount: deposits[0].row_count,
          totalDepositAmt: totalDepositAmt[0].totalDeposit,
          totalWithdrawsCount: withdraws[0].row_count,
          totalWithdrawAmt: totalWithdrawAmt[0].totalwithdraw,
        }
      ]

      let dataJSON = {
        status: 'success',
        data: dashboardJson
      };
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },
  playerProfile: async (playerId) => {
    try {
      const [deposits] = await db.execute(`SELECT COUNT(*) AS row_count FROM deposit WHERE playerId = ?` , [playerId]);
      const [depositList] = await db.execute(`SELECT * FROM deposit WHERE playerId = ? ORDER BY created_at DESC` , [playerId]);
      const [totalDepositAmt] = await db.execute(`SELECT SUM(amount) AS totalDeposit FROM deposit WHERE playerId = ? AND isApproved = true`,[playerId]);
      const [withdraws] = await db.execute(`SELECT COUNT(*) AS row_count FROM withdraw WHERE playerId = ?` , [playerId]);
      const [withdrawList] = await db.execute(`SELECT * FROM withdraw WHERE playerId = ? ORDER BY created_at DESC` , [playerId]);
      const [totalWithdrawAmt] = await db.execute(`SELECT SUM(amount) AS totalwithdraw FROM withdraw WHERE playerId = ? AND isApproved = true`,[playerId]);

      let dashboardJson = [
        {
          totalDepositsCount: deposits[0].row_count,
          lastDepositAmt: depositList.length ? depositList[0].amount : 0,
          totalDepositAmt: totalDepositAmt[0].totalDeposit,
          totalWithdrawsCount: withdraws[0].row_count,
          lastWithdrawAmt: withdrawList.length ? withdrawList[0].amount : 0,
          totalWithdrawAmt: totalWithdrawAmt[0].totalwithdraw,
        }
      ]

      let dataJSON = {
        status: 'success',
        data: dashboardJson
      };
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = Dashboard;