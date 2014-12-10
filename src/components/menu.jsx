/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var ItemTypes = require('./../js/itemtypes.js');
var MenuItem = require('./basic/menuitem.jsx');

var Menu = React.createClass({
    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.string),
        selectedItem: React.PropTypes.string
    },
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
        var menuItems = this.props.items.map(function(item, index) {
            return (
                <MenuItem 
                    key={'menu_item_no' + index}
                    selected={this.props.selectedItem===item}
                    item={item}
                    />
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