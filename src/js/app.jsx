var React = require('react');

var MainComp = React.createClass({

    render: function() {
        return (
            <div>
                Main Comp
            </div>
        );
    }

});

React.render(<MainComp />, document.getElementById('container'));

module.exports = MainComp;
