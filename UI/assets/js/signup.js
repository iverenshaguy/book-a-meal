const params = (new URL(document.location)).searchParams;
const role = params.get('role');

if (role === 'caterer') {
  document.querySelector('h2').innerText = 'Start Serving Your Customers';
  document.getElementById('one').classList.add('hide');
  document.getElementById('two').classList.remove('hide');
}