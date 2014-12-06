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
var uidata = require('./../js/uidata.js');

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
    // TODO - handle the case where the changed props was not in the initial list of props but in propTypes of the component
    handlePropChange: function(e) {
        if(typeof this.props.onPropsChange === 'function') {
            var propsObj = this.props.selectedComponent.props;
            if(this.props.selectedComponent.name && uidata[this.props.selectedComponent.name].comp.propTypes) {
                propsObj = uidata[this.props.selectedComponent.name].comp.propTypes;
            }

            var newProps = _.reduce(propsObj, function(acc, propValue, propName) {
                if(propValue == React.PropTypes.func) {
                    acc[propName] = new Function(this.refs['prop'+propName].getDOMNode().value);
                    // acc[propName] = eval(this.refs['prop'+propName].getDOMNode().value);
                } else {
                    acc[propName] = JSON.parse(this.refs['prop'+propName].getDOMNode().value);
                }
                return acc;
            }, {}, this);

            this.props.onPropsChange(newProps);
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

// TODO - instead use the components propTypes property to know all the supported properties
// filter out the properties which talk about functions. or Not?
        // the properties tab
        var propDivIndex = 0;
        var properties = '';
        if(this.props.selectedComponent.name) {
            if(uidata[this.props.selectedComponent.name].comp.propTypes) {
                properties = _.map(uidata[this.props.selectedComponent.name].comp.propTypes, function(value, key) {
                    propDivIndex++;
                    var propValue = this.props.selectedComponent.props[key] || '';
                    var propName = key;
                    var propType = 'indeterminate';

                    switch(value) {
                        case React.PropTypes.func:
                            propType = 'function';
                            // IMPORTANT - tricky business allowing people to input functions as strings.
                            var functionString = propValue.toString();
                            propValue = functionString.substring(functionString.indexOf("{") + 1, functionString.lastIndexOf("}"));
                            break;
                        case React.PropTypes.string:
                            propType = 'string';
                            break;
                        case React.PropTypes.string.isRequired:
                            propType = 'string, required';
                            break;
                        case React.PropTypes.array:
                            propType = 'array';
                            break;
                        case React.PropTypes.bool:
                            propType = 'boolean';
                            break;
                        default:
                            propType = 'indeterminate';
                    }

                    return (
                        <div key={'prop_div_'+propDivIndex}>
                            <label>{propName+' ( ' + propType + ' ): '}</label>
                            <input 
                                style={{width: 500}}
                                value={propType!=='function' ? JSON.stringify(propValue) : propValue}
                                ref={'prop'+propName}
                                onChange={this.handlePropChange}
                                ></input>
                        </div>
                    );

                }, this);
            } else { // for components who have not defined proptypes
                var properties = _.map(this.props.selectedComponent.props, function(propValue, propName) {
                    propDivIndex++;
                    return (
                        <div key={'prop_div_'+propDivIndex}>
                            <label>{propName+': '}</label>
                            <input 
                                style={{width: 500}}
                                value={JSON.stringify(propValue)}
                                ref={'prop'+propName}
                                onChange={this.handlePropChange}
                                ></input>
                        </div>
                    );
                }, this);
            }
        }


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
                <div className="right-container-top" style={{minHeight:200}}>
                    All component editable properties come here
                    <Tabs
                        onSelect={this.handleTopMenuSelected}
                        selectedIndex={0}
                    >
                        <TabList>
                            <Tab>Properties</Tab>
                            <Tab>Styles</Tab>
                        </TabList>
                        <TabPanel>
                            Properties supported by the selected component
                            {properties}
                        </TabPanel>
                        <TabPanel>
                            {supportedStyles}
                        </TabPanel>
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