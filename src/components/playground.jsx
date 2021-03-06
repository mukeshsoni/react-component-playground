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
var PubSub = require('pubsub-js');
var shortId = require('shortid');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var uidata = require('./../js/uidata.js');
var DragTarget = require('./helpers/dragtarget.jsx');

var lastZIndex = 0;
var Playground = React.createClass({
    mixins: [DragDropMixin],
    getDefaultProps: function() {
        return {
            onItemDropWithOtheComponent: emptyFunction,
            onCloseClick: emptyFunction
        };
    },
    getInitialState: function() {
        return {
            hideSourceOnDrag: true
        };
    },
    componentDidMount: function() {
        // TODO - this listens on backspace everywhere. even in input fields. not happening
        // window.addEventListener('keydown', this.handleKeyDown);
    },
    handleKeyDown: function(e) {
        switch(e.which) {
            case 8: // backspace
            case 127: // delete
                e.preventDefault();
                var selectedComponentIndex = this.props.selectedComponentIndex;
                this.handleComponentRemoveClick(selectedComponentIndex);
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
                            id: shortId.generate(),
                            name: item.name,
                            position: {
                                left: e.clientX,
                                top: e.clientY,
                                zIndex: data.count()
                            },
                            props: _.extend({}, uidata[item.name].props, {className: shortId.generate()}),
                            supportedStyles: uidata[item.name].supportedStyles,
                        }));
                    });

                    PubSub.publish('history', 'Item Added: ' + item.name);
                },
            }
        });

        registerType(ItemTypes.BOX, {
            dropTarget: {
                acceptDrop(item, e) {
                    var left = Math.round(item.startLeft + (e.pageX - item.startPageX)),    
                        top = Math.round(item.startTop + (e.pageY - item.startPageY));

                    if (this.props.snapToGrid) {
                        left = Math.round(left / 32) * 32;
                        top = Math.round(top / 32) * 32;
                    }

                    // if(left < 0) left = 0;
                    // if(top < 0) top = 0;

                    // if(left + item.width > e.target.offsetWidth) {
                    //     left = e.target.offsetWidth - item.width;
                    // }

                    // if(top + item.height > e.target.offsetHeight) {
                    //     height = e.target.offsetHeight - item.height
                    // }
                    
                    this.moveBox(item.id, left, top);
                },
            }
        });
    },
    moveBox(id, left, top) {
        var data = this.props.cursor.get('data');
        var position = data.getIn([id, 'position']);
        position.update(function(oldValue) {
            return oldValue.set('left', left).set('top', top);
        });

        PubSub.publish('history', 'Item Moved: ' + data.getIn([id, 'name']));
    },
    handleComponentRemoveClick: function(index) {
        this.props.cursor.get(['data']).update(function(oldValue) {
            return oldValue.splice(index, 1);
        });

        PubSub.publish('history', 'Item Removed: ' + this.props.cursor.getIn(['data', index, 'name']));
    },
    selectItem: function(index) {
        typeof this.props.onItemSelected === 'function' && this.props.onItemSelected(index);
    },
    render: function() {
        var playgroundStyle = {
            margin: 10,
            padding: 36,
            minHeight: 650,
            overflowY: 'hidden',
            backgroundColor: 'white',
            position: 'relative',
            boxShadow: '0 0 10px #bebebe',
            textAlign: 'center'
        };

        var dropState = this.getDropState(ItemTypes.ITEM);

        if (dropState.isHovering) {
            playgroundStyle.backgroundColor = 'darkseagreen';
        } else if (dropState.isDragging) {
            playgroundStyle.backgroundColor = 'darkkhaki';
        }

        var selectedComponentIndex = this.props.selectedComponentIndex;
        var components = this.props.cursor.get('data').toJS();

        var dragTargets = components.map(function(component, index) {
            var ui = React.createElement(uidata[component.name].comp, component.props || {});

            return (
                <DragTarget
                    selected={selectedComponentIndex===index}
                    onComponentClick={this.selectItem}
                    previewMode={this.props.previewMode}
                    id={index}
                    zIndex={index}
                    hideSourceOnDrag={this.state.hideSourceOnDrag}
                    onCloseClick={this.handleComponentRemoveClick}
                    key={'drop_target_'+index}
                    position={component.position}
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
                {dragTargets.length === 0 ? 
                        <span style={{display: 'block', marginTop: 300, fontSize: 24}}>Drop Components From Right Panel</span> 
                        : ''}
                {dragTargets}
            </div>
        );
    }
});

module.exports = Playground;