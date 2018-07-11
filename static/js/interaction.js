/**
 * Created by derekxiao on 2017/12/22.
 */
var drill_down_facet = function(d){
    console.log(d['name']);
    var tree = d;
    var svg = d3.select('#block-1-2').select('svg');
    var n_child = d.children.length;
    var ele = d3.select(this).select('rect');
    var total_h_local = total_h;//parseFloat(ele.attr('height'));
    var width = parseFloat(ele.attr('width'));
    var color = ele.attr('fill');
    var x = parseFloat(ele.attr('x'));
    var y = global_y;//parseFloat(ele.attr('y'));
    var size_array = find_first_level_size(tree);
    var name_array = find_first_level_name(tree);
    var sum = size_array.reduce(function(a, b) { return a + b; }, 0);
    var root = d3.select(this).attr('id').split('-')[0];
    var taxo_group = d3.select('#' + root);
    taxo_group.selectAll('.node').remove();
    total_h_local -= (size_array.length - 1) * h_line_space_second;
    for(var i = 0; i < n_child; i++)
    {
         var h = total_h_local *  size_array[i] / sum;
         if (h > 0)
         {
             var g = taxo_group.data([tree['children'][i]])
                 .append('g')
                 .attr('class', 'node')
                 .attr('id',  root + '-' + name_array[i]);
             g.append('rect')
                 .attr('x', x)
                 .attr('y', y)
                 .attr('width', width)
                 .attr('height', h)
                 .attr('fill', color);
             g.append('text')
                 .attr("x", x + total_w / 8)
                 .attr("y", y + h / 2)
                 .text(name_array[i]).attr('font-size', name_font).attr('fill', 'white');
             y += (h + h_line_space_second);
             g.on("mouseover", hover_over_facet).on("mouseleave", hover_leave_facet);
             var cc = clickcancel();
             g.call(cc);
             cc.on('dblclick', drill_down_facet);
             cc.on('click', anchor_facet);
             //g.on('dblclick', drill_down_facet)
         }
    }
    // event handling
    //var event_list = d3.select('.events');
    var event_id = event_stack.length;
    var event = {'taxo_name': root, 'data': tree, 'event_id': event_id};
    event_stack.push(event);
    var cur_string = '[' + root[0].toUpperCase() + ']' + ' ' + tree['name'];
    var find_taxo_id = -1;
    for(var i = 0; i < TreeList.length; i++)
    {
        if(!TreeList[i]['name'].localeCompare(root)){
            find_taxo_id = i;
            break;
        }
    }
    if(find_taxo_id == -1)
    {
        console.log('bad id of taxo.');
    }
    var text_color = CategoryColor[find_taxo_id];
    EventList.append('text')
           .attr("x", event_x)
           .attr("y", event_init_y)
           .text(arrow_str + cur_string)
           .attr('font-size', event_font)
           .attr('id', 'e' + event_id).attr('fill', text_color).on('click', event_click);
    event_x += EventList.select('#e' + event_id.toString()).node().getBBox().width;
};
var hover_over_facet = function(d){
    d3.select('#block-1-2').select('svg').selectAll('.node').transition().duration(300).style('opacity', 0.35);
    d3.select(this).transition().duration(200).style("opacity", 1);
    // todo: add propostions in other rects
};
var hover_leave_facet = function(d){
    d3.select('#block-1-2').select('svg').selectAll('g').transition().duration(300).style('opacity', 1);
};
var anchor_facet = function(d){
    TaxoView.draw(d)
    //console.log(d);
    //console.log(d3.select(this).data()[0]);
    //d3.select(this).transition().duration(200).style("opacity", 1);
    //console.log(d3.select(this));
};
var event_click = function() {
    var id_str = this.id;
    var event_id;
    if(id_str.length == 1) {
        event_id = -1;
    }
    else
    {
        event_id = this.id[1] - '0';
    }
    var len = event_stack.length;
    for(var i = len - 1; i > event_id; i--)
    {
        event_stack.pop();
        event_x -= EventList.select('#e' + i.toString()).node().getBBox().width;
    }
    EventList.selectAll('text').filter(function() {
        var id_str = this.id;
        return (id_str.length > 1) && ((id_str[1] - '0') > event_id);
    }).remove();
    // var event = {'taxo_name': root, 'data': tree, 'event_id': event_id};
    var data = []
    for(var i = 0; i < TreeList.length; i++)
    {
        var tree = TreeList[i];
        var name = tree['name'];
        var flag = -1;
        for(var j = 0; j < event_stack.length; j++)
        {
            if(!event_stack[j]['taxo_name'].localeCompare(name)){
                flag = j;
            }
        }
        if(flag >= 0){
            data.push(event_stack[flag]['data']);
        }
        else{
            data.push(tree);
        }
    }
    FacetView.create(d3.select('.facetSVG'), data);
};
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