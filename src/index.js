// change require to es6 import style
import $ from 'jquery';
import './style.scss';

$('#main').html('Here we go!');
let num = 0;
setInterval(() => {
  num += 1;
  $('#main').text(`You've been on this page for ${num} seconds`);
}, 1000);
