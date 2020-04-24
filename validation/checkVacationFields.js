const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function (data) {

    console.log(data);

    let errors = {};


    return {
        errors,
        isValid: isEmpty(errors)
    };

};
