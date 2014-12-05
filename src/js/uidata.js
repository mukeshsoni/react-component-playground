var React = require('react');

var UI = {
    "basic/button": {
        comp: require('./../components/basic/button.jsx'),
        props: {}
    },
    "basic/input": {
        comp: require('./../components/basic/input.jsx'),
        props: {}
    },
    "basic/select": {
        comp: require('./../components/basic/select.jsx'),
        props: {}
    },
    "basic/table": {
        comp: require('./../components/basic/table.jsx'),
        props: {}
    },
    "basic/menu": {
        comp: require('./../components/basic/menu.jsx'),
        props: {}
    },
    "basic/canvas": {
        comp: require('./../components/basic/canvas.jsx'),
        props: {}
    },
    "basic/avatar": {
        comp: require('./../components/basic/avatar/avatar.jsx'),
        props: {}
    },
    "custom/photogrid": {
        comp: require('react-photo-grid'),
        props: {
            data: [
                'http://lorempixel.com/400/400/',
                'http://lorempixel.com/500/700/',
                'http://lorempixel.com/600/500/',
                'http://lorempixel.com/600/800/'
            ]
        }
    }
    // "custom/details-pane": require('./../components/custom/details-pane/details-pane.jsx'),
    // "custom/intl-tel-input": require('./../components/custom/intl-tel-input/intl-tel-input.jsx'),
    // "custom/comment-widget": require('./../components/custom/comments-widget/comments-widget.jsx')
};

module.exports = UI;