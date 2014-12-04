var React = require('react');
var ItemTypes = require('./../../js/itemtypes.js');
var DragDropMixin = require('react-dnd').DragDropMixin;

var MenuItem = React.createClass({
    mixins: [DragDropMixin],
    
    configureDragDrop(registerType) {
        registerType(ItemTypes.ITEM, {
            dragSource: {
                beginDrag() {
                    return {
                        item: {
                          name: this.props.item
                        }
                    };
                }
          }
        });
    },

    render: function() {
        var { isDragging } = this.getDragState(ItemTypes.ITEM);
        return (
            <li 
                {...this.dragSourceFor(ItemTypes.ITEM)}
                className={this.props.selected?"pure-menu-selected":""}
                >
                <a href="#">{this.props.item}</a>
            </li>
        );
    }

});

module.exports = MenuItem;