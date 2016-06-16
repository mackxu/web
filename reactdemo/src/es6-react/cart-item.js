'use strict';

import React, { Component, PropTypes } from 'react';

class CartItem extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		initialQty: PropTypes.number,
	};

	static defaultProps = {
		title: 'Undefined Product',
		price: 100,
		initialQty: 0,
	};

	state = {
		qty: this.props.initialQty,
		total: 0,
	};

	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.recalculateTotal();
	}
	recalculateTotal = () => {
		this.setState({total: this.state.qty * this.props.price });
	};
	increaseQty = () => {
		this.setState({
			qty: this.state.qty + 1
		}, this.recalculateTotal);
	};
	decreaseQty = () => {
		this.setState({
			qty: this.state.qty - 1
		}, this.recalculateTotal);
	};

	render() {
		return (
			<article className="row large-4">
				<figure className="text-center">
					<p><img src={this.props.image} /></p>
					<figcaption>
						<h2>{this.props.title}</h2>
					</figcaption>
				</figure>
				<p className="large-4 column"><strong>Quantity: {this.state.qty}</strong></p>
				<p className="large-4 column">
					<button onClick={this.increaseQty} className="button success">+</button>
					<button onClick={this.decreaseQty} className="button alert">-</button>
				</p>
				<p className="large-4 column"><strong>Price per item: ${this.props.price}</strong></p>
				<h3 className="large-12 column text-center">
					Total: ${this.state.total}
				</h3>
			</article>
		);
	}
}

export default CartItem;