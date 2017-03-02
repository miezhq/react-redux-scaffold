const AppController = require('../controllers/app');

module.exports.init = (app) => {
  app.use(AppController.runApp);
};
