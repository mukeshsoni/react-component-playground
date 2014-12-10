var _ = require('lodash');
var React = require('react');
var RightContainer = require('../components/right_container.jsx');
var Playground = require('./playground.jsx');
var uidata = require('./../js/uidata.js');
var Immutable = require('immutable');
var mui = require('material-ui');
var Menu = require('./menu.jsx');
var Container = require('./../../node_modules/react-dnd/examples/_sortable-simple/Container.js');
// var Card = require('./Card.jsx');

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
    handleSaveClick: function() {
        typeof this.props.onSaveClick === 'function' && this.props.onSaveClick();
    },
    handleHistoryItemClick: function (historyItemIndex) {
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
    handleLayerItemClick: function(event, index, item) {
        console.log('layer item clicked: ', item);
        this.props.cursor.update(function(oldValue) {
            return oldValue.set('selectedComponentIndex', oldValue.get('data').count() - index - 1);
        });
    },
    _moveLayer: function(direction, selectedComponentIndex) {
        var afterIndex = selectedComponentIndex + direction;
        this.props.cursor.update(function(oldValue) {
            var selectedComponent = oldValue.get('data').get(selectedComponentIndex);
            console.log('selected component: ', selectedComponent.toJS());
            return oldValue
                    .set('selectedComponentIndex', afterIndex)
                    .updateIn(['data'], function(oldVal) {
                        return oldVal.remove(selectedComponentIndex)
                                    .splice(afterIndex, 0, selectedComponent);
                    });
        });
    },
    moveLayerUp: function() {
        var selectedComponentIndex = this.props.cursor.get('selectedComponentIndex');
        if(selectedComponentIndex === (this.props.cursor.get('data').count()-1)) {
            return;
        }

        this._moveLayer(1, selectedComponentIndex);
    },
    moveLayerDown: function() {
        var selectedComponentIndex = this.props.cursor.get('selectedComponentIndex');
        if(selectedComponentIndex === 0) {
            return;
        }

        this._moveLayer(-1, selectedComponentIndex);
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
                            WebkitTransition: 'font-size 0.3s ease, background-color 0.3s ease',
                            MozTransition: 'font-size 0.3s ease, background-color 0.3s ease',
                            OTransition: 'font-size 0.3s ease, background-color 0.3s ease',
                            msTransition: 'font-size 0.3s ease, background-color 0.3s ease',
                            transition: 'font-size 0.3s ease, background-color 0.3s ease',
                        }}>
                        {historyString}</a></li>
            );
        }, this);

        var layers = this.getLayers();
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
                    <div className='pure-u-3-24'>
                        <h2>Layers</h2>
                        <mui.Menu 
                            selectedIndex={this.props.cursor.get('data').count() - this.props.cursor.get('selectedComponentIndex') - 1}
                            menuItems={layers} 
                            onItemClick={this.handleLayerItemClick}
                            />
                    </div>
                    <div className='pure-a-1-24'>
                        <button onClick={this.moveLayerUp}>Up</button>
                        <button onClick={this.moveLayerDown}>Down</button>
                    </div>
                </div>
                <div className='pure-a-5-24'>
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