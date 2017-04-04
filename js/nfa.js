function NFA(regexp, for_visual) {
	this.regexp = regexp;
	this.m = regexp.length;

	var ops = new Array();
	this.graph = new cytoscapeFactory().getInstance();

	//TODO: make lables with letters
	this.graph.add({ data: { id: 0, label: regexp.charAt(0) }, classes: 'start' });

	for (var i = 1; i < this.m; i++) {
		this.graph.add({ data: { id: i, label: regexp.charAt(i) } });
	}
	this.graph.add({ data: { id: this.m, label: 'fin' }, classes: 'finish' });

	console.log(this.graph.nodes()[0]);
	for (var i = 0; i < this.m; i++) {
		var lp = i;

		if (regexp.charAt(i) == '(' || regexp.charAt(i) == '|')
			ops.push(i);
		else if (regexp.charAt(i) == ')') {
			var or = ops.pop();

			if (regexp.charAt(or) == '|') {
				lp = ops.pop();
				this.graph.add({ data: { source: lp, target: or + 1, label: 'ε' } });
				this.graph.add({ data: { source: or, target: i, label: 'ε' } });
			}
			else if (regexp.charAt(or) == '(')
				lp = or;
			else
				throw "Invalid regexp";
		}

		if (i < this.m - 1 && regexp.charAt(i + 1) == '*') {
			this.graph.add({ data: { source: lp, target: i + 1, label: 'ε' } });
			this.graph.add({ data: { source: i + 1, target: lp, label: 'ε' } });
		}

		if (regexp.charAt(i) == '(' || regexp.charAt(i) == '*' || regexp.charAt(i) == ')')
			this.graph.add({ data: { source: i, target: i + 1, label: 'ε' } });
		else if (for_visual && (regexp.charAt(i) != '|'))
			this.graph.add({ data: { source: i, target: i + 1, label: regexp.charAt(i) } });
	}

	if (ops.length != 0)
		throw "Invalid regular expression";

}

NFA.prototype.DFS = function (root, cy) {
	var dfs = cy.elements().dfs({
		roots: '#' + root,
		directed: true
	});
	var result = [];
	for (var i = 0; i < dfs.path.length; i++) {
		var e = dfs.path[i];
		if (e.isNode()) {
			result.push(e.id());
		}
	}
	// console.log(result);
	return result;
}

NFA.prototype.Recognize = function (txt) {
	// var dfs = new DirectedDFS(this.graph, 0);
	var pc = this.DFS(0, this.graph);
	//console.log();
	console.log("eps = " + pc);
	// Compute possible NFA states for txt[i+1]
	for (var i = 0; i < txt.length; i++) {
		if (txt.charAt(i) == '*' || txt.charAt(i) == '|' || txt.charAt(i) == '(' || txt.charAt(i) == ')')
			throw "text contains the metacharacter '" + txt.charAt(i) + "'";

		var match = new Array();

		for (var j = 0; j < pc.length; j++) {
			if (pc[j] == this.m) continue;
			if ((this.regexp.charAt(pc[j]) == txt.charAt(i)) || this.regexp.charAt(pc[j]) == '.')
				match.push(+pc[j] + 1);
		}

		console.log("match= " + match);

		pc = new Array();
		for (var k = 0; k < match.length; k++) {
			var arch_vertices = this.DFS(match[k], this.graph);
			//console.log("arch"+arch_vertices+"arch");
			for (var j = 0; j < arch_vertices.length; j++) {
				pc.push(arch_vertices[j]);
			}
		}

		console.log("eps = " + pc);

		// optimization if no states reachable
		if (pc.length == 0) return false;
	}

	for (var i = 0; i < pc.length; i++) {
		if (pc[i] == this.m) {
			return true;
		}
	}

	return false;
}