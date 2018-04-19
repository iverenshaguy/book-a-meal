const cardGroup = document.getElementById('card-group');
const addModalBtn = document.getElementById('add-meal-btn');
const mealModal = document.getElementById('meal-modal');
const modalTitle = document.getElementById('modal-title-h3');
const modalBody = document.getElementsByClassName('modal-body')[0];

// javscript closest polyfill
if (!Element.prototype.matches)
  Element.prototype.matches = Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest)
  Element.prototype.closest = function (s) {
    var el = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };

addModalBtn.onclick = showModal;
// mealModal.addEventListener('click', closeModal);

mealModal.addEventListener('click', function (e) {
  if (e.target !== e.currentTarget && e.target.id === 'modal-close-icon') {
    e.preventDefault();
    this.closest('.modal').classList.remove('show');
  }

  if (e.target !== e.currentTarget && e.target.id === 'img-overlay') {
    // trigger input file click
    e.target.nextSibling.nextSibling.click();
  }

  e.stopPropagation();
}, false);

cardGroup.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target !== e.currentTarget && e.target.id === 'dropdown-toggler') {
    const target = e.target;
    target.style.color = 'white';
    target.nextSibling.nextSibling.classList.toggle('show');
    target.style.color = '';
  }

  if (e.target !== e.currentTarget && e.target.id === 'edit-meal') {
    showModal(e);
  }

  e.stopPropagation();
});

function showModal(e) {
  if (e.target.id === 'add-meal-btn') {
    mealModal.classList.toggle('show');
    mealForm('add');
  }

  if (e.target.id === 'edit-meal') {
    // fill form fields then show modal
    mealModal.classList.toggle('show');
    mealForm('edit');
  }
}

function closeModal(e) {
  e.preventDefault();

  if (e.target !== e.currentTarget && e.target.id === 'modal-close-icon') {
    this.closest('.modal').classList.remove('show');
  }

  e.stopPropagation();
}

function mealForm(type) {
  const mealDesc = type === 'add' ? '' : 'Meal Combination of Jollof Rice, Salad, Plantain and Chicken, with a bottle of pet coke';
  const form = `
    <form>
      <div class="form-input">
        <label for="#name">Meal Name</label>
        <input type="text" id="name" name="name" value="${type === 'add' ? '' : 'Jollof Rice Meal'}" onkeyup="this.setAttribute('value', this.value);" />
      </div>

      <div class="form-input form-img-input">
        <div class="img-overlay" id="img-overlay"><p>Please Select an Image</p></div>
        <input type="file" id="input-image" accept="image/*" name="image" onchange="return changeImage(event)" />
        <img
          src="${type === 'add' ?
      './assets/img/placeholder-image.jpg' :
      './assets/img/meal-image.JPG'}"
          alt="meal-image"
          id="meal-form-image"
        />
      </div>

      <div class="form-input">
        <label for="#price">Price</label>
        <input type="text" id="price" name="price" value="${type === 'add' ? '' : 2100}" onkeyup="this.setAttribute('value', this.value);" />
      </div>
  
      <div class="form-input">
        <label for="#description">Description</label>
        <br/>
        <textarea rows="5" id="description" name="description">${mealDesc}</textarea>
      </div>
  
      <div class="form-input-checkbox">
        <input type="checkbox" id="checkbox" name="checkbox/>
        <label for="#checkbox">Suitable for Vegetarians</label>
      </div>
  
      <button class="btn btn-pri btn-block" type="submit">${type === 'add' ? 'Add' : 'Save'}</button>
    </form>`;

  modalTitle.innerText = type === 'add' ? 'Add a Meal' : 'Edit Meal';
  modalBody.innerHTML = form;
}


function changeImage(e) {
  const error = e.target.previousSibling.previousSibling;
  const preview = e.target.nextSibling.nextSibling;
  const file = e.target.files[0];
  const photoFile = file && file.type;
  const match = ['image/jpg', 'image/png', 'image/jpeg'];
  const reader = new FileReader();

  console.log(error.innerHTML);
  error.innerHTML = '<p>Please Select an Image</p>';

  if (!((photoFile == match[0]) || (photoFile == match[1]) || (photoFile == match[2]))) {
    preview.setAttribute('src', './assets/img/placeholder-image.jpg');
    error.innerHTML = '<p class="danger">Please Select A Valid Image File</p>';
    return false;
  }

  reader.addEventListener('load', function () {
    preview.src = reader.result;
  }, false);

  reader.readAsDataURL(file);
}

function loadPhoto(e) {
  mealFormImage.setAttribute('src', e.target.result);
}





// dropdownToggler.onclick = function (e) {

//   this.style.color = 'white';
//   dropdown.classList.toggle('show');
//   this.style.color = '';
// }