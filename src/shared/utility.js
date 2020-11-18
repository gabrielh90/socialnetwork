export const checkValidity = (value, rules) => {
    let brokenRules = [];
    if(!rules || rules.length === 0) {
        return true;
    }
    if ( rules.required && value.trim() === '' ) {
        brokenRules.push('The field is required!');
    } else if ( rules.minLength && value.length < rules.minLength) {
        brokenRules.push('The length is too small!');
    } else if ( rules.maxLength && value.length > rules.maxLength) {
        brokenRules.push('The length is too big!');
    }
    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        pattern.test( value ) || brokenRules.push('The email is not valid!');
    }
    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        pattern.test( value ) || brokenRules.push('The field must be a number!');
    }
    return brokenRules.length === 0 ? true : false;
}