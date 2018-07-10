/**
 * Created by 欧阳方昕 on 2018/5/17.
 */
var info = function (container) {
    var that = this;
    var container = container;
    var svg = container.append("svg")
         .attr('width', 500).attr('height', 500);
    // svg.append('rect').attr('x', 0).attr('y', 0).attr('width', 100).attr('height', 100).attr('fill', 'blue');
    // TODO: init svg attributes
    this.draw = function (papermeta) {
        that.create(papermeta);
        that.update();
        that.remove();
    }
    this.create = function (d) {
    }
    this.update = function () {
    }
    this.remove = function () {
    }
    // mouse over, mouse click, mouse leave
}