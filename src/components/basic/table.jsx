/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var _ = require('lodash');

var mockData = [
    [1, "Honda", "Accord", "2009"],
    [1, "Toyota", "Camry", "2012"],
    [3, "Hyndai", "Elentra", "2010"]
];

var Table = React.createClass({
    getDefaultProps() {
        return {
            headers: ["#", "Make", "Model", "Year"],
            data: mockData,
            horizontal: true,
            striped: true
        };
    },
    render() {
        var style = _.merge({}, this.props.style);

        var cx = React.addons.classSet;
        var classes = cx({
            "pure-table": true,
            "pure-table-bordered": this.props.bordered,
            "pure-table-horizontal": this.props.horizontal
        });

        var headers = this.props.headers.map(function(header, index) {
            return (
                <th key={"table_header_no_"+index} >{header}</th>
            );
        });

        var rows = this.props.data.map(function(row, index) {
            var columns = _.map(row, function(column, index) {
                return (<td key={"table_column_"+index}>{column}</td>); 
            });

            return (<tr key={"table_row_"+index} className={this.props.striped && (index%2===1)? "pure-table-odd" : ""}>{columns}</tr>);
        }, this);

        return (
            <table className={classes} style={style}>
                <thead>
                    <tr>
                        {headers}
                    </tr>
                </thead>

                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }

});

module.exports = Table;