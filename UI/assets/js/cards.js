const cardInfo = [
  {
    img: 'http://www.preciouscore.com/wp-content/uploads/2017/11/How-to-cook-jollof-rice-in-the-oven-750x500.jpg',
    title: 'Jollof Rice Meal',
    desc: 'Jollof Rice, Beef and Plantain. 2 pieces of beef per plate',
    price: 1500
  },
  {
    img: 'https://images.unsplash.com/photo-1503764654157-72d979d9af2f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=71cdddf5cc615224cf2c26614d20154d&auto=format&fit=crop&w=1053&q=80',
    title: 'Revenge Body Spag',
    desc: 'Meal consists of Spaghetti, Vegetable Salad and Shredded smoked chicken',
    price: 2200
  },
  {
    img: 'https://static.pulse.ng/img/incoming/origs7167742/5270485143-w980-h640/Pounded-yam-and-Egusi-soup.jpg',
    title: 'Pounded Yam and Egusi',
    desc: 'Meal contains 2 pieces of beef or one piece of chicken',
    price: 2500
  },
  {
    img: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
    title: 'Vegetable Sharwama and Guava Smoothie',
    desc: 'Sharwama contains no animal products, perfect for dieters',
    price: 1200
  },
  {
    img: 'http://sisijemimah.com/wp-content/uploads/2015/08/IMG_8335.jpg',
    title: 'Ewa Agoyin, Plantain and Local Fish',
    desc: '',
    price: 1500
  },
  {
    img: 'http://www.gratednutmeg.com/wp-content/uploads/2015/03/DSC_07722.jpg',
    title: 'Adalu (Beans and Corn) and Local Fish',
    desc: '',
    price: 1800
  },
  {
    img: 'http://www.kalakutahgrills.com/wp-content/uploads/2017/02/my-pics-group-3-007.jpg',
    title: 'Eba and Ogbono Soup',
    desc: 'Meals also contains Meat/Fish',
    price: 2000
  },
  {
    img: 'https://i0.wp.com/www.eatingnigerian.com/wp-content/uploads/2016/08/Yam-and-Plantain-Pottage-21.jpg',
    title: 'Yam and Plantain Pottage',
    desc: '',
    price: 1200
  },
  {
    img: 'https://lagosmums.com/wp-content/uploads/2015/06/Jollof-Spaghetti.jpeg',
    title: 'Jollof Spaghetti, Plantain and Turkey',
    desc: '',
    price: 3000
  },
  {
    img: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Pancakes and Kiwi Smoothie',
    desc: '',
    price: 2200
  }
];

const menuMealCards = cardInfo.map(card =>
  `<div class="meal-card no-content" id="meal-card">
    <div class="meal-card-header">
      <img src="${card.img}" alt="meal">
      <div class="menu-card-title">
        <p>${card.title}</p>
      </div>
    </div>
    <div class="meal-card-body">
      <div>
        <h3>&#8358; ${card.price}</h3>
        <p>${card.desc}</p>
      </div>
    </div>
  </div>`
);

const catererMealCards = cardInfo.map(card =>
  `<div class="meal-card no-content" id="meal-card">
    <div class="meal-card-header">
      <img src="${card.img}" alt="meal">
      <!-- <div class="dropdown card-dropdown">
        <a href="#" id="dropdown-toggler" class="dropdown-menu">&hellip;</a>
        <div class="dropdown-content" data-dropdown="" id="dropdown-content">
          <a href="#add-edit-modal" id="edit-meal" >Edit</a>
          <a href="#add-edit-modal" id="delete-meal">Delete</a>
        </div>
      </div>-->
      <div class="menu-card-title">
        <p>${card.title}</p>
      </div>
    </div>
    <div class="meal-card-body">
      <div>
        <h3>&#8358; ${card.price}</h3>
        <p>${card.desc}</p>
      </div>
      <div class="action-btns">
        <button class="btn btn-sec" id="edit-meal">Edit</button>
        <button class="btn btn-sec-danger" id="delete-meal">Delete</button>
      </div>
    </div>
  </div>`
);

const userMealCards = cardInfo.map(card =>
  `<div class="meal-card no-content" id="meal-card">
    <div class="meal-card-header">
      <img src="${card.img}" alt="meal">
      <div class="menu-card-title">
        <p>${card.title}</p>
      </div>
    </div>
    <div class="meal-card-body">
      <div>
        <h3>&#8358; ${card.price}</h3>
        <p>${card.desc}</p>
      </div>
      <div class="meal-card-action">
        <button class="btn btn-sec meal-card-btn">Click to Order</button>
      </div>
    </div>
  </div>`
);

$('.caterer-meals #card-group').html(catererMealCards);
$('.menu-meals #card-group').html(menuMealCards);
$('.user-meals #card-group').html(userMealCards);

$('.meal-card').on('click', '.meal-card-header', function() {
  $(this).parent().toggleClass('no-content');
  $(this).next('.meal-card-body').toggle(250, 'linear');
  $(this).find('#edit-meal').on('click', function(e) {
    console.log('tyay');
    return showModal(e, mealModal);
  })
});

// if (e.target !== e.currentTarget && (e.target.id === 'edit-meal' || e.target.id === 'delete-meal')) {
//   showModal(e, mealModal);
// }
