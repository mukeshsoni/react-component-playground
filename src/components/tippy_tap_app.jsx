var _ = require('lodash');
var React = require('react');
var RightContainer = require('../components/right_container.jsx');
var Playground = require('./playground.jsx');
var UI = require('./../js/uidata.js');
var Immutable = require('immutable');
var History = require('immutable-history');

var componentListForListing = _.reduce(UI, function(result, value, key) {
    var componentCategory = key.split('/')[0];
    if(!result[componentCategory]) {
        result[componentCategory] = [key];
        return result;
    } else {
        result[componentCategory].push(key);
        return result;
    }
    return {};
}, {});

var TippyTapApp = React.createClass({
    getInitialState: function() {
        return {
            previewMode: false,
            currentHistoryIndex: 0
        };
    },
    componentDidMount: function() {
    },
    handleUndoClick: function() {
        this.props.onUndoClick();
    },
    handleRedoClick: function() {
        this.props.onRedoClick();
    },
    render: function() {
        // var undoDisabled = this.state.currentHistoryIndex===0;
        // var redoDisabled = this.state.currentHistoryIndex===this.state.history.length-1;
        var undoDisabled = redoDisabled = false;
        // console.log('children: ', this.state.history.cursor.get('children').toJS());
        return (
            <div>
                <header>
                    <button onClick={this.handleUndoClick} disabled={undoDisabled}>Undo</button>
                    <button onClick={this.handleRedoClick} disabled={redoDisabled}>Redo</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={this.togglePreviewMode}>Preview Mode</button>
                </header>
                <div className='pure-g'>
                    <Playground
                        cursor={this.props.cursor}
                        />
                    <RightContainer
                        componentList={componentListForListing} />
                </div>
            </div>
        );
    }

});

module.exports = TippyTapApp;