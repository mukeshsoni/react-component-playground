/**
 * @jsx React.DOM
 */

var _ = require('lodash');
var React = require('react/addons');

var Canvas = React.createClass({
    render() {
        var style = _.merge({
                    width: 400,
                    height: 400,
                    backgroundColor: 'lightgrey'
                }, this.props.style);

        return (
            <div style={style}>
                {this.props.children}
            </div>
        );
    }

});

module.exports = Canvas;