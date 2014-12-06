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
            currentHistoryIndex: 0,
            snapToGrid: false,
            selectedComponentStyle: {}
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
    toggleSnapToGrid: function(e) {
        this.setState({
            snapToGrid: e.target.checked
        });
    },
    handleStyleChange: function(newStyle) {
        var data = this.props.cursor.get('data');
        var selectedComponentIndex = this.props.cursor.get(['selectedComponentIndex']);
        var selectedComponentProps = data.getIn([selectedComponentIndex, 'props']);

        if(selectedComponentProps) {
            selectedComponentProps.update(function(oldValue) {
                var oldStyle = oldValue.get('style');
                if(!oldStyle) oldStyle = Immutable.Map();
                return oldValue.set('style', oldStyle.merge(Immutable.fromJS(newStyle)));
            });
        }
    },
    render: function() {
        var previewButtonStyle = {
            backgroundColor: this.state.previewMode ? 'green' : 'red'
        };
var selectedComponentIndex = this.props.cursor.get('selectedComponentIndex');
var selectedComponent = this.props.cursor.getIn(['data', selectedComponentIndex]);
if(selectedComponent) {
    selectedComponent = selectedComponent.toJS();
} else {
    selectedComponent = {};
}
        return (
            <div>
                <header style={{marginBottom: 10, marginLeft: 10}}>
                    <button onClick={this.handleUndoClick} disabled={this.props.undoCount===0}>Undo</button>
                    <button onClick={this.handleRedoClick} disabled={this.props.redoCount===0}>Redo</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button style={previewButtonStyle} onClick={this.togglePreviewMode}>Preview Mode</button>
                    <input type='checkbox'
                            style={{marginLeft: 20}}
                            checked={this.state.snapToGrid}
                            onChange={this.toggleSnapToGrid}
                        >
                        &nbsp;&nbsp;Snap to grid
                    </input>
                </header>
                <div className='pure-g'>
                    <Playground
                        snapToGrid={this.state.snapToGrid}
                        cursor={this.props.cursor}
                        previewMode={this.state.previewMode}
                        selectedComponentStyle={this.state.selectedComponentStyle}
                        />
                    <RightContainer
                        onStyleChange={this.handleStyleChange}
                        selectedComponent={selectedComponent}
                        componentList={componentListForListing} />
                </div>
            </div>
        );
    }

});

module.exports = TippyTapApp;