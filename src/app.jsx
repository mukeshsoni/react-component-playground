/**
 * @jsx React.DOM
 */

'use strict';

var _ = require('lodash');
var Immutable = require('immutable');
var Cursor = require('immutable/contrib/cursor');
var React = require('react/addons');
var History = require('immutable-history');
var uidata = require('./js/uidata.js');
var request = require('superagent');

// IMP: have put this here for material-ui. they say it will go once react 1.0 is release
var injectTapEventPlugin = require("react-tap-event-plugin");
//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

require('./css/main.less');

// Export React so the devtools can find it
(window !== window.top ? window.top : window)._ = _;
(window !== window.top ? window.top : window).React = React;
(window !== window.top ? window.top : window).Immutable = Immutable;
(window !== window.top ? window.top : window).History = History;
(window !== window.top ? window.top : window).getHistory = getHistory;
(window !== window.top ? window.top : window).setHistory = setHistory;

if (window.history.pushState && window.location.pathname === '/') {
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + historyId;
    window.history.pushState({path:newurl},'',newurl);
}

function getHistory() {
    return _.map(history.history, function(historyItem) {
        return historyItem.toJS();
    });
}

function setHistory(historyItems) {
    var historyItemsArray;

    if(_.isString(historyItems)) {
        try {
            historyItemsArray = JSON.parse(historyItems);
        } catch(E) {
            return console.log('Error in parsing json: ', E.message);
        }
    } else if(_.isObject(historyItems)) {
        historyItemsArray = historyItems;
    }

    if(!_.isArray(historyItemsArray)) {
        historyItemsArray = [historyItemsArray];
    }

    // TODO - can't do it this way.
    // var history = new History(historyItemsArray[0], render);

    // history.cursor.
    // for some fun ;)
    var index = 0;
    function playHistory(historyItem) {
        if(index === historyItemsArray.length) return;

        history.cursor.update(function(oldData) {
            return Immutable.fromJS(historyItemsArray[index]);
        });
        index++;

        _.delay(playHistory, 400);
    }


    _.defer(playHistory, 400);
    // _.each(_.rest(historyItemsArray), function(historyItem) {
    //     history.cursor.update(function(oldData) {
    //         return Immutable.fromJS(historyItem);
    //     });
    // });
}

function handleSaveClick() {
    var data = getHistory();
    console.log('history: ', data);
    request
        .post('/api/history')
        .send({id: historyId, data: data})
        .set('Accept', 'application/json')
        .end(function(error, res){
            console.log('got response from server: ', res);
        });
}

// components
var TippyTapApp = require('./components/tippy_tap_app.jsx');

function handleUndoClick() {
    history.undo();
}

function handleRedoClick() {
    history.redo();
}

function render(cursor) {
    var undoCount = history ? history.getCurrentIndex() : 0;
    var redoCount = history ? history.history.length - history.getCurrentIndex() - 1 : 0;

    React.render(<TippyTapApp
                    undoCount={undoCount}
                    redoCount={redoCount}
                    onUndoClick={handleUndoClick}
                    onRedoClick={handleRedoClick}
                    onSaveClick={handleSaveClick}
                    cursor={cursor} />, document.getElementById('container')); // jshint ignore:line
}

var defaultPostion = { top: 0, left: 0 };
var initialComponents = ['materialUI/FloatingActionButton', 'materialUI/menu', 'materialUI/dropdown', 'materialUI/RaisedButton'];
var data = _.map(initialComponents, function(component, index) {
    return _.merge({
        name: component,
        position: {
            top: 100,
            left: index*100 + 150*(index+1)
        }
    }, _.pick(uidata[component], 'props', 'supportedStyles'));
});

var history;
function playHistory(index) {
    if(index === historyJSON.length) return;

    history.cursor.update(function(oldData) {
        return Immutable.fromJS(historyJSON[index]);
    });
    // index++;

    _.delay(playHistory.bind(null, index+1), 400);
}

function init() {
    console.log('history json : ', historyJSON);
    if(!historyJSON || historyJSON.length === 0) {
        history = new History({
                selectedComponentIndex: -100,
                data: data
            }, render);
    } else {
        history = new History(historyJSON[0], render);

        var index = 1;


        _.defer(playHistory.bind(null, index), 400);
    }
}

init();

window.addEventListener('keydown', function(e) {
    // 90 === 'z' and e.metaKey stands for 'Command' or 'Ctrl' key.
    // trying to catch command-z here. for undo.
    if(e.which === 90 && e.metaKey) {
        e.shiftKey ? handleRedoClick() : handleUndoClick();
    }
});

module.exports = TippyTapApp;