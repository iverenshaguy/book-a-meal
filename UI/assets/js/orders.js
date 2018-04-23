const params = (new URL(document.location)).searchParams;
const num = params.get('num');

if (num === 'two') {
  document.getElementById('two').classList.remove('hide');
  document.getElementById('one').classList.add('hide');
  document.getElementById('three').classList.add('hide');
} else if (num === 'three') {
  document.getElementById('three').classList.remove('hide');
  document.getElementById('two').classList.add('hide');
  document.getElementById('one').classList.add('hide');
} else {
  document.getElementById('one').classList.remove('hide');
  document.getElementById('two').classList.add('hide');
  document.getElementById('three').classList.add('hide');
}