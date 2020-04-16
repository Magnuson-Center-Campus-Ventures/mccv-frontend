// change require to es6 import style
import $ from 'jquery';

$('#main').html('Here we go!');
let num = 0;
setInterval(() => {
    num = num + 1;
    $('#main').text(`You've been on this page for ${num} seconds`);
}, 1000);