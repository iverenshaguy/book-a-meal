/**
 * Function to change an array like string to array or return array if already array
 * @param {(array|string)} value
 * @param {string} spliter
 * @return {array} returns a new array
 */
function stringToArray(value, spliter = ',') {
  if (!Array.isArray(value)) {
    let newValue;
    const formedArray = [];
    // remove square brackets and spaces and convert to an array
    const newString = value.replace(/[\[\]\s/n']+/g, ''); // eslint-disable-line

    if (newString.includes(spliter)) {
      newValue = newString.split(spliter);
    } else {
      formedArray.push(newString);
      newValue = [...formedArray];
    }

    return newValue;
  }

  return value;
}

export default stringToArray;
