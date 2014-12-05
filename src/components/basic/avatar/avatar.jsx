/**
 * @jsx React.DOM
 */

var React = require('react/addons');
require('./avatar.css');

var Avatar = React.createClass({

	render: function() {
		return (
			<div className="avatar">
		        <img className="avatar-image" alt="" src={this.props.src} />
		    </div>
		);
	}

});

module.exports = Avatar;