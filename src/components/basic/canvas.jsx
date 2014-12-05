/**
 * @jsx React.DOM
 */

var React = require('react/addons');

var Canvas = React.createClass({
    getDefaultProps: function() {
        return {
            style: {
                style: {
                    width: 400,
                    height: 400,
                    backgroundColor: 'lightgrey'
                }
            }
        };
    },
    render() {
        return (
            <div {...this.props.style}>
                {this.props.children}
            </div>
        );
    }

});

module.exports = Canvas;