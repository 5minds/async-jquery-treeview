$(document).ready(function() {

    var nodeTemplateString = '<tr id="<%= node.id %>" class="<%= node.name %> <%= node.parentId %>"><td><%= node.name %></td><td><%= node.additional %></td></tr>';
    var loadingTemplateString = '<tr id="loading-<%= node.id %>" class="<%= node.childId %> "><td>loading</td></td>&nbsp;</td></tr>';

    var template = _.template('<% _.each(nodes, function(node) { %> ' + nodeTemplateString +  loadingTemplateString + ' <% }); %>');

    var expandedNodeIds = [];

    var onExpand = function() {
        var currentNode = $(this);
        var currentNodeId = currentNode.attr("id");

        var isLoaded = currentNode.data("isLoaded");

        expandedNodeIds.push(currentNodeId);

        var parentIdRef = "treegrid-parent-" + currentNodeId.split("-")[1];

        if (isLoaded) {
        } else {
            console.log("loading childs for parentId: " + currentNodeId);
            
            currentNode.data("isLoaded", true);

            $.getJSON("/api/?parentId=" + currentNodeId, function(nodes) {
                var html = template(nodes);

                $("." + parentIdRef).remove();

                $(html).insertAfter(currentNode);

                initTreegrid();

                setTimeout(function() {
                    expandedNodeIds.forEach(function(nodeId) {
                        $("#" + nodeId).treegrid("expand");
                    });
                }, 1);
            });

        }
    };

    window.initTreegrid = function () {
        $('.tree').treegrid({
            initialState: 'collapsed',
            onExpand: onExpand
        });       
    };

    initTreegrid();
});
