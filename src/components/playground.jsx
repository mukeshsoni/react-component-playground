/**
 * @jsx React.DOM
 */

// var Immutable = require('immutable');
var React = require('react');
var emptyFunction = require('react/lib/emptyFunction');

// var imageURL = './../images/tippytap.jpg';

var UI = require('./../js/uidata.js');
var _ = require('lodash');

var Playground = React.createClass({
    // ES6 ftw. using function declaration concise representation
    // and arrow functions!
    getDefaultProps: function() {
        return {
            onItemDropWithOtheComponent: emptyFunction,
            onCloseClick: emptyFunction
        };
    },
    handleDropWithOtherComponent: function(e, dropTarget) {
        this.props.onItemDropWithOtheComponent(e, dropTarget);
    },
    handleCloseClick: function(closeTarget) {
        this.props.onCloseClick(closeTarget);
    },
    updateComponentPosition: function(component, event, ui) {
        this.props.updateComponentPosition(component, event, ui);
    },
    setActiveComponent: function(component) {
        this.props.setActiveComponent(component);
    },
    render() {
        // var componentsToShow = getCompiledComponentTree(this.props.componentTree, this.handleDropWithOtherComponent);
        // var componentsToShowNew = getCompiledComponentTreeNew(this.props.cTree, this.handleDropWithOtherComponent, this.handleCloseClick);
        // var componentsToShowNew = getCompiledComponentTreeNew(this.props.cTree, {
        //     onDrop: this.handleDropWithOtherComponent,
        //     previewMode: this.props.previewMode,
        //     updateComponentPosition: this.updateComponentPosition,
        //     setActiveComponent: this.setActiveComponent,
        //     onCloseClick: this.handleCloseClick
        // });
        // .showcase-row {
        //     margin-top: 30px;
        // }
        var playgroundStyle = {
            padding: 36,
            minHeight: 700,
            overflowY: 'auto'
        };

        return (
            <div 
                className="pure-u-15-24 playground"
                style={playgroundStyle}
                onDragOver={this.handleDragOver}
                onDrop={this.handleDrop}
            >
                <h3>Playground</h3>
            </div>
        );
    }
});

module.exports = Playground;