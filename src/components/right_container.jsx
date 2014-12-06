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
        if(typeof this.props.onStyleChange === 'function') {
            var newStyle = _.reduce(this.props.selectedComponent.supportedStyles, function(acc, supportedStyle) {
                acc[supportedStyle] = this.refs['style'+supportedStyle].getDOMNode().value;
                return acc;
            }, {}, this);

            this.props.onStyleChange(newStyle);
        }
    },
    render: function() {

        var index = 0;
        var self = this;
        var style = {
            padding: 20,
            minHeight: 700,
            borderLeft: '2px dotted tomato'
        };

        // let's fix the style input box
        var styleInputStyle ={
            width: 50
        };
        var styleDivIndex = 0;
        var supportedStyles = _.map(this.props.selectedComponent.supportedStyles, function(supportedStyle) {
            styleDivIndex++;
            return (
                <div style={{display: 'inline-block'}} key={'style_div_'+styleDivIndex}>
                    <label>{supportedStyle+': '}</label>
                    <input 
                        value={this.props.selectedComponent.props.style[supportedStyle]}
                        style={styleInputStyle} 
                        ref={'style'+supportedStyle}
                        onChange={this.handleStyleChange}
                        ></input>
                </div>
            );
        }, this);

        // the tab panels for components to be dragged and dropped
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
                            {supportedStyles}
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