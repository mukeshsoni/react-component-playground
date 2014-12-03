var React = require('react');
var RightContainer = require('../components/right_container.jsx');

var componentListForListing = [];

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
                    <RightContainer
                        handleDragEnd={this.handleDragEnd}
                        componentList={componentListForListing} />
                </div>
            </div>
        );
    }

});

module.exports = TippyTapApp;