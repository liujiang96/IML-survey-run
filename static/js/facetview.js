/**
 * Created by 欧阳方昕 on 2018/5/17.
 */
var facet = function (data, container) {
    var that = this;
    var container = container;
    var svg = container.append("svg").attr('width', facet_svg_w).attr('height', facet_svg_h).attr('class', 'facetSVG');
    this.draw = function (svg, data) {
        that.create(svg, data);
        that.init_event(svg);
        that.update();
        that.remove();
    };
    this.create = function (svg, data) {
        var n_tree = data.length;
        var w = total_w;
        var x = global_x;
        svg.selectAll('.tables').remove();
        var table_list = svg.append('g').attr('id', 'table_list').attr('class', 'tables');
        for(var i = 0; i < n_tree ; i++){
               var tree = data[i];
               var taxo_name = tree['name'];
               var size_array = find_first_level_size(tree);
               var name_array = find_first_level_name(tree);
               var sum = size_array.reduce(function(a, b) { return a + b; }, 0);
               var y = global_y;
               var taxo_group = table_list.append('g').attr('id', taxo_name).attr('class', 'taxo');
               taxo_group.append('text')
                           .attr("x", x + title_displacement_x)
                           .attr("y", title_displacement_y)
                           .text(TreeList[i]['name'])
                           .attr('font-size', title_font_size)
                           .attr('fill', CategoryColor[i])
                           .data([tree]);
               taxo_group.select('text').on('click', clickOnTitle);
               for(var j = 0; j < size_array.length; j++)
               {
                 var h = (total_h - (size_array.length - 1) * h_line_space) * size_array[j] / sum;
                 if (h > 0)
                 {
                     var is_taxo_group_in_anchored_list = 0;
                     for(var k = 0; k < anchored_list.length; k++)
                     {
                         if(!anchored_list[k]['name'].localeCompare(tree['children'][j].name)){
                             is_taxo_group_in_anchored_list = 1;
                             break;
                         }
                     }
                     var g = taxo_group.data([tree['children'][j]]).append('g')
                         .attr('class', 'node')
                         .attr('id',  taxo_name + '-' + tree['children'][j].name)
                         .style('opacity', is_taxo_group_in_anchored_list ? high_opacity: low_opacity);
                     g.append('rect')
                         .attr('x', x)
                         .attr('y', y)
                         .attr('width', w)
                         .attr('height', h)
                         .attr('fill', CategoryColor[i]);
                     g.append('text')
                         .attr("x", x + w / 8)
                         .attr("y", y + h / 2)
                         .text(name_array[j])
                         .attr('font-size', name_font)
                         .attr('fill', 'white');
                     y += (h + h_line_space);
                 }
               }
               x += (w + w_line_space);
               var cc = clickcancel();
               //svg.selectAll('g').on('dblclick', drill_down_facet).on('click', anchor_facet)
               svg.selectAll('.node').call(cc);
               cc.on('dblclick', drill_down_facet);
               cc.on('click', anchor_facet);
               svg.selectAll('.node').on("mouseover", hover_over_facet).on("mouseleave", hover_leave_facet);
        }
    };
    this.init_event = function (){
        EventList = svg.append('g').attr('id', 'event_list').attr('class', 'events');
        var init_string = 'All concepts';
        EventList.append('text')
                   .attr("x", event_init_x)
                   .attr("y", event_init_y)
                   .text(init_string)
                   .attr('font-size', event_font)
                   .attr('id', 'e').on('click', event_click);
        event_x += EventList.select('#e').node().getBBox().width;
    };
    this.update = function () {
        // refer to drill down
    };
    this.remove = function () {
    };
    this.draw(svg, data);
    // mouse over, mouse click, mouse leave
};