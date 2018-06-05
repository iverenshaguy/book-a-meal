/**
 * Validate File Before Upload
 * @function uploadValidation
 * @param {object} file - file object
 * @param {number} maxSize - max allowed size
 * @param {array} allowedTypes - allowed file types array
 * @returns {(string|null)} returns error or null if valid
 */
function uploadValidation(file, maxSize, allowedTypes) {
  if (!allowedTypes.includes(file.type)) {
    return 'Invalid File Type';
  }

  if (file.size > maxSize) {
    return 'File Too Large';
  }

  return null;
}

export default uploadValidation;
