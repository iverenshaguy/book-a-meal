/**
 * Adapt File Event to Value
 * @function fileEventAdapter
 * @param {object} preview - file preview
 * @param {object} event - event
 * @returns {function} delegate event function
 */
const fileEventAdapter = preview => (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    preview.src = reader.result;
  });

  reader.readAsDataURL(file);
};

export default fileEventAdapter;
