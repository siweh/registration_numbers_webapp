let assert =  require('assert');
const RegistrationNumbers = require('./../registration');

describe("Registration numbers project", function(){
    context("Given a valid registration number", function(){
        const registrationNumbers = RegistrationNumbers();
        it("should be able to return the added registration number", function(){
            registrationNumbers.addRegistrationNumber('ca345345');
            assert.equal('CA 345-345', registrationNumbers.formatRegistrationNumber('ca345345'));
        })
    });

    context("Given an invalid registration number", function(){
        const registrationNumbers = RegistrationNumbers();
        it("should return an invalid registration number error", function(){
            registrationNumbers.addRegistrationNumber('cd123876');
            assert.equal('Invalid registration number', registrationNumbers.getErrorMessage());
        });
    });

    context("Given small digit registration number", function(){
        const registrationNumbers = RegistrationNumbers();
        it("should return a registration number error", function(){
            registrationNumbers.addRegistrationNumber('ca236');
            assert.equal('Registration contains atleast 6 digits', registrationNumbers.getErrorMessage());
        });
    });

    context("Without registration number", function(){
        const registrationNumbers = RegistrationNumbers();
        it("should return: Please enter registration number", function(){
            registrationNumbers.addRegistrationNumber('');
            assert.equal('Please enter registration number', registrationNumbers.getErrorMessage());
        })
    });

    context("Given the same registration numbers", function(){
        const registrationNumbers = RegistrationNumbers();
        it("should return an error saying registration number already exists", function(){
            registrationNumbers.addRegistrationNumber('ca123456');
            registrationNumbers.addRegistrationNumber('ca123456');
            assert.equal('Registration number already exists', registrationNumbers.getErrorMessage());
        });
    });

    context("Given a lengthy registration number", function(){
        const registrationNumbers = RegistrationNumbers();
        it("should return an error about the length of the registration number", function(){
            registrationNumbers.addRegistrationNumber('cy123456789101112');
            assert.equal('Registration number should not be this long', registrationNumbers.getErrorMessage());
        })
    })

    context("Formatting registration numbers", function(){
        const registrationNumbers = RegistrationNumbers();
        it("should be able to format registration numbers", function(){
            assert.equal('CA 123-345', registrationNumbers.formatRegistrationNumber('Ca123345'));
        });
    });

    context("Filter registration number by town", function(){
        const registrationNumbers = RegistrationNumbers();
        it("Should be able to return a filtered registration numbers by that town", function(){
            registrationNumbers.addRegistrationNumber('ca123563');
            registrationNumbers.addRegistrationNumber('cj134874');
            registrationNumbers.addRegistrationNumber('cy234498');
            var results = registrationNumbers.getRegistrationNumbers('capetown');
            assert.deepEqual(['ca123563'], results);
        });
    });
});