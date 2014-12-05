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
    getDefaultProps: () => { componentList: {} },
    handleStyleChange: function(e) {
        var newStyle = {
            width: parseInt(this.refs.styleWidth.getDOMNode().value, 10),
            height: parseInt(this.refs.styleHeight.getDOMNode().value, 10)
        };

        typeof this.props.onStyleChange === 'function' && this.props.onStyleChange(newStyle);
    },
    handleStyleChange: function(e) {
        var newStyle = {
            width: parseInt(this.refs.styleWidth.getDOMNode().value, 10),
            height: parseInt(this.refs.styleHeight.getDOMNode().value, 10)
        };

        typeof this.props.onStyleChange === 'function' && this.props.onStyleChange(newStyle);
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
        var tabPanelIndex = 0;
        var componentViews = _.map(this.props.componentList, function(componentItems, componentType) {
            tabPanelIndex++;
            return (
                <TabPanel
                    key={'tab_panel_no_'+tabPanelIndex}>
                    <Menu
                        key={"component_menu_"+Math.random()}
                        items={componentItems}
                    />
                </TabPanel>
            );
        });

        var tabIndex = 0;
        var tabs = _.map(this.props.componentList, function(componentItems, componentType) {
            tabIndex++;
            return (
                <Tab
                    key={'tab_no_'+tabIndex}
                    >
                    {componentType.charAt(0).toUpperCase()+_.rest(componentType).join('')}
                </Tab>
            );
        }); //.toJS();

        var styleInputStyle ={
            width: 50
        };

        return (
            <div style={style} className="pure-u-7-24 right-container">
                <div className="right-container-top" style={{height:"300px"}}>
                    All component editable properties come here
                    <Tabs
                        onSelect={this.handleTopMenuSelected}
                        selectedIndex={0}
                    >
                        <TabList>
                            <Tab>Styles</Tab>
                            <Tab>Properties</Tab>
                        </TabList>
                        <TabPanel>
                            <label>Width: </label>
                            <input 
                                style={styleInputStyle} 
                                ref='styleWidth'
                                onChange={this.handleStyleChange}
                                ></input>
                            <label>Height: </label>
                            <input 
                                style={styleInputStyle} 
                                ref='styleHeight'
                                onChange={this.handleStyleChange}
                                ></input>
                        </TabPanel>
                        <TabPanel>Properties like id, classname etc.</TabPanel>
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