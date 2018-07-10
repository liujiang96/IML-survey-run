/**
 * Created by 欧阳方昕 on 2018/5/17.
 */
var taxo = function (container) {
    var that = this;
    var container = container;
    var svg = container.append("svg").attr('width', 600).attr('height', 600);
   // console.log(svg)
    // TODO: init svg attributes

    this.draw = function (selected_treelist) {
        that.create(selected_treelist);
        that.update();
        that.remove();
    }
    this.create = function (d) {
        var svg = d3.select('#block-1-1').select('svg');
        svg.selectAll("*").remove();
        //console.log(svg)
        var treeData = d;
        // ************** Generate the tree diagram	 *****************
        var margin = {top: 50, right: 50, bottom: 50, left: 50},
            width = parseFloat(svg.attr('width')) - margin.right - margin.left,
            height = parseFloat(svg.attr('height')) - margin.top - margin.bottom;
        var treemap = d3.tree().size([width, height]);

        //  assigns the data to a hierarchy using parent-child relationships
        var nodes = d3.hierarchy(treeData);

        // maps the node data to the tree layout
        nodes = treemap(nodes);

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        svg.attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // adds the links between the nodes
        var link = g.selectAll(".link")
            .data( nodes.descendants().slice(1))
          .enter().append("path")
            .attr("class", "link")
            .attr("d", function(d) {
               return "M" + d.x + "," + d.y
                 + "C" + d.x + "," + (d.y + d.parent.y) / 2
                 + " " + d.parent.x + "," +  (d.y + d.parent.y) / 2
                 + " " + d.parent.x + "," + d.parent.y;
               });

        // adds each node as a group
        var node = g.selectAll(".node")
            .data(nodes.descendants())
          .enter().append("g")
            .attr("class", function(d) {
              return "node" +
                (d.children ? " node--internal" : " node--leaf"); })
            .attr("transform", function(d) {
              return "translate(" + d.x + "," + d.y + ")"; });

        // adds the circle to the node
        node.append("circle")
          .attr("r", 10);

        // adds the text to the node
        node.append("text")
          .attr("dy", ".35em")
          .attr("y", function(d) { return d.children ? -20 : 20; })
          .style("text-anchor", "middle")
          .text(function(d) { return d.data.name; });
    }
    this.update = function () {
    }
    this.remove = function () {
    }
    // mouse over, mouse click, mouse leave
}