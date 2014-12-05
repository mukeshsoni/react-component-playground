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
        var options = this.props.options.map(function(optionText, index) {
            return (
                <option key={"option_no_"+index}>{optionText}</option>
            );
        })
        return (
            <select
                style={{width: 150}}>
                {options}
            </select>
        );
    }

});

module.exports = Select;