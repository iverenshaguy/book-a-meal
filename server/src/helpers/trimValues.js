/**
 * Function to trim each item in an object
 * @param {object} reqBody
 * @return {object} returns a new object
 */
function trimValues(reqBody) {
  const keysArr = Object.keys(reqBody);

  return keysArr.reduce((obj, key) => {
    // only trim vaalue if it's a string
    obj[key] = typeof reqBody[key] === 'string' ?
      reqBody[key].trim() :
      reqBody[key];

    return obj;
  }, {});
}

export default trimValues;
