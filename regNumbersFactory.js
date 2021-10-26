module.exports = function RegNumbersFactory(pool) {
  //var registrationNumbers = [];
  var errMessage = '';
  async function addRegNumbers(reg) {
    try {
      let townId = await getTownId(reg.substring(0, 2));
      const query = await pool.query(
        `INSERT INTO registration_numbers (registration_number, town_id)
                VALUES ($1, $2)`,
        [reg, townId]
      );
      console.log('Data saved successful');
      // if (reg.length > 8) {
      //   reg = '';
      //   errMessage = 'Registration number should not be this long';
      // } else if (reg.length < 8) {
      //   reg = '';
      //   errMessage = 'Registration contains atleast 6 digits';
      // } else if (reg === '') {
      //   errMessage = 'Please enter registration number';
      // }
    } catch (error) {
      console.log(error);
    }
  }

  async function getTownId(town_code) {
    const query = await pool.query(`SELECT id FROM towns WHERE town_tag = $1`, [
      town_code,
    ]);
    //console.log(query.rows[0].id);
    return query.rows[0].id;
  }

  async function getTown(town) {
    const query = await pool.query(`SELECT * FROM towns WHERE town = $1`, [
      town,
    ]);

    // var results = await client.query(query);
    // await client.end();
    return query;
  }

  async function getAllTowns() {
    const results = await pool.query(`SELECT * FROM towns`);
    return results.rows;
  }

  async function getRegistrations() {
    const results = await pool.query(`SELECT * FROM registration_numbers`);

    //console.log(JSON.stringify(results.rows) + 'Siweh');
    return results.rows;
  }

  // async function filtering(town_value) {
  //   let townId = await getTownId(town_value.substring(0, 2));
  //   const results = await pool.query(
  //     `SELECT registration_number FROM registation_numbers WHERE town_id = $1`,
  //     [townId]
  //   );
  //   //console.log(query.rows);
  //   return results.rows;
  // }

  async function filteringByTownTag(town_value) {
    const results = await pool.query(
      `SELECT registration_numbers.registration_number 
      FROM registration_numbers, towns 
      WHERE towns.id = registration_numbers.town_id 
      AND towns.town_tag = $1;`,
      [town_value]
    );
    //console.log(results.rows);
    return results.rows;
  }

  async function filterByAll() {
    const results = await pool.query(`SELECT * FROM registration_numbers`);
    //console.log(results);
    return results.rows;
  }

  async function deleteRegNo() {
    try {
      await pool.query(
        `DELETE FROM registration_numbers WHERE registration_numbers.id >= 1`
      );
      console.log('Data deleted successful');
    } catch (error) {
      console.log(error);
    }
  }

  // function addRegistrationNumber(regNumber) {
  //   //console.log(regNumber);
  //   //var numberRegx = /^[A-Z]{2}\s[0-9]{3}[A-Z]{2}\s[0-9]{3}$/;

  //   if (!registrationNumbers.includes(regNumber.toLowerCase())) {
  //     if (regNumber.length > 8) {
  //       errMessage = 'Registration number should not be this long';
  //     } else {
  //       if (regNumber.length < 8) {
  //         errMessage = 'Registration contains atleast 6 digits';
  //       } else {
  //         if (
  //           regNumber.startsWith('ca') ||
  //           regNumber.startsWith('cj') ||
  //           regNumber.startsWith('cy')
  //         ) {
  //           errMessage = '';
  //           registrationNumbers.push(regNumber.toLowerCase());
  //         } else {
  //           errMessage = 'Invalid registration number';
  //         }
  //       }
  //     }
  //   } else {
  //     errMessage = 'Registration number already exists';
  //   }

  //   if (regNumber === '') {
  //     errMessage = 'Please enter registration number';
  //   }
  //   //console.log(registrationNumbers);
  // }

  function getErrorMessage() {
    return errMessage;
  }

  return {
    addRegNumbers,
    getRegistrations,
    getTownId,
    deleteRegNo,
    getTown,
    getAllTowns,
    filteringByTownTag,
    filterByAll,
    getErrorMessage,
  };
};
