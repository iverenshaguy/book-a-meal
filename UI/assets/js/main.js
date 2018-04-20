window.onload = function () {
  const cardGroup = document.getElementById('card-group');
  const addMealModalBtn = document.getElementById('add-meal-btn');
  const modal = document.getElementsByClassName('modal')[0];
  const mealCardBtns = document.getElementsByClassName('meal-card-btn');
  const mealModal = document.getElementById('meal-modal');
  const notifModal = document.getElementById('notif-modal');
  const modalTitle = document.getElementById('modal-title-h3');
  const modalBody = document.getElementsByClassName('modal-body')[0];
  const menuModalBtn = document.getElementById('menu-modal-btn');
  const menuModal = document.getElementById('menu-modal');
  const dropdowns = document.getElementsByClassName('dropdown');
  const checkoutBtn = document.getElementById('checkout');

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

  if (addMealModalBtn) addMealModalBtn.onclick = e => showModal(e, mealModal);
  if (menuModalBtn) menuModalBtn.onclick = e => showModal(e, menuModal);
  if (checkoutBtn) checkoutBtn.onclick = e => showModal(e, notifModal);

  if (mealCardBtns.length) for (let i = 0; i < mealCardBtns.length; i++) {
    mealCardBtns[i].addEventListener('click', function (e) {
      if (e.target === e.currentTarget) {
        redirect('./order-confirmation.html');
      }
    });
  }

  if (dropdowns.length) for (let i = 0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener('click', function (e) {
      e.preventDefault();

      if (e.target !== e.currentTarget && e.target.id === 'dropdown-toggler') {
        const target = e.target;
        const wrapper = target.nextSibling.nextSibling;

        toggleDropdown(target, wrapper);
      }

      if (e.target !== e.currentTarget && (e.target.id === 'edit-meal' || e.target.id === 'delete-meal')) {
        showModal(e, mealModal);
      }

      if (e.target !== e.currentTarget && e.target.id === 'dropdown-img') {
        const target = e.target;
        const wrapper = target.parentNode.nextSibling.nextSibling;

        toggleDropdown(target, wrapper);
      }

      if (e.target !== e.currentTarget && e.target.id === 'logout') {
        window.location.href = './login.html'
      }

      if (e.target !== e.currentTarget && e.target.id === 'user-order-history') {
        window.location.href = './user-order-history.html'
      }

      e.stopPropagation();
    }, false);
  }

  // if (cardGroup) cardGroup.addEventListener('click', function (e) {
  //   if (e.target !== e.currentTarget && (e.target.id === 'edit-meal' || e.target.id === 'delete-meal')) {
  //     showModal(e, mealModal);
  //   }

  //   e.stopPropagation();
  // }, false);

  if (modal) modal.addEventListener('click', function (e) {
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

  function toggleDropdown(target, wrapper) {
    target.style.color = 'white';
    wrapper.classList.toggle('show');
    target.style.color = '';
  }

  function showModal(e, type) {
    type.classList.toggle('show');

    if (e.target.id === 'add-meal-btn') {
      mealForm('add');
    }

    if (e.target.id === 'edit-meal') {
      mealForm('edit');
    }

    if (e.target.id === 'delete-meal') {
      confirmDeleteModal();
    }

    if (e.target.id === 'checkout') {
      setTimeout(() => {
        window.location.href = './user-menu.html';
      }, 3000);
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
    const addBtn = `<button class="btn btn-pri btn-block" type="submit">Add</button>`;
    const editBtn = `<button class="btn btn-pri btn-block" type="submit">Save</button>`;
    const form = `
    <form action="./meals.html" method="post" id="meal-form">
      <div class="form-input">
        <label for="#name">Meal Name</label>
        <input type="text" required id="name" name="name" value="${type === 'add' ? '' : 'Jollof Rice Meal'}" onkeyup="this.setAttribute('value', this.value);" />
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
        <input type="text" required id="price" name="price" value="${type === 'add' ? '' : 2100}" onkeyup="this.setAttribute('value', this.value);" />
      </div>
  
      <div class="form-input">
        <label for="#description">Description</label>
        <br/>
        <textarea rows="5" required id="description" name="description">${mealDesc}</textarea>
      </div>
  
      <div class="form-input-checkbox">
        <input type="checkbox" id="checkbox" name="checkbox">
        <label for="#checkbox">Suitable for Vegetarians</label>
      </div>
        ${type === 'add' ? addBtn : editBtn}
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

  function redirect(where) {
    window.location.href = where;
  }

  function confirmDeleteModal() {
    const content = `<div class="delete-meal">
    <p>Are You Sure?</p>
    <div class="confirm-delete-btns">
      <button class="btn btn-sec" onclick="redirect('./meals.html')">No</button>
      <button class="btn btn-sec-danger" onclick="redirect('./meals.html')">Yes</button>
    </div>
  </div>
  `;
    modalTitle.innerText = 'Delete Meal';
    modalBody.innerHTML = content;
  }
}