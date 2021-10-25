module.exports = function FactoryFunctionsRoutes(registrations) {
  async function home(req, res) {
    let errors = registrations.getErrorMessage();
    req.flash('info', errors);
    //console.log(errors);

    let regNumbersDisplay = await registrations.getRegistrations();
    res.render('index', { errors, registrationList: regNumbersDisplay });
  }

  async function getRegNumbers(req, res) {
    //console.log(req.query.town);
    let town = req.query.town;
    if (town !== undefined && town !== '') {
      let filter = await registrations.filteringByTownTag(town);
      //console.log(filter);
      res.render('index', { registrationList: filter });
      return;
    }
    res.redirect('/');
  }
  async function addRegNumbers(req, res) {
    await registrations.addRegNumbers(req.body.regNumber);
    //console.log(req.body.regNumber);
    res.redirect('/');
  }

  // async function filterByTown(req, res){
  //   res.redirect('/')
  // }
  async function reset(req, res) {
    if (req.body.button === 'reset') {
      await registrations.deleteRegNo();
      res.redirect('/');
    }
  }

  return {
    home,
    addRegNumbers,
    getRegNumbers,
    reset,
  };
};
