var _ = require('lodash');
var React = require('react');
var RightContainer = require('../components/right_container.jsx');
var Playground = require('./playground.jsx');
var UI = require('./../js/uidata.js');
var Immutable = require('immutable');
var History = require('immutable-history');

var defaultPostion = { top: 0, left: 0 };
function render(cursor) {
    var children = cursor.get(['children']);
    // setTimeout(function() {
    //     var children = cursor.get(['children']);
    //     if (children.length < 5) {
    //       children.update(function(oldValue) {
    //         return oldValue.push('EVEN MORE MUSCLES');
    //       });
    //     } else {
    //         // go back to the previous state of the cursor
    //         history.undo();
    //     }
    // }, 500);
    // console.log(cursor.toJS());
    // console.log('children: ', children.toJS());
}

var history = new History({
    data: {name: 'basic/canvas', position: defaultPostion},
    children: [
        {
            data: {name: 'custom/details-pane', position: defaultPostion},
            children: [
                {data: {name: 'basic/select', position: defaultPostion}, children: []}
            ]
        },
    ]
}, render);

var componentListForListing = _.reduce(UI, function(result, value, key) {
    var componentCategory = key.split('/')[0];
    if(!result[componentCategory]) {
        result[componentCategory] = [];
        return result;
    } else {
        result[componentCategory].push(key);
        return result;
    }
    return {};
}, {});

console.log('component for listing: ', componentListForListing);

var TippyTapApp = React.createClass({
    getInitialState: function() {
        return {
            // playgroundComponentTree: playgroundComponentTree,
            // history: [cTree],
            history: [],
            previewMode: false,
            currentHistoryIndex: 0
        };
    },
    handleDragEnd: function() {
        console.log('tippytapapp: handledragend');
    },
    render: function() {
        return (
            <div>
                <header>
                    <button onClick={this.handleUndoClick} disabled={this.state.currentHistoryIndex===0}>Undo</button>
                    <button onClick={this.handleRedoClick} disabled={this.state.currentHistoryIndex===this.state.history.length-1}>Redo</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={this.togglePreviewMode}>Preview Mode</button>
                </header>
                <div className='pure-g'>
                    <Playground
                        />
                    <RightContainer
                        handleDragEnd={this.handleDragEnd}
                        componentList={componentListForListing} />
                </div>
            </div>
        );
    }

});

module.exports = TippyTapApp;