/**
 * @jsx React.DOM
 */

var React = require('react/addons');
require('./avatar.css');

var Avatar = React.createClass({

	render: function() {
        var style = _.merge({}, this.props.style);

		return (
			<div className='avatar' style={style}>
		        <img className='avatar-image' style={style} alt={this.props.altText || ''} src={this.props.src} />
		    </div>
		);
	}

});

module.exports = Avatar;