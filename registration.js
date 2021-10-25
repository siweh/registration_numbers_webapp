module.exports = function RegistrationNumbers(registrationNumbersList = []) {
   //console.log(registrationNumbersList);
    //console.log(["qqq","vvv"]);
    var registrationNumbers = [];
    var errMessage = '';
    var filteredRegNumbers = [];
    function addRegistrationNumber(regNumber) {
        //console.log(regNumber);
        //var numberRegx = /^[A-Z]{2}\s[0-9]{3}[A-Z]{2}\s[0-9]{3}$/;


        if (!registrationNumbers.includes(regNumber.toLowerCase())){
            if(regNumber.length > 8){
                errMessage = 'Registration number should not be this long';
            }else{
                if(regNumber.length < 8){
                    errMessage = 'Registration contains atleast 6 digits';
                }else{
                    if (regNumber.startsWith('ca') || regNumber.startsWith('cj') || regNumber.startsWith('cy')){
                        errMessage = '';
                        registrationNumbers.push(regNumber.toLowerCase());
                    }else{
                        errMessage = 'Invalid registration number';
                    }
                }
            }
        }else{
            errMessage = 'Registration number already exists';
        }

        if (regNumber === ''){
            errMessage = 'Please enter registration number';
        }
        //console.log(registrationNumbers);
    }

   
    function formatRegistrationNumber(regNumberMsg) {
        // console.log(regNumberMsg.substring(0,2).toUpperCase());
        // console.log(regNumberMsg.substring(2,5));
        // console.log(regNumberMsg.substring(5,8));
        return regNumberMsg.substring(0,2).toUpperCase() + ' ' + regNumberMsg.substring(2,5) + '-' + regNumberMsg.substring(5,8);
    }

    function getRegistrationNumbers(town = 'all') {
        function isCapeTownReg(regNo) {
            if (town === 'capetown') {
                return regNo.startsWith('ca');
            }else if (town === 'paarl'){
                return regNo.startsWith('cj')
            }else if (town === 'bellville'){
                return regNo.startsWith('cy')
            }
            else if(town === 'all'){
                return true;
            }
                
        }

        return registrationNumbers.filter(isCapeTownReg);
    }
    
    function getFilteredRegistrationNumbers() {
        return filteredRegNumbers;
    }
    function getErrorMessage() {
        return errMessage;
    }

    function getRegNumbers() {
        return registrationNumbers;
    }

    return {
        addRegistrationNumber,
        getErrorMessage,
        getRegistrationNumbers,
        formatRegistrationNumber,
        getFilteredRegistrationNumbers,
        getRegNumbers
    }
}