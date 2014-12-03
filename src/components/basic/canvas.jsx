/**
 * @jsx React.DOM
 */

var React = require('react/addons');

var Canvas = React.createClass({

    render() {
        return (
            <div style={{width: "800px", height: "800px", backgroundColor: "lightgrey"}}>
                {this.props.children}
            </div>
        );
    }

});

module.exports = Canvas;