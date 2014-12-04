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

var DragTarget = React.createClass({
    mixins: [DragDropMixin],
    propTypes: {
    },
    getInitialState: function() {
        return {
            id: Math.random()*1000,
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
    getInitialState: function() {
        return { 
        };
    },
    render: function() {
        var { isDragging } = this.getDragState(ItemTypes.BOX),
            { hideSourceOnDrag } = this.props;

        if (isDragging && hideSourceOnDrag) {
            return null;
        }

        return (
            <div {...this.dragSourceFor(ItemTypes.BOX)}
                style={{
                    position: 'absolute',
                    left: this.props.left,
                    top: this.props.top,
                    border: '1px dashed gray',
                    padding: '0.5rem'
                }}>
                {this.props.children}
            </div>
        );
    },
});

module.exports = DragTarget;