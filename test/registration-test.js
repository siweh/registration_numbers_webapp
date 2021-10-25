const assert = require('assert');
const RegNumbersFactory = require('./../regNumbersFactory');
const { Pool } = require('pg');

const Client = Pool;

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://sibu:pg1234@localhost:5432/registration_numbers_db';

const pool = new Pool({
  connectionString: connectionString,
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
});

describe('Registration numbers webapp database', function () {
  beforeEach(async function () {
    console.log('*****');
    const reg_numbers = RegNumbersFactory(pool);
    await reg_numbers.deleteRegNo();
  });

  it('should be able to add registration number', async function () {
    const reg_numbers = RegNumbersFactory(pool);
    await reg_numbers.addRegNumbers('CA123456');
    let regNo = await reg_numbers.getRegistrations();
    console.log(regNo);
    assert.equal('CA123456', regNo[0].registration_number);
  });

  it('should be able to filter registration numbers by town', async function () {
    const reg_numbers = RegNumbersFactory(pool);
    await reg_numbers.addRegNumbers('CA123456');
    await reg_numbers.addRegNumbers('CA123456');
    await reg_numbers.addRegNumbers('CJ123456');
    await reg_numbers.addRegNumbers('CY123456');
    await reg_numbers.getRegistrations();
    let filter = await reg_numbers.filteringByTownTag('CA');
    console.log(filter);
    assert.equal(2, filter.length);
  });

  it('should be able to get the town Cape town', async function () {
    const reg_numbers = RegNumbersFactory(pool);
    let town = await reg_numbers.getTown('cape town');
    //console.log(town);
    assert.equal('cape town', town.rows[0].town);
  });

  it('should be able to get the town Paarl', async function () {
    const reg_numbers = RegNumbersFactory(pool);
    let town = await reg_numbers.getTown('paarl');
    assert.equal('paarl', town.rows[0].town);
  });

  it('should be able to get the town Bellville', async function () {
    const reg_numbers = RegNumbersFactory(pool);
    let town = await reg_numbers.getTown('bellville');
    assert.equal('bellville', town.rows[0].town);
  });

  it('should be able to get all town', async function () {
    const reg_numbers = RegNumbersFactory(pool);
    await reg_numbers.getTown('cape town');
    await reg_numbers.getTown('paarl');
    await reg_numbers.getTown('bellville');
    let allTowns = await reg_numbers.getAllTowns();
    assert.equal(3, allTowns.rows.length);
  });
});
