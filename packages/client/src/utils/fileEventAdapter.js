/**
 * Adapts File Event to Value
 * @function fileEventAdapter
 * @param {object} preview - file preview element
 * @param {object} event - event
 * @returns {void}
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
