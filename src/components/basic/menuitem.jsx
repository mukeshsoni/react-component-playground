var React = require('react');
var ItemTypes = require('./../../js/itemtypes.js');
var { DragDropMixin, ImagePreloaderMixin } = require('react-dnd');

var MenuItem = React.createClass({
    mixins: [DragDropMixin, ImagePreloaderMixin],
    getImageUrlsToPreload: function() {
        return ['http://pixabay.com/static/uploads/photo/2012/02/27/16/57/animal-17430__180.jpg'];
    },
    configureDragDrop(registerType) {
        registerType(ItemTypes.ITEM, {
            dragSource: {
                canDrag() {
                    return this.hasPreloadedImage('http://pixabay.com/static/uploads/photo/2012/02/27/16/57/animal-17430__180.jpg');
                },
                beginDrag() {
                    return {
                        item: {
                          name: this.props.item
                        },
                        dragPreview: this.getPreloadedImage('http://pixabay.com/static/uploads/photo/2012/02/27/16/57/animal-17430__180.jpg')
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