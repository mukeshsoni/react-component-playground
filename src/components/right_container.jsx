/**
 * @jsx React.DOM
 */

var React = require('react');
var _ = require('lodash');
// var ReactStyle = require('react-style');
// require('./../../styles/right-container.css');
require('./../../node_modules/react-tabs/lib/styles.css');
// react tabs
var ReactTabs    = require('react-tabs');
var Tabs = ReactTabs.Tabs;
var Tab = ReactTabs.Tab;
var TabPanel = ReactTabs.TabPanel;
var TabList = ReactTabs.TabList;

var Menu = require('./menu.jsx');

var RightContainer = React.createClass({
    handleDragStart: (item) => this.props.onItemDragStart(item),
    getDefaultProps: () => { componentList: {} },
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
        var componentViews = _.map(this.props.componentList, function(componentItems, componentType) {
            return (
                <TabPanel>
                    <Menu
                        key={"component_menu_"+Math.random()}
                        items={componentItems}
                        onItemDragStart={self.handleDragStart}
                        handleDragEnd={self.handleDragEnd}
                    />
                </TabPanel>
            );
        });

        var tabs = _.map(this.props.componentList, function(componentItems, componentType) {
            return (
                <Tab>{componentType.charAt(0).toUpperCase()+_.rest(componentType).join('')}</Tab>
            );
        }); //.toJS();

        return (
            <div style={style} className="pure-u-7-24 right-container">
                <div className="right-container-top" style={{height:"300px"}}>
                    All component editable properties come here
                    <Tabs
                        onSelect={this.handleTopMenuSelected}
                        selectedIndex={0}
                    >
                        <TabList>
                            <Tab>Properties</Tab>
                            <Tab>Styles</Tab>
                        </TabList>
                        <TabPanel>Properties like id, classname etc.</TabPanel>
                        <TabPanel>Styles like css styles like color, width, height etc.</TabPanel>
                    </Tabs>
                </div>
                <hr/>
                <Tabs
                onSelect={this.handleSelected}
                selectedIndex={0}>
                    <TabList>
                        {tabs}
                    </TabList>
                    {componentViews}
                </Tabs>
                {componentViews}
            </div>
        );
    }

});

module.exports = RightContainer;