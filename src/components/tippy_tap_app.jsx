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
        typeof this.props.onSaveClick === 'function' && this.props.onSaveClick();
    },
    handleHistoryItemClick: function (historyItemIndex) {
        typeof this.props.onHistoryItemClick === 'function' && this.props.onHistoryItemClick(historyItemIndex);
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

var historyList = _.map(this.props.historyStringList, function(historyString, index) {
    var listStyle = {
                cursor: 'pointer',
                font: '200 20px/1.5 Helvetica, Verdana, sans-serif',
                borderBottom: '1px solid #ccc',
                background: (this.props.currentHistoryIndex === index) ? 'beige' : 'white',
            };

    return (
        <li key={'history_list_' + index} style={listStyle} onClick={this.handleHistoryItemClick.bind(this, index)}>

            <a href='#' style={{
                    textDecoration: 'none',
                    color: '#000',
                    display: 'block',
                    width: 200,
                    '-webkit-transition': 'font-size 0.3s ease, background-color 0.3s ease',
                    '-moz-transition': 'font-size 0.3s ease, background-color 0.3s ease',
                    '-o-transition': 'font-size 0.3s ease, background-color 0.3s ease',
                    '-ms-transition': 'font-size 0.3s ease, background-color 0.3s ease',
                    transition: 'font-size 0.3s ease, background-color 0.3s ease',
                }}>
                {historyString}</a></li>
    );
}, this);

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
                <div className='pure-a-4-24'>
                    <h2>History</h2>
                    <ul style={{
                                listStyle:'none',
                                margin: 0,
                                padding: 0
                            }}>
                        {historyList}
                    </ul>
                </div>
            </div>
        );
    }

});

module.exports = TippyTapApp;