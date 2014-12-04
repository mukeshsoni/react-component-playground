var React = require('react');

var UI = {
    "basic/button": React.createFactory(require('./../components/basic/button.jsx')),
    "basic/input": React.createFactory(require('./../components/basic/input.jsx')),
    "basic/select": React.createFactory(require('./../components/basic/select.jsx')),
    "basic/table": React.createFactory(require('./../components/basic/table.jsx')),
    "basic/menu": React.createFactory(require('./../components/basic/menu.jsx')),
    "basic/canvas": React.createFactory(require('./../components/basic/canvas.jsx')),
    "basic/avatar": React.createFactory(require('./../components/basic/avatar/avatar.jsx')),
    // "custom/details-pane": React.createFactory(require('./../components/custom/details-pane/details-pane.jsx')),
    // "custom/intl-tel-input": React.createFactory(require('./../components/custom/intl-tel-input/intl-tel-input.jsx')),
    // "custom/comment-widget": React.createFactory(require('./../components/custom/comments-widget/comments-widget.jsx'))
};

module.exports = UI;