/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('lodash');
// var ReactStyle = require('react-style');
// require('./../../styles/right-container.css');
// require('./../../../node_modules/react-tabs/lib/styles.css');
// react tabs
// var ReactTabs    = require('react-tabs');
// var Tabs = ReactTabs.Tabs;
// var Tab = ReactTabs.Tab;
// var TabPanel = ReactTabs.TabPanel;
// var TabList = ReactTabs.TabList;

// var Menu = require('./basic/menu.js');

var RightContainer = React.createClass({
    handleDragEnd: function (event) { 
        this.props.handleDragEnd && this.props.handleDragEnd(event);
    },
    render: function() {
        var index = 0;
        var self = this;

        return (
            <div className="pure-u-7-24 right-container">
                Right container
            </div>
        );
    }

});

module.exports = RightContainer;