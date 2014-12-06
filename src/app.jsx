/**
 * @jsx React.DOM
 */

'use strict';

var Immutable = require('immutable');
var React = require('react/addons');
var History = require('immutable-history');
var uidata = require('./js/uidata.js');


// require('~material-ui/src/less/components');
// require('~./../node_modules/material-ui/src/less/scaffolding.less');
// require('~./../node_modules/material-ui/src/less/components.less');
require('./css/main.less');

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;
(window !== window.top ? window.top : window).Immutable = Immutable;
(window !== window.top ? window.top : window).History = History;


// components
var TippyTapApp = require('./components/tippy_tap_app.jsx');

function handleUndoClick() {
    // history.undo();
    undo(history.cursor);
}

function handleRedoClick() {
    redo(history.cursor);
}

function render(cursor) {
    var undoCount = history ? history.history.count() : 0;
    var redoCount = redos.length;

    React.render(<TippyTapApp
                    undoCount={undoCount}
                    redoCount={redoCount}
                    onUndoClick={handleUndoClick} onRedoClick={handleRedoClick} cursor={cursor} />, document.getElementById('container')); // jshint ignore:line
}

var redos = [];
function undo(currentCursor) {
    redos.push(currentCursor.deref());
    history.undo();
}

function redo(currentCursor) {
    currentCursor.update(function() {
        return redos.pop();
    });
}

var defaultPostion = { top: 0, left: 0 };
var initialComponents = ['materialUI/toggle'];
var data = _.map(initialComponents, function(component) {
    return _.merge({
        name: component,
        position: defaultPostion
    }, _.pick(uidata[component], 'props', 'supportedStyles'));
});

var history = new History({
        selectedComponentIndex: -100,
        data: data
    }, render);


window.addEventListener('keydown', function(e) {
    // 90 === 'z' and e.metaKey stands for 'Command' or 'Ctrl' key.
    // trying to catch command-z here. for undo.
    if(e.which === 90 && e.metaKey) {
        e.shiftKey ? redo(history.cursor) : undo(history.cursor);
    }
});

module.exports = TippyTapApp;