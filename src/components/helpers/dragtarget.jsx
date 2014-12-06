/** @jsx React.DOM */

var React = require('react/addons');
var emptyFunction = require('react/lib/emptyFunction');
var ItemTypes = require('./../../js/itemtypes.js');
var { DragDropMixin, DropEffects } = require('react-dnd');

var handleClassNameCounter = 0;
var closeButtonPngPath = require('../../images/close_button.png');

var DragTarget = React.createClass({
    mixins: [DragDropMixin],
    propTypes: {
    },
    getInitialState: function() {
        return {
            id: Math.random()*1000,
            showCloseButton: false
        };
    },
    configureDragDrop(registerType) {
        registerType(ItemTypes.BOX, {
            dragSource: {
                beginDrag(e) {
                    return {
                        effectAllowed: DropEffects.MOVE,
                        item: {
                            id: this.props.id,
                            startLeft: this.props.left,
                            startTop: this.props.top,
                            startPageX: e.pageX,
                            startPageY: e.pageY,
                            width: e.target.offsetWidth,
                            height: e.target.offsetHeight
                        }
                    };
                }
            }
        });
    },
    getDefaultProps: function() {
        return {
            left: 0,
            top: 0
        };
    },
    handleCloseClick: function() {
        typeof this.props.onCloseClick === 'function' && this.props.onCloseClick(this.props.id);
    },
    handleMouseEnter: function() {
        if(!this.state.showCloseButton) {
            this.setState({showCloseButton: true && !this.props.previewMode});
        }
    },
    handleMouseLeave: function() {
        if(this.state.showCloseButton) {
            this.setState({showCloseButton: false});
        }
    },
    handleClick: function(e) {
        typeof this.props.onComponentClick === 'function' && this.props.onComponentClick(this.props.id);
    },
    render: function() {
        var { isDragging } = this.getDragState(ItemTypes.BOX),
            { hideSourceOnDrag } = this.props;

        if (isDragging && hideSourceOnDrag) {
            return null;
        }

        var dragStyle = {
            position: 'absolute',
            left: this.props.position.left,
            top: this.props.position.top,
            zIndex: this.props.position.zIndex || 0,
            opacity: 1,
            border: this.props.selected && !this.props.previewMode ? '1px solid seagreen' : 'none',
            cursor: !this.props.previewMode ? 'move' : ''
        };

        if(isDragging) {
            dragStyle.opacity = 0.5;
        }

        var closeButtonStyles = {
            width: "20px",
            height: "20px",
            position: "absolute",
            right: 0,
            top: 0
        };

        var innerDivStyle = {
            pointerEvents: this.props.previewMode ? 'all' : 'none'
        };

        var dragSourceProps = this.props.previewMode ? {} : this.dragSourceFor(ItemTypes.BOX);

        return (
            <div 
                onClick={this.handleClick}
                {...dragSourceProps}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                style={dragStyle}>
                {this.state.showCloseButton ? <img onClick={this.handleCloseClick} src={closeButtonPngPath} style={closeButtonStyles} /> : ''}
                <div style={innerDivStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    },
});

module.exports = DragTarget;