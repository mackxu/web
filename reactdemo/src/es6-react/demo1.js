'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import CartItem from './cart-item';

const order = {
	title: 'Fresh fruits package',
	image: 'http://images.all-free-download.com/images/graphiclarge/citrus_fruit_184416.jpg',
	initialQty: 3,
    price: 8,
};

ReactDom.render(<CartItem {...order} />, document.getElementById('j-container'));