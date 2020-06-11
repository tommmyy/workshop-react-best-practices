/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Avatar extends Component {
	static propTypes = {
		children: PropTypes.node,
		size: PropTypes.number,
	};

	static defaultProps = { size: 32 };

	constructor(props, context) {
		super(props, context);
	}

	render() {
		const { children, size } = this.props;

		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: '1000px',
					height: `${size}px`,
					width: `${size}px`,
					backgroundColor: '#aabafa',
					color: '#333333',
					fontWeight: 'bold',
				}}
			>
				{children}
			</div>
		);
	}
}

const Exercise = () => <Avatar>TK</Avatar>;

export default Exercise;
