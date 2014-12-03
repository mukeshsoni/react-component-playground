/**
 * @jsx React.DOM
 */

var React = require('react');
// var ReactStyle = require('react-style');

var Button = React.createClass({
    getInitialState() {
        return {
            active: true
        };
    },
    getDefaultProps() {
        return {
            type: 'button',
            label: 'Press Me',
            isDisabled: false
        };
    },
	render() {
		return (
			<button 
                className="pure-button pure-button-primary"
                type={this.props.type}
                disabled={this.props.isDisabled}>
                {this.props.label ? this.props.label : this.props.children}
            </button>
		);
	}

});

module.exports = Button;