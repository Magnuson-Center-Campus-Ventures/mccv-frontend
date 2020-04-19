// change require to es6 import style
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

$('#main').html('Here we go!');
let num = 0;
setInterval(() => {
  num += 1;
  $('#main').text(`You've been on this page for ${num} seconds`);
}, 1000);

const App = () => <div className="test">All the REACT belong to us!</div>;
ReactDOM.render(<App />, document.getElementById('main'));
