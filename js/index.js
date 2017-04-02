$(function () {

    var cy = window.cy = cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        autounselectify: true,
        layout: {
            name: 'dagre'
        },
        style: [
            {
                selector: 'node',
                style: {
                    'content': 'data(id)',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'background-color': 'DeepSkyBlue',
                    'border-width': 2,
                    'border-style': 'solid',
                    'border-color': 'black'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 4,
                    'target-arrow-shape': 'triangle',
                    'line-color': 'DeepSkyBlue',
                    'target-arrow-color': 'DeepSkyBlue',
                    'curve-style': 'bezier',
                    'label': 'data(label)',
                    'edge-text-rotation': 'autorotate'
                }
            },
            {
                selector: '.start',
                style: {
                    'background-color': 'OrangeRed'
                }
            },
            {
                selector: '.finish',
                style: {
                    'background-color': 'GreenYellow'
                }
            },
        ],
        elements: [
            { data: { id: 'q0' }, classes: 'start' },
            { data: { id: 'q2' } },
            { data: { id: 'q3' } },
            { data: { id: 'q4' } },
            { data: { id: 'q1' }, classes: 'finish' },
            { data: { source: 'q0', target: 'q2', label: 'E' } },
            { data: { source: 'q2', target: 'q2', label: 'a' } },
            { data: { source: 'q2', target: 'q3', label: 'b' } },
            { data: { source: 'q3', target: 'q2', label: 'f' } },
            { data: { source: 'q3', target: 'q4', label: 't' } },
            { data: { source: 'q3', target: 'q1', label: 'c' } }
        ],
    });

    var dfs = cy.elements().dfs({
        roots: '#q0',
        directed: true
    });

    for (var i = 0; i < dfs.path.length; i++) {
        var e = dfs.path[i];
        if (e.isNode()) {
            console.log(e.id());
        }
    }

    dfs.path.select();
});