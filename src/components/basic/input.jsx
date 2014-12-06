/**
 * @jsx React.DOM
 */

var React = require('react');

var placeholderText = {
    text: 'Type something...',
    email: 'Email',
    password: 'Password'
};

var Input = React.createClass({
    getDefaultProps() {
        return {
            type: 'text',
            isDisabled: false,
            isReadOnly: false
        };
    },
    render() {
        var style = _.merge({}, this.props.style);

        return (
            <input 
                style={style}
                type={this.props.type} 
                placeholder={placeholderText[this.props.type]}
                disabled={this.props.isDisabled}
                readOnly={this.props.isReadOnly}>
                {this.props.text ? this.props.text : ''}
            </input>
        );
    }
});

module.exports = Input;