/**
 * @jsx React.DOM
 */

'use strict';

var Immutable = require('immutable');
var React = require('react/addons');

require('./css/main.css');
// require('./../../app/bower_components/pure/pure-min.css');
// require(__dirname + '/../../node_modules/purecss/pure.css');

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;
(window !== window.top ? window.top : window).Immutable = Immutable;

// components
var TippyTapApp = require('./components/tippy_tap_app.jsx');

React.render(<TippyTapApp />, document.getElementById('container')); // jshint ignore:line 

module.exports = TippyTapApp;