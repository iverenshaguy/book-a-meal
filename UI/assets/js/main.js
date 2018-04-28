window.onload = function () {
  const cardGroup = document.getElementById('card-group');
  const addMealModalBtn = document.getElementById('add-meal-btn');
  const modal = document.getElementsByClassName('modal')[0];
  const mealCardBtns = document.getElementsByClassName('meal-card-btn');
  const mealModal = document.getElementById('meal-modal');
  const notifModal = document.getElementById('notif-modal');
  const orderDetailsModal = document.getElementById('order-details-modal');
  const modalTitle = document.getElementById('modal-title-h3');
  const modalBody = document.getElementsByClassName('modal-body')[0];
  const menuModalBtn = document.getElementById('menu-modal-btn');
  const backBtn = document.getElementById('back-btn');
  const menuModal = document.getElementById('menu-modal');
  const dropdowns = document.getElementsByClassName('dropdown');
  const checkoutBtn = document.getElementById('checkout');
  const contentWithModal = document.getElementById('has-modal');
  const adminOrderHistoryPill = document.getElementsByClassName('admin-order-history-pill');

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
  if (backBtn) backBtn.onclick = () => redirect('./user-menu.html');

  if (checkoutBtn) checkoutBtn.onclick = e => {
    showModal(e, notifModal)
  };

  if (mealCardBtns.length) for (let i = 0; i < mealCardBtns.length; i++) {
    mealCardBtns[i].addEventListener('click', function (e) {
      if (e.target === e.currentTarget) {
        redirect('./order-confirmation.html');
      }
    });
  }

  if (adminOrderHistoryPill) for (let i = 0; i < adminOrderHistoryPill.length; i++) {
    adminOrderHistoryPill[i].addEventListener('click', function (e) {
      showModal(e, orderDetailsModal);
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
      closeModal(e);
    }

    if (e.target !== e.currentTarget && (e.target.id === 'confirm-delete-yes' ||
      e.target.id === 'confirm-delete-no')) {
      redirect('./meals.html')
    }

    if (e.target !== e.currentTarget && e.target.id === 'input-image') {
      e.target.onchange = changeImage;
    }

    if (e.target !== e.currentTarget && (e.target.id === 'img-overlay'
      || e.target.id === 'form-image-preview'
      || e.target.id === 'overlay-p')) {
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
    if (contentWithModal) contentWithModal.style.position= 'fixed';
    window.scroll({ top: 0, left: 0, behavior: 'smooth'});

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
    contentWithModal.style.position = 'relative';

    if (e.target !== e.currentTarget && e.target.id === 'modal-close-icon') {
      e.target.closest('.modal').classList.remove('show');
    }

    e.stopPropagation();
  }

  function mealForm(type) {
    const mealDesc = type === 'add' ? '' : 'Meal Combination of Jollof Rice, Salad, Plantain and Chicken, with a bottle of pet coke';
    const addBtn = `<button class="btn btn-pri btn-block" type="submit">Add</button>`;
    const editBtn = `<button class="btn btn-pri btn-block" type="submit">Save</button>`;
    const form = `
    <form action="./meals.html" id="meal-form">
      <div class="form-input">
        <label for="name">Meal Name</label>
        <input type="text" required id="name" name="name" value="${type === 'add' ? '' : 'Jollof Rice Meal'}" onkeyup="this.setAttribute('value', this.value);" />
      </div>

      <div class="form-input form-img-input" id="form-image-preview">
        <div class="img-overlay" id="img-overlay"><p id="overlay-p">Please Select an Image</p></div>
        <input type="file" id="input-image" accept="image/*" name="image" />
        <img
          src="${type === 'add' ?
        './assets/img/placeholder-image.jpg' :
        './assets/img/meal-image.JPG'}"
          alt="meal-image"
          id="meal-form-image"
        />
      </div>

      <div class="form-input">
        <label for="price">Price</label>
        <input type="text" required id="price" name="price" value="${type === 'add' ? '' : 2100}" onkeyup="this.setAttribute('value', this.value);" />
      </div>
  
      <div class="form-input">
        <label for="description">Description</label>
        <br/>
        <textarea rows="5" required id="description" name="description">${mealDesc}</textarea>
      </div>
  
      <div class="form-input-checkbox">
        <input type="checkbox" id="checkbox" name="checkbox">
        <label for="checkbox">Suitable for Vegetarians</label>
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
    <div class="confirm-delete-btns control-btns">
      <button class="btn btn-sec" id="confirm-delete-no">No</button>
      <button class="btn btn-sec-danger" id="confirm-delete-yes">Yes</button>
    </div>
  </div>
  `;
    modalTitle.innerText = 'Delete Meal';
    modalBody.innerHTML = content;
  }
}