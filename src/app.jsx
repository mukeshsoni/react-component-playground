/**
 * @jsx React.DOM
 */

'use strict';

var Immutable = require('immutable');
var React = require('react/addons');
var History = require('immutable-history');

require('./css/main.css');

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;
(window !== window.top ? window.top : window).Immutable = Immutable;
(window !== window.top ? window.top : window).History = History;


// components
var TippyTapApp = require('./components/tippy_tap_app.jsx');

function handleUndoClick() {
    history.undo();
}

function handleRedoClick() {
    history.redo();
}

function render(cursor) {
    console.log('top level render called');
    React.render(<TippyTapApp onUndoClick={handleUndoClick} onRedoClick={handleRedoClick} cursor={cursor} />, document.getElementById('container')); // jshint ignore:line 
}

var defaultPostion = { top: 0, left: 0 };
var history = new History({
        data: [
            {name: 'basic/button', position: defaultPostion},
            {name: 'basic/select', position: defaultPostion}
        ]
    }, render);

module.exports = TippyTapApp;