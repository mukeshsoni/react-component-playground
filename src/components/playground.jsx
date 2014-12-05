/**
 * @jsx React.DOM
 */

// var Immutable = require('immutable');
var _ = require('lodash');
var React = require('react');
var Immutable = require('immutable');
var emptyFunction = require('react/lib/emptyFunction');
var ItemTypes = require('./../js/itemtypes.js');
var { DragDropMixin } = require('react-dnd');

var uidata = require('./../js/uidata.js');
var DragTarget = require('./helpers/dragtarget.jsx');

var Playground = React.createClass({
    mixins: [DragDropMixin],
    getDefaultProps: function() {
        return {
            onItemDropWithOtheComponent: emptyFunction,
            onCloseClick: emptyFunction,
            selectedItemIndex: -1
        };
    },
    getInitialState: function() {
        return {
            hideSourceOnDrag: false 
        };
    },
    componentDidMount: function() {
        window.addEventListener('keydown', this.handleKeyDown);
    },
    handleKeyDown: function(e) {
        switch(e.which) {
            case 8: // backspace
            case 127: // delete
                e.preventDefault();
                this.handleComponentRemoveClick(this.state.selectedItemIndex);
                break;
            default:
                // do nothing
        }
    },
    componentWillUnmount: function() {
        window.removeEventListener('keydown', this.handleKeyDown);
    },
    configureDragDrop(registerType) {
        registerType(ItemTypes.ITEM, {
            dropTarget: {
                acceptDrop(item, e) {
                    var data = this.props.cursor.get(['data']);

                    data.update(function(oldValue) {
                        return oldValue.push(Immutable.fromJS({
                            name: item.name,
                            position: {
                                left: e.clientX,
                                top: e.clientY
                            },
                            props: {}
                        }));
                    });
                }
            }
        });

        registerType(ItemTypes.BOX, {
            dropTarget: {
                acceptDrop(item, e) {
                    console.log('item dropped: ', item);
                    var left = Math.round(item.startLeft + (e.pageX - item.startPageX)),    
                        top = Math.round(item.startTop + (e.pageY - item.startPageY));

                    this.moveBox(item.id, left, top);
                }
            }
        });
    },
    moveBox(id, left, top) {
        var data = this.props.cursor.get(['data']);
        var position = data.getIn([id, 'position']);
        position.update(function(oldValue) {
            return oldValue.set('left', left).set('top', top);
        });
    },
    handleComponentRemoveClick: function(index) {
        this.props.cursor.get('data').update(function(oldValue) {
            return oldValue.splice(index, 1);
        });
    },
    selectItem: function(index) {
        this.setState({
            selectedItemIndex: index
        });
    },
    render() {
        var playgroundStyle = {
            padding: 36,
            minHeight: 700,
            overflowY: 'auto',
            border: '1px dotted red',
            backgroundColor: '#fff',
            position: 'relative'
        };

        var dropState = this.getDropState(ItemTypes.ITEM);

        if (dropState.isHovering) {
            playgroundStyle.backgroundColor = 'darkgreen';
        } else if (dropState.isDragging) {
            playgroundStyle.backgroundColor = 'darkkhaki';
        }

        var components = this.props.cursor.get('data').toJS();
        var dragTargets = components.map(function(component, index) {
            var ui = React.createElement(uidata[component.name].comp, uidata[component.name].props || component.props || {});
            return (
                <DragTarget
                    selected={this.state.selectedItemIndex===index}
                    onComponentClick={this.selectItem}
                    previewMode={this.props.previewMode}
                    id={index}
                    hideSourceOnDrag={this.state.hideSourceOnDrag}
                    onCloseClick={this.handleComponentRemoveClick}
                    key={'drop_target_'+index}
                    top={component.position.top}
                    left={component.position.left}>
                    <div>
                        {ui}
                    </div>
                </DragTarget>
            )
        }, this);

        return (
            <div 
                {...this.dropTargetFor(ItemTypes.ITEM, ItemTypes.BOX)}
                className="pure-u-15-24 playground"
                style={playgroundStyle}
            >
                {dragTargets}
            </div>
        );
    }
});

module.exports = Playground;