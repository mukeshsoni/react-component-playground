/**
 * @jsx React.DOM
 */

var React = require('react');

var Select = React.createClass({
    getDefaultProps() {
        return {
            options: [
                'All',
                'This',
                'That'      
            ]
        };
    },
    render() {
        var style = _.merge({width: 150}, this.props.style);

        var options = this.props.options.map(function(optionText, index) {
            return (
                <option key={"option_no_"+index}>{optionText}</option>
            );
        })
        return (
            <select
                style={style}>
                {options}
            </select>
        );
    }

});

module.exports = Select;