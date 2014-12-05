var _ = require('lodash');
var React = require('react');
var RightContainer = require('../components/right_container.jsx');
var Playground = require('./playground.jsx');
var uidata = require('./../js/uidata.js');
var Immutable = require('immutable');
var History = require('immutable-history');

var componentListForListing = _.reduce(uidata, function(result, value, key) {
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
    handleUndoClick: function() {
        this.props.onUndoClick();
    },
    handleRedoClick: function() {
        this.props.onRedoClick();
    },
    togglePreviewMode: function() {
        this.setState({previewMode: !this.state.previewMode});
    },
    render: function() {
        var previewButtonStyle = {
            backgroundColor: this.state.previewMode ? 'green' : 'red'
        };

        return (
            <div>
                <header style={{marginBottom: 10, marginLeft: 10}}>
                    <button onClick={this.handleUndoClick}>Undo</button>
                    <button onClick={this.handleRedoClick}>Redo</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button style={previewButtonStyle} onClick={this.togglePreviewMode}>Preview Mode</button>
                </header>
                <div className='pure-g'>
                    <Playground
                        cursor={this.props.cursor}
                        previewMode={this.state.previewMode}
                        />
                    <RightContainer
                        componentList={componentListForListing} />
                </div>
            </div>
        );
    }

});

module.exports = TippyTapApp;