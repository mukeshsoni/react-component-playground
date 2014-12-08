var _ = require('lodash');
var React = require('react');
var RightContainer = require('../components/right_container.jsx');
var Playground = require('./playground.jsx');
var uidata = require('./../js/uidata.js');
var Immutable = require('immutable');
var mui = require('material-ui');


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
    handlePropsChange: function(newProps) {
        var selectedComponentIndex = this.props.cursor.get(['selectedComponentIndex']);
        var selectedComponent = this.props.cursor.getIn(['data', selectedComponentIndex]);
        

        if(selectedComponent) {
            selectedComponent.update(function(oldValue) {
                return oldValue.set('props', Immutable.fromJS(newProps));
            });
        }  
    },
    handlePreviewToggle: function(event, toggleState) {
        this.setState({previewMode: toggleState});
    },
    handleSaveClick: function (argument) {
        console.log('save clicked');
        typeof this.props.onSaveClick === 'function' && this.props.onSaveClick();
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
                    <mui.IconButton icon='content-undo' disabled={this.props.undoCount===0} onTouchTap={this.handleUndoClick} />
                    <mui.IconButton icon='content-redo' disabled={this.props.redoCount===0} onTouchTap={this.handleRedoClick} />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Preview Mode: <mui.Toggle onToggle={this.handlePreviewToggle} />
                    <input type='checkbox'
                            style={{marginLeft: 20}}
                            checked={this.state.snapToGrid}
                            onChange={this.toggleSnapToGrid}
                        >
                        &nbsp;&nbsp;Snap to grid
                    </input>

                    <span style={{float: 'right'}}>
                        <mui.RaisedButton onClick={this.handleSaveClick} label='Save' primary={true} />
                    </span>
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
                        onPropsChange={this.handlePropsChange}
                        selectedComponent={selectedComponent}
                        componentList={componentListForListing} />
                </div>
            </div>
        );
    }

});

module.exports = TippyTapApp;