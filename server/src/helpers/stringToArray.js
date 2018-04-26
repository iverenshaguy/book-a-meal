/**
 * Function to change an array like string to array or return array if already array
 * @param {(array|string)} value
 * @return {array} returns a new array
 */
function stringToArray(value) {
  if (!Array.isArray(value)) {
    let newValue;
    const formedArray = [];
    // remove square brackets and spaces and convert to an array
    const newString = value.replace(/[\[\]\s/n']+/g, ''); // eslint-disable-line

    if (newString.includes(',')) {
      newValue = newString.split(',');
    } else {
      formedArray.push(newString);
      newValue = Array.from(formedArray);
    }

    return newValue;
  }

  return value;
}

export default stringToArray;
