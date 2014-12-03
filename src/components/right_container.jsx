/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('lodash');
// var ReactStyle = require('react-style');
// require('./../../styles/right-container.css');
// require('./../../../node_modules/react-tabs/lib/styles.css');
// react tabs
var ReactTabs    = require('react-tabs');
var Tabs = ReactTabs.Tabs;
var Tab = ReactTabs.Tab;
var TabPanel = ReactTabs.TabPanel;
var TabList = ReactTabs.TabList;

var Menu = require('./menu.jsx');

var RightContainer = React.createClass({
    handleDragEnd: function (event) { 
        this.props.handleDragEnd && this.props.handleDragEnd(event);
    },
    render: function() {
        var index = 0;
        var self = this;
        var style = {
            padding: 20,
            minHeight: 700,
            borderLeft: '2px dotted tomato'
        };

        // how the below code would have worked if our component understood just Immutables
        var componentViews = this.props.componentList.map(function(componentItems, componentType) {

            return (
                <TabPanel>
                    <Menu
                        key={"component_menu_"+Math.random()}
                        items={componentItems.toJS()}
                        onItemDragStart={self.handleDragStart}
                        handleDragEnd={self.handleDragEnd}
                    />
                </TabPanel>
            );
        }); //.toJS();

        var tabs = this.props.componentList.map(function(componentItems, componentType) {
            return (
                <Tab>{componentType.charAt(0).toUpperCase()+_.rest(componentType).join('')}</Tab>
            );
        }); //.toJS();

        return (
            <div style={style} className="pure-u-7-24 right-container">
                Right container 2
            </div>
        );
    }

});

module.exports = RightContainer;