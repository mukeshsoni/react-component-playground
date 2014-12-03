/**
 * @jsx React.DOM
 */

var React = require('react/addons');

var Menu = React.createClass({
    getDefaultProps() {
        return {
            items: ["Home", "Flickr", "Messenger", "Sports", "Finance"],
            selectedItem: "Messenger"
        };
    },
    render() {
        var cx = React.addons.classSet;
        var classes = cx({
            "pure-menu": true,
            "pure-menu-open": true,
            "pure-menu-horizontal": this.props.horizontal || !this.props.vertical
        });

        var menuItems = this.props.items.map(function(item) {
            return (
                <li className={this.props.selectedItem===item?"pure-menu-selected":""}>
                    <a href="#">{item}</a>
                </li>
            );
        }, this);

        return (
            <div className={classes}>
                <ul>
                    {menuItems}
                </ul>
            </div>
        );
    }

});

module.exports = Menu;