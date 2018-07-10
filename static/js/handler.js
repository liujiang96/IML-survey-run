/**
 * Created by liujiang on 04/07/2018.
 */
var manifest_handler = function (data) {
    ManifestData = data;
    TreeList = data['tree_list'];
    PaperList = data['paper_list'];
    console.log("manifest data load finished");
    set_up();
};
var set_up = function () {
    FacetView = new facet(TreeList, d3.select('#block-1-2'));
    TaxoView = new taxo(d3.select('#block-1-1')); // created taxos from multiple individual taxos.
    InfoView = new info(d3.select('#block-2-1')); //meta data of papers and descriptions of focused taxos.
};