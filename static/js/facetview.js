/**
 * Created by 欧阳方昕 on 2018/5/17.
 */
var facet = function (data, container) {
    var that = this;
    var container = container;
    var svg = container.append("svg").attr('width', 600).attr('height', 500);
    var n_tree = data.length;
    for(var i = 0; i < n_tree ; i++){
           var tree = data[i];
           //console.log(tree)
           var taxo_name = tree['name'];
           var size_array = find_first_level_size(tree);
           var name_array = find_first_level_name(tree);
           // console.log(size_array);
           // console.log(name_array);
           var sum = size_array.reduce(function(a, b) { return a + b; }, 0);
           var y = 20;
           svg.data([tree]).append('g').append('text').attr("x", x + w / 8)
                 .attr("y", h_line_space + 4)
                 .text(taxo_name).attr('font-size', '15px').attr('fill', CategoryColor[i]);
           for(var j = 0; j < size_array.length; j++)
           {
             h = (total_h - (size_array.length - 1) * h_line_space)* size_array[j] / sum;
             if (h > 0)
             {
                 var g = svg.data([tree['children'][j]]).append('g');
                 // console.log(g.data()[0])
                 g.append('rect').attr('x', x).attr('y', y).attr('width', w).attr('height', h).attr('fill', CategoryColor[i]);
                 g.append('text').attr("x", x + w / 8)
                 .attr("y", y + h / 2)
                 .text(name_array[j]).attr('font-size', '10px').attr('fill', 'white');
                 //console.log(g.data['children'])
                 y += (h + h_line_space);
             }
           }
           x += (w + w_line_space);
           var cc = clickcancel();
           svg.selectAll('g').on("mouseover", hover_over_facet).on("mouseleave", hover_leave_facet);
           svg.selectAll('g').call(cc);
           //svg.selectAll('g').on('dblclick', drill_down_facet).on('click', anchor_facet)
           cc.on('dblclick', drill_down_facet);
           cc.on('click', anchor_facet);
     }

    this.draw = function () {
        that.create(data);
        that.update();
        that.remove();
    }
    this.create = function (data) {
    }
    this.update = function () {
    }
    this.remove = function () {
    }
    // mouse over, mouse click, mouse leave
}