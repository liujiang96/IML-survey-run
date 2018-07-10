/**
 * Created by 欧阳方昕 on 2018/5/17.
 */

var preprocess_data_for_taxo = function (selected_treelist) {
};
var preprocess_data_for_info = function (papermeta) {
};
var preprocess_data_for_facet = function (treelist) {
};
// this is a test
var find_tree_size = function(tree){
    var size = 0;
    if (!("children" in tree))
    {
        return tree['papers'].length;
    }
    var n_child = tree['children'].length;
    for(var i = 0; i< n_child; i++)
    {
        var sub_tree = tree['children'][i];
        size += find_tree_size(sub_tree);
    }
    return size;
}
var find_first_level_size = function(tree){
    var len = tree['children'].length;
    var size_array = Array(len);
    for(var i = 0; i < len; i++)
    {
        size_array[i] = find_tree_size(tree['children'][i]);
    }
    return size_array;
}
var find_first_level_name = function(tree){
    var len = tree['children'].length;
    var name_array = Array(len);
    for(var i = 0; i < len; i++)
    {
        name_array[i] = tree['children'][i]['name'];
    }
    return name_array;
}
function clickcancel() {
  // we want to a distinguish single/double click
  // details http://bl.ocks.org/couchand/6394506
  var dispatcher = d3.dispatch('click', 'dblclick');
  function cc(selection) {
      var down, tolerance = 5, last, wait = null, args;
      // euclidean distance
      function dist(a, b) {
          return Math.sqrt(Math.pow(a[0] - b[0], 2), Math.pow(a[1] - b[1], 2));
      }
      selection.on('mousedown', function() {
          down = d3.mouse(document.body);
          last = +new Date();
          args = arguments;
      });
      selection.on('mouseup', function() {
          if (dist(down, d3.mouse(document.body)) > tolerance) {
              return;
          } else {
              if (wait) {
                  window.clearTimeout(wait);
                  wait = null;
                  //console.log(this)
                  dispatcher.apply("dblclick", this, args);
              } else {
                  that = this;

                  wait = window.setTimeout((function() {
                      return function() {
                          //console.log(this)
                          dispatcher.apply("click", that, args);
                          wait = null;
                      };
                  })(), 300);
              }
          }
      });
  };
  // Copies a variable number of methods from source to target.
  var d3rebind = function(target, source) {
    var i = 1, n = arguments.length, method;
    while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
    return target;
  };

  // Method is assumed to be a standard D3 getter-setter:
  // If passed with no arguments, gets the value.
  // If passed with arguments, sets the value and returns the target.
  function d3_rebind(target, source, method) {
    return function() {
      var value = method.apply(source, arguments);
      return value === source ? target : value;
    };
  }
  return d3rebind(cc, dispatcher, 'on');
}