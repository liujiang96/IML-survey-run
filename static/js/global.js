/**
 * Created by 欧阳方昕 on 2018/5/17.
 */
/*
    Main data
*/

/*
    System infomatioin
*/
var ManifestApi = "/api/manifest";

var TreeList = null;
var PaperList = null;
/*
    System informatioin
*/

/*
    View Object
*/
// var TaxoView = new taxo(d3.select('#block-1-1'));
// var InfoView = new info(d3.select('#block-2-1'));
// var FacetView = new facet(TreeList, d3.select('#block-1-2'));
var TaxoView = null;
var InfoView = null;
var FacetView = null;
/*
    color list
*/
var CategoryColor = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#bcbd22",
    "#e377c2",
    "#990099",
    "#17becf",
    "#8c564b"
];

var Gray = "#a8a8a8";

// facet view parameters
var w = 130;
var total_h = 290;
var x = 20;
var h_line_space = 8;
var w_line_space = 10;
var h_line_space_second = 3;
var h_line_space_third = 0.5;