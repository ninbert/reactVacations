//Function that checks if a it's passed argument is empty or not. Returns true or false.

const isEmpty = value =>
    value === undefined ||
    value === null ||
    typeof value === "object" && Object.keys(value).length ===0 ||
    typeof value ==="string" && value.trim().length === 0

module.exports = isEmpty;