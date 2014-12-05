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

// var imageURL = './../images/tippytap.jpg';

var UI = require('./../js/uidata.js');

var DragTarget = require('./helpers/dragtarget.jsx');

var Playground = React.createClass({
    mixins: [DragDropMixin],
    configureDragDrop(registerType) {
        registerType(ItemTypes.ITEM, {
            dropTarget: {
                acceptDrop(item) {
                    var data = this.props.cursor.get(['data']);

                    data.update(function(oldValue) {
                        return oldValue.push(Immutable.fromJS({
                            name: item.name,
                            position: {
                                left: 0,
                                top: 0
                            },
                            props: {}
                        }));
                    });
                    console.log('You dropped ' + item.name + '!');
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
    // ES6 ftw. using function declaration concise representation
    // and arrow functions!
    getDefaultProps: function() {
        return {
            onItemDropWithOtheComponent: emptyFunction,
            onCloseClick: emptyFunction
        };
    },
    getInitialState: function() {
        return {
            hideSourceOnDrag: false 
        };
    },
    handleComponentRemoveClick: function(index) {
        this.props.cursor.get('data').update(function(oldValue) {
            return oldValue.splice(index, 1);
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
            var ui = React.createElement(UI[component.name].comp, UI[component.name].props || component.props || {});
            return (
                <DragTarget
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