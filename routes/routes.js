module.exports = function FactoryFunctionsRoutes(registrations) {
  async function home(req, res) {
    let regNumbersDisplay = await registrations.getRegistrations();
    res.render('index', { registrationList: regNumbersDisplay });
  }

  async function getRegNumbers(req, res) {
    //console.log(req.query.town);
    let town = req.query.town;
    console.log(town);

    if (town !== undefined && town !== '') {
      let filter = [];
      //console.log(filter);
      if (town === 'all') {
        filter = await registrations.filterByAll();
        //console.log(filter);
      } else {
        filter = await registrations.filteringByTownTag(town);
      }
      res.render('index', { registrationList: filter });
      return;
    }
    res.redirect('/');
  }
  async function addRegNumbers(req, res) {
    let regNum = req.body.regNumber;
    if (regNum === '') {
      req.flash('info', 'Please enter registration number');
      res.render('index');
    } else if (regNum.length > 8) {
      req.flash('info', 'Registration number should not be this long');
      res.render('index');
    } else if (regNum.length < 8) {
      req.flash('info', 'Registration contains atleast 6 digits');
      res.render('index');
    } else if (!regNum) {
      req.flash('info', 'Registration number already exists');
      res.render('index');
    } else if (
      !regNum.startsWith('CA') &&
      !regNum.startsWith('CY') &&
      !regNum.startsWith('CJ')
    ) {
      req.flash('info', 'Invalid registration number');
      res.render('index');
    } else {
      await registrations.addRegNumbers(req.body.regNumber);
      res.redirect('/');
    }
    //console.log(req.body.regNumber);
  }

  async function reset(req, res) {
    if (req.body.button === 'reset') {
      await registrations.deleteRegNo();
      req.flash('info', 'Registration numbers deleted');
      res.render('index');
    }
  }

  return {
    home,
    addRegNumbers,
    getRegNumbers,
    reset,
  };
};
