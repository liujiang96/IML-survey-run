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
var EventList = null;
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
var total_w = 130;
var total_h = 275;
var global_x = 20;
var global_y = 20;
var w_line_space = 10;
var h_line_space = 8;
var h_line_space_second = h_line_space;
var h_line_space_third = 0.5;
var facet_svg_h = 500;
var facet_svg_w = 600;
var title_displacement_x =  total_w / 8;
var title_displacement_y = h_line_space + 4;
var title_font_size = '15px';
var name_font = '10px';

// event view
var event_init_x = global_x;
var event_init_y = total_h + h_line_space * 5;
var event_font = '15px';
var arrow_str = "→";
var event_stack = [];
var event_x = event_init_x;