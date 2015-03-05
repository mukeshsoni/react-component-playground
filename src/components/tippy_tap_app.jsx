var _ = require('lodash');
var React = require('react');
var RightContainer = require('../components/right_container.jsx');
var Playground = require('./playground.jsx');
var uidata = require('./../js/uidata.js');
var Immutable = require('immutable');
var mui = require('material-ui');
var PubSub = require('pubsub-js');

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
    _updateClassProperty: function _updateClassProperty(className, cssProperty, value) {
        var elems = document.getElementsByClassName(className),
            size = elems.length;

        for (var i = 0; i < size; i++) {
            var box = elems[i];
            box[cssProperty] = value;
        }
    },
    handleStyleChange: function(style, value) {

        var data = this.props.cursor.get('data');
        var selectedComponentIndex = this.props.selectedComponentIndex;
        var selectedComponentProps = data.getIn([selectedComponentIndex, 'props']);

        this._updateClassProperty(selectedComponentProps.get('className'), style.cssProperty, value);

        var selectedComponentStyle = selectedComponentProps.get('style');

        selectedComponentStyle.update(function(oldValue) {
            return oldValue.set(style.cssProperty, value);
        });

        PubSub.publish('history', style.name + ' udpated for ' + this.props.cursor.getIn(['data', this.props.selectedComponentIndex, 'name']));
    },
    handlePropsChange: function(propValue, propName) {
        var selectedComponentIndex = this.props.selectedComponentIndex;
        var selectedComponent = this.props.cursor.getIn(['data', selectedComponentIndex]);
        var props = selectedComponent.get('props');

        if(props) {
            props.update(function(oldValue) {
                return oldValue.set(propName, propValue);
            });
            PubSub.publish('history', 'Property change for ' + selectedComponent.get('name'));
        }
    },
    handlePreviewToggle: function(event, toggleState) {
        this.setState({previewMode: toggleState});
    },
    handleSaveClick: function() {
        typeof this.props.onSaveClick === 'function' && this.props.onSaveClick();
    },
    handleHistoryItemClick: function (event, historyItemIndex) {
        typeof this.props.onHistoryItemClick === 'function' && this.props.onHistoryItemClick(historyItemIndex);
    },
    getLayers: function() {
        var self = this;

        return _.map(this.props.cursor.get('data').toJS(), function(component) {
            return {
                payload: component.id,
                text: component.name
            }
        }).reverse();
    },
    handleComponentSelection: function(index) {
        typeof this.props.onItemSelected === 'function' && this.props.onItemSelected(index);
    },
    handleLayerItemClick: function(event, index, item) {
        this.handleComponentSelection(this.props.cursor.get('data').count() - index - 1);
    },
    _moveLayer: function(direction, selectedComponentIndex) {
        var afterIndex = selectedComponentIndex + direction;
        this.props.cursor.update(function(oldValue) {
            var selectedComponent = oldValue.get('data').get(selectedComponentIndex);
            return oldValue
                    .updateIn(['data'], function(oldVal) {
                        return oldVal.remove(selectedComponentIndex)
                                    .splice(afterIndex, 0, selectedComponent);
                    });
        });

        this.handleComponentSelection(afterIndex);
        var publishMessage = this.props.cursor.getIn(['data', selectedComponentIndex, 'name']) + ' zIndex moved ' + (direction === 1 ? 'up' : 'down');
        PubSub.publish('history', publishMessage);
    },
    moveLayerUp: function() {
        var selectedComponentIndex = this.props.selectedComponentIndex;
        if(selectedComponentIndex === (this.props.cursor.get('data').count()-1)) {
            return;
        }

        this._moveLayer(1, selectedComponentIndex);
    },
    moveLayerDown: function() {
        var selectedComponentIndex = this.props.selectedComponentIndex;
        if(selectedComponentIndex === 0) {
            return;
        }

        this._moveLayer(-1, selectedComponentIndex);
    },
    getSelectedComponent: function() {
        var selectedComponentIndex = this.props.selectedComponentIndex;
        var selectedComponent = this.props.cursor.getIn(['data', selectedComponentIndex]);
        if(selectedComponent) {
            selectedComponent = selectedComponent.toJS();
        } else {
            selectedComponent = {};
        }

        return selectedComponent;
    },
    render: function() {
        var previewButtonStyle = {
            backgroundColor: this.state.previewMode ? 'green' : 'red'
        };

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
                            WebkitTransition: 'font-size 0.3s ease, background-color 0.3s ease',
                            MozTransition: 'font-size 0.3s ease, background-color 0.3s ease',
                            OTransition: 'font-size 0.3s ease, background-color 0.3s ease',
                            msTransition: 'font-size 0.3s ease, background-color 0.3s ease',
                            transition: 'font-size 0.3s ease, background-color 0.3s ease',
                        }}>
                        {historyString}</a></li>
            );
        }, this);
        var historyListItems = _.map(this.props.historyStringList, function (historyString, index) {
            return {
                payload: index,
                text: historyString
            }
        });

        var layers = this.getLayers();

        return (
            <div>
                <header style={{marginBottom: 10, marginLeft: 10}}>
                    <mui.IconButton iconClassName='muidocs-icon-content-undo' disabled={this.props.undoCount===0} onTouchTap={this.handleUndoClick} />
                    <mui.IconButton iconClassName='muidocs-icon-content-redo' disabled={this.props.redoCount===0} onTouchTap={this.handleRedoClick} />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Preview Mode: 
                    <mui.Toggle 
                        onToggle={this.handlePreviewToggle} 
                        />
                    <input type='checkbox'
                            style={{marginLeft: 20}}
                            checked={this.state.snapToGrid}
                            onChange={this.toggleSnapToGrid}
                        >
                        &nbsp;&nbsp;Snap to grid
                    </input>

                    {false ? 
                            <span style={{float: 'right'}}>
                                <mui.RaisedButton onClick={this.handleSaveClick} label='Save' primary={true} />
                            </span>
                            : ''}
                    <a target='_blank' style={{float: 'right', marginRight: 20, marginTop: 10}} href="https://github.com/mukeshsoni/react-component-playground">
                        <mui.FontIcon className='muidocs-icon-github' />
                    </a>
                </header>
                <div className='pure-g'>
                    <Playground
                        snapToGrid={this.state.snapToGrid}
                        cursor={this.props.cursor}
                        previewMode={this.state.previewMode}
                        selectedComponentStyle={this.state.selectedComponentStyle}
                        selectedComponentIndex={this.props.selectedComponentIndex}
                        onItemSelected={this.handleComponentSelection}
                        />
                    <RightContainer
                        onStyleChange={this.handleStyleChange}
                        onPropsChange={this.handlePropsChange}
                        selectedComponent={this.getSelectedComponent()}
                        componentList={componentListForListing} />
                    <div className='pure-u-3-24'>
                        <h2>Layers</h2>
                        <button onClick={this.moveLayerUp}>Up</button>
                        <button onClick={this.moveLayerDown}>Down</button>
                        <mui.Menu 
                            selectedIndex={this.props.cursor.get('data').count() - this.props.selectedComponentIndex - 1}
                            menuItems={layers} 
                            onItemClick={this.handleLayerItemClick}
                            />
                        <h2>History</h2>
                        <div style={{maxHeight: 500, overflow: 'scroll'}}>
                            <mui.Menu 
                                selectedIndex={this.props.currentHistoryIndex}
                                menuItems={historyListItems}
                                onItemClick={this.handleHistoryItemClick}
                                />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = TippyTapApp;