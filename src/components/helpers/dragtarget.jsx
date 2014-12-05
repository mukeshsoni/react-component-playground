/** @jsx React.DOM */

var React = require('react/addons');
var emptyFunction = require('react/lib/emptyFunction');
var ItemTypes = require('./../../js/itemtypes.js');
var { DragDropMixin, DropEffects } = require('react-dnd');
/* This component makes its children a drag target. Example:
 *
 *     <DragTarget onDrop={this.handleDrop}>Drag to me</DragTarget>
 *
 *     ...
 *
 *     handleDrop: function(e) {
 *         this.addImages(e.nativeEvent.dataTransfer.files);
 *     }
 *
 * Now "Drag to me" will be a drag target - when something is dragged over it,
 * the element will become partially transparent as a visual indicator that
 * it's a target.
 */
// TODO(joel) - indicate before the hover is over the target that it's possible
// to drag into the target. This would (I think) require a high level handler -
// like on Perseus itself, waiting for onDragEnter, then passing down the
// event. Sounds like a pain. Possible workaround - create a div covering the
// entire page...
//
// Other extensions:
// * custom styles for global drag and dragOver
// * only respond to certain types of drags (only images for instance)!

// require('../../../styles/drag_target.css');

var handleClassNameCounter = 0;
var closeButtonPngPath = require('../../images/close_button.png');
console.log('close button: ', closeButtonPngPath);

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
                    console.log('beginning drag: ', DropEffects.MOVE, this.props.id);
                    return {
                        effectAllowed: DropEffects.MOVE,
                        item: {
                            id: this.props.id,
                            startLeft: this.props.left,
                            startTop: this.props.top,
                            startPageX: e.pageX,
                            startPageY: e.pageY
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
            this.setState({showCloseButton: true});
        }
    },
    handleMouseLeave: function() {
        if(this.state.showCloseButton) {
            this.setState({showCloseButton: false});
        }
    },
    render: function() {
        var { isDragging } = this.getDragState(ItemTypes.BOX),
            { hideSourceOnDrag } = this.props;

        if (isDragging && hideSourceOnDrag) {
            return null;
        }

        var dragStyle = {
            position: 'absolute',
            left: this.props.left,
            top: this.props.top,
            opacity: 1,
            cursor: 'url(https://mail.google.com/mail/images/2/openhand.cur) 8 8, move'
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

        return (
            <div 
                {...this.dragSourceFor(ItemTypes.BOX)}
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