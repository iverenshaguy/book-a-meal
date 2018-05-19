// const params = (new URL(document.location)).searchParams;
// const role = params.get('role');

// if (role === 'caterer') {
//   document.querySelector('h2').innerText = 'Serve Your Customers Again';
//   document.getElementById('one').classList.add('hide');
//   document.getElementById('two').classList.remove('hide');
// }

$('form').on('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-password').value;

  // console.log(email);

  if (email === 'food@circle.com') {
    console.log(email);
    window.location.href = './dashboard.html';
  } else {
    window.location.href = './user-menu.html';
  }
});