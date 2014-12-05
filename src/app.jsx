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
var history = new History({
        selectedComponentIndex: -100,
        data: [
            {
                name: 'basic/button', 
                position: defaultPostion, 
                props: {},
                supportedStyles: ['width', 'height', 'backgroundColor'],
            },
            {
                name: 'basic/select', 
                position: {top: 30, left: 0}, 
                props: {},
                supportedStyles: ['width', 'backgroundColor'],
            },
            {
                name: 'basic/table', 
                position: {top: 0, left: 200}, 
                props: {}, 
                supportedStyles: ['width', 'height', 'backgroundColor'],
            },
            // {name: 'custom/photogrid', position: {top: 200, left: 300}, 
            //     props: {
            //         data: [
            //             'http://lorempixel.com/400/400/',
            //             'http://lorempixel.com/500/700/',
            //             'http://lorempixel.com/600/500/',
            //             'http://lorempixel.com/600/800/'
            //         ]
            //     },
            // }
        ]
    }, render);


window.addEventListener('keydown', function(e) {
    // 90 === 'z' and e.metaKey stands for 'Command' or 'Ctrl' key. 
    // trying to catch command-z here. for undo.
    if(e.which === 90 && e.metaKey) {
        history.undo();
    }
});

module.exports = TippyTapApp;