/**
 * @jsx React.DOM
 */

// var Immutable = require('immutable');
var React = require('react');
var emptyFunction = require('react/lib/emptyFunction');
var ItemTypes = require('./../js/itemtypes.js');
var { DragDropMixin } = require('react-dnd');

// var imageURL = './../images/tippytap.jpg';

var UI = require('./../js/uidata.js');
var _ = require('lodash');

var Playground = React.createClass({
    mixins: [DragDropMixin],
    configureDragDrop(registerType) {
        registerType(ItemTypes.ITEM, {
            dropTarget: {
                acceptDrop(item) {
                    console.log('You dropped ' + item.name + '!');
                }
            }
        });
    },
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
        // console.log('ctree: ', this.props.cursor.toJS());
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
            overflowY: 'auto',
            border: '1px dotted red',
            backgroundColor: '#fff'
        };

        var dropState = this.getDropState(ItemTypes.ITEM);

        if (dropState.isHovering) {
            playgroundStyle.backgroundColor = 'darkgreen';
        } else if (dropState.isDragging) {
            playgroundStyle.backgroundColor = 'darkkhaki';
        }

        return (
            <div 
                {...this.dropTargetFor(ItemTypes.ITEM)}
                className="pure-u-15-24 playground"
                style={playgroundStyle}
            >
                <h3>Playground</h3>
            </div>
        );
    }
});

module.exports = Playground;