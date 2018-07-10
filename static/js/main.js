/**
 * Created by derekxiao on 2017/12/22.
 */
$(document).ready(function () {
    // load data
    load_local_json();
    // set up views
    //set_up();
});
var load_local_json = function () {
    // request_node from backend
    // load data that need to be stored in global variables
    TreeList = null;
    PaperList = null;
    console.log("loading metadata and taxonomy...");
    var manifest_node = new request_node(ManifestApi, manifest_handler, "json", "GET");
    manifest_node.notify();
    console.log("loading finished.")
};
