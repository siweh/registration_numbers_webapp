module.exports = function FactoryFunctionsRoutes(registrations) {
  async function home(req, res) {
    // let errors = registrations.getErrorMessage();
    // req.flash('info', errors);
    //console.log(errors);

    let regNumbersDisplay = await registrations.getRegistrations();
    res.render('index', { registrationList: regNumbersDisplay });
  }

  async function getRegNumbers(req, res) {
    //console.log(req.query.town);
    let town = req.query.town;
    console.log(town);

    if (town !== undefined && town !== '') {
      let filter = await registrations.filteringByTownTag(town);
      //console.log(filter);
      if (town === 'all') {
        let filterAll = await registrations.filterByAll();
        console.log(filterAll);
      } else {
        filter;
      }
      res.render('index', { registrationList: filter });
      return;
    }
    res.redirect('/');
  }
  async function addRegNumbers(req, res) {
    let regNum = req.body.regNumber;
    // let duplicates = regNum.slice().sort();
    //console.log(regNum);
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
