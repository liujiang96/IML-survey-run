/**
 * Created by derekxiao on 2017/12/22.
 */
var drill_down_facet = function(d){
    console.log(this)
    var tree = d;
    var svg = d3.select('#block-1-2').select('svg');
    var n_child = d.children.length;
    var ele = d3.select(this).select('rect');
    var total_h_local = parseFloat(ele.attr('height'));
    var width = parseFloat(ele.attr('width'));
    var color = ele.attr('fill');
    var x = parseFloat(ele.attr('x'));
    var y = parseFloat(ele.attr('y'));
    var size_array = find_first_level_size(tree);
    var name_array = find_first_level_name(tree);
    var sum = size_array.reduce(function(a, b) { return a + b; }, 0);
    d3.select(this).remove();
    //console.log(total_h);
    total_h_local -= (size_array.length - 1) * h_line_space_second;
    for(var i = 0; i < n_child; i++)
    {
         h = total_h_local *  size_array[i] / sum;
         if (h > 0)
         {
             var g = svg.data([tree['children'][i]]).append('g');
             //console.log(g.data()[0])
             g.append('rect').attr('x', x).attr('y', y).attr('width', width).attr('height', h).attr('fill', color);
             g.append('text').attr("x", x + w / 8)
             .attr("y", y + h / 2)
             .text(name_array[i]).attr('font-size', '10px').attr('fill', 'white');
             y += (h + h_line_space_second);
             g.on("mouseover", hover_over_facet).on("mouseleave", hover_leave_facet);
             g.on('dblclick', drill_down_facet)
         }
    }
};
var hover_over_facet = function(d){
    d3.select('#block-1-2').select('svg').selectAll('g').transition()
    .duration(300).style('opacity', 0.5);
    d3.select(this).transition().duration(200).style("opacity", 1);
};
var hover_leave_facet = function(d){
    d3.select('#block-1-2').select('svg').selectAll('g').transition().duration(300).style('opacity', 1);
};
var anchor_facet = function(d){
    console.log(this)
    TaxoView.draw(d)
    //console.log(d);
    //console.log(d3.select(this).data()[0]);
    //d3.select(this).transition().duration(200).style("opacity", 1);
    //console.log(d3.select(this));
}
var drill_down_taxo = function(){
};
var hover_over_taxo = function(){
};
var hover_leave_taxo = function(){
};
var selected_treelist_2_taxo = function () {
};
var hover_over_info = function(){
};
var hover_leave_info = function(){
};
var selected_papermeta_2_info = function () {
};
var selected_edge_node_2_info = function () {
};
var selected_edge_node_2_facet = function () {
};