var _ = require('underscore');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	console.log("xxxxxxxxxxxxxxxxxxxxxxxxxx");
	console.log(req.query);
	console.log("==========================");

	var nodes = []

	var parentId = req.query.parentId.split("-")[1];

	_(10).times(function(n) {

		var id = parentId + n;

		var node = {
			parentId: "treegrid-parent-" + parentId,
			id: "treegrid-" + id,
			childId: "treegrid-parent-" + id,
			name: req.query.parentId + n,
			additional: req.query.parentId
		};

		nodes.push(node);
	});
	
	setTimeout(function() {
		res.json({nodes: nodes});
	}, 100);
});

module.exports = router;
