'use strict';

import React, { Component } from 'react';

/**
 * Higher-Order Component instead of Mixins
 * class extends Component
 * @param  {component} ComposedComponent 将要扩展的组件
 * @return {function}                   [description]
 */
let IntervalEnhance = ComposedComponent => class extends Component {

	// Helpful for debugging
	static displayName = 'ComponentEnhancedWithIntervalHOC';

	state = {
		seconds: 0,
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.interval = setInterval(this.tick, 1000);
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}

	tick = () => {
		this.setState({
			seconds: this.state.seconds + 1,
		});
	};

	render() {
		return <ComposedComponent {...this.props} {...this.state} />
	}
}

export default IntervalEnhance;