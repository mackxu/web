import './main.scss';
import sub from './sub';
import $ from 'jquery';
import moment from 'moment';

var app = document.createElement('div');
app.innerHTML = '<h1>BBB Hello World!</h1>'
document.body.appendChild(app);
document.body.appendChild(sub());


$('body').append('<p>look at me!!! now is ' + moment().format() + '</p>');