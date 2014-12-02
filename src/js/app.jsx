/**
 * @jsx React.DOM
 */

'use strict';

var Immutable = require('immutable');
var React = require('react/addons');

// require('./../../app/bower_components/pure/pure-min.css');
// require('./../../node_modules/purecss/pure.css');
// require('./../css/main.css');
// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;
(window !== window.top ? window.top : window).Immutable = Immutable;

// components
var TippyTapApp = require('./components/tippy_tap_app.jsx');

React.renderComponent(<TippyTapApp />, document.getElementById('container')); // jshint ignore:line 

module.exports = TippyTapApp;