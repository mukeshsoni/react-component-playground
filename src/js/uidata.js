var React = require('react');
var mui = require('material-ui');
var PaperButton = mui.PaperButton;
var RaisedButton = mui.RaisedButton;
var FloatingActionButton = mui.FloatingActionButton;
var Menu = mui.Menu;
var Paper = mui.Paper;
var Checkbox = mui.Checkbox;
var RadioButton = mui.RadioButton;
var Toggle = mui.Toggle;
var DropDownMenu = mui.DropDownMenu;
var materialInput = mui.Input;

var UI = {
    'materialUI/RaisedButton': {
        comp: RaisedButton,
        props: {
            primary: true,
            label: 'Press Me',
            style: {},
        },
        supportedStyles: [],
        dragImage: require('./../images/ghost-images/material-ui/button.png'),
        icon: 'image-adjust'
    },
    'materialUI/input': {
        comp: materialInput,
        props: {
            style: {},
            type: 'text',
            name:'firstname',
            placeholder:'First Name',
            description:'Your first name as it appears on your credit card.'
        },
        supportedStyles: [],
        dragImage: require('./../images/ghost-images/material-ui/input.png'),
        icon: 'action-input'
    },
    'materialUI/FloatingActionButton': {
        comp: FloatingActionButton,
        props: {
            icon: 'action-grade',
            style: {},
        },
        supportedStyles: [],
        dragImage: require('./../images/ghost-images/material-ui/button.png'),
        icon: 'action-stars'
    },
    'materialUI/IconButton': {
        comp: mui.IconButton,
        props: {
            icon: 'action-grade',
            style: {},
        },
        supportedStyles: [],
        dragImage: require('./../images/ghost-images/material-ui/icon.png'),
        icon: 'action-grade'
    },
    'materialUI/checkbox': {
        comp: Checkbox,
        props: {
            name: 'not a simple checkbox',
            value: 'not a simple checkbox',
            style: {},
        },
        supportedStyles: [],
        dragImage: require('./../images/ghost-images/material-ui/checkbox.png'),
        icon: 'toggle-check-box'
    },
    'materialUI/radiobutton': {
        comp: RadioButton,
        props: {
            name: 'not a simple radio button',
            value: 'not a simple radio button',
            label: 'Not yet another radio button',
            style: {},
        },
        supportedStyles: [],
        dragImage: require('./../images/ghost-images/material-ui/radiobutton.png'),
        icon: 'toggle-radio-button-on'
    },
    'materialUI/toggle': {
        comp: Toggle,
        props: {
            style: {}
        },
        supportedStyles: [],
        dragImage: require('./../images/ghost-images/material-ui/toggle.png'),
        icon: 'image-switch-camera'
    },
    'materialUI/menu': {
        comp: Menu,
        props: {
            menuItems: [
                { payload: '1', text: 'ID', data: '1234567890', icon: 'action-home' },
                { payload: '2', text: 'Type', data: 'Announcement', icon: 'editor-merge-type' },
                { payload: '3', text: 'Caller ID', data: '(123) 456-7890', icon: 'communication-phone' }
            ],
            style: {}
        },
        supportedStyles: [],
        dragImage: require('./../images/ghost-images/material-ui/menu.png'),
        icon: 'navigation-menu'
    },
    'materialUI/dropdown': {
        comp: DropDownMenu,
        props: {
            menuItems: [
               { payload: '1', text: 'Never' },
               { payload: '2', text: 'Every Night' },
               { payload: '3', text: 'Weeknights' },
               { payload: '4', text: 'Weekends' },
               { payload: '5', text: 'Weekly' },
            ],
            style: {}
        },
        supportedStyles: {},
        dragImage: require('./../images//ghost-images/material-ui/dropdown.png'),
        icon: 'navigation-more-vert'
    },
    'materialUI/paper': {
        comp: Paper,
        props: {
            className: 'paper-examples',
            zDepth: 3,
            style: {
                width: 200,
                height: 200
            }
        },
        supportedStyles: [],
        dragImage: require('./../images/ghost-images/material-ui/paper.png'),
        icon: 'content-content-copy'
    },
    'materialUI/icon': {
        comp: mui.Icon,
        props: {
            icon: 'maps-local-taxi',
            style: {}
        },
        supportedStyles: [],
        dragImage: require('./../images/ghost-images/material-ui/icon.png'),
        icon: 'editor-insert-emoticon'
    },
    // 'basic/button': {
    //     comp: require('./../components/basic/button.jsx'),
    //     props: {
    //         style: {
    //             width: 100,
    //             height: 30
    //         }
    //     },
    //     supportedStyles: ['width', 'height', 'backgroundColor'],
    //     dragImage: require('./../images/ghost-images/basic/button.png')
    // },
    // 'basic/input': {
    //     comp: require('./../components/basic/input.jsx'),
    //     props: {
    //         style: {
    //             width: 100,
    //             height: 30
    //         }
    //     },
    //     supportedStyles: ['width', 'height', 'backgroundColor'],
    //     dragImage: require('./../images/ghost-images/basic/input.png')
    // },

    // 'basic/select': {
    //     comp: require('./../components/basic/select.jsx'),
    //     props: {
    //         style: {
    //             width: 100
    //         }
    //     },
    //     supportedStyles: ['width', 'backgroundColor'],
    //     dragImage: require('./../images/ghost-images/basic/select.png')
    // },
    // 'basic/table': {
    //     comp: require('./../components/basic/table.jsx'),
    //     props: {
    //         style: {
    //             width: 300,
    //             height: 300
    //         },
    //         data: [
    //             [1, 'Honda', 'Accord', '2009'],
    //             [1, 'Toyota', 'Camry', '2012'],
    //             [3, 'Hyndai', 'Elentra', '2010']
    //         ]
    //     },
    //     supportedStyles: ['width', 'height', 'backgroundColor'],
    //     dragImage: require('./../images/ghost-images/basic/table.png')
    // },
    // 'basic/menu': {
    //     comp: require('./../components/basic/menu.jsx'),
    //     props: {
    //         style: {
    //             width: 200,
    //             height: 300
    //         }
    //     },
    //     supportedStyles: ['width', 'height', 'backgroundColor'],
    //     dragImage: require('./../images/ghost-images/basic/menu.png')
    // },
    // 'basic/canvas': {
    //     comp: require('./../components/basic/canvas.jsx'),
    //     props: {
    //         style: {
    //             width: 500,
    //             height: 500
    //         }
    //     },
    //     supportedStyles: ['width', 'height', 'backgroundColor'],
    //     dragImage: require('./../images/ghost-images/basic/canvas.png')
    // },
    // 'basic/avatar': {
    //     comp: require('./../components/basic/avatar/avatar.jsx'),
    //     props: {
    //         style: {
    //             width: 50,
    //             height: 50
    //         },
    //         src: 'https://pbs.twimg.com/profile_images/441089358074892288/osFZshl7.jpeg'
    //     },
    //     supportedStyles: ['width', 'height', 'backgroundColor'],
    //     dragImage: require('./../images/ghost-images/basic/avatar.png')
    // },
    // 'custom/photogrid': {
    //     comp: require('react-photo-grid'),
    //     props: {
    //         style: {},
    //         data: [
    //             'http://lorempixel.com/400/400/',
    //             'http://lorempixel.com/500/700/',
    //             'http://lorempixel.com/600/500/',
    //             'http://lorempixel.com/600/800/'
    //         ]
    //     },
    //     supportedStyles: ['width', 'height', 'backgroundColor'],
    //     dragImage: require('./../images/ghost-images/custom/photogrid.png')
    // }
    // 'custom/details-pane': require('./../components/custom/details-pane/details-pane.jsx'),
    // 'custom/intl-tel-input': require('./../components/custom/intl-tel-input/intl-tel-input.jsx'),
    // 'custom/comment-widget': require('./../components/custom/comments-widget/comments-widget.jsx')
};

module.exports = UI;