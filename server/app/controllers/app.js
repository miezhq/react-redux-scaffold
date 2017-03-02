function runApp(req, res) {
  const appData = {
    loggedIn: false,
    user: null,
  };

  res.render('app', {
    appData: JSON.stringify(appData),
  });
}

module.exports.runApp = runApp;
