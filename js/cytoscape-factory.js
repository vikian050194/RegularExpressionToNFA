function cytoscapeFactory() {

}

cytoscapeFactory.prototype.getInstance = function () {
    var cy = cytoscape({
        container: document.getElementById('graph-area'),
        boxSelectionEnabled: false,
        autounselectify: true,
        wheelSensitivity: 0.05,
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
                    'background-color': 'DarkGray',
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
                    'target-arrow-color': 'DarkGray',
                    'line-color': 'DarkGray',
                    'curve-style': 'bezier',
                    'label': 'data(label)',
                    'text-outline-color': 'DarkGray',
                    'text-outline-width': 3
                    // 'edge-text-rotation': 'autorotate'
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
                    'background-color': 'YellowGreen'
                }
            },
        ],
        elements: []
        // [
        //         { data: { id: 'q0' }, classes: 'start' },
        //         { data: { id: 'q1' }, classes: 'finish' },
        //         { data: { id: 'q2' } },
        //         { data: { id: 'q3' } },
        //         { data: { id: 'q4' } },
        //         { data: { id: 'q5' } },
        //         { data: { id: 'q6' } },
        //         { data: { id: 'q7' } },
        //         { data: { source: 'q0', target: 'q2', label: 'a' } },
        //         // { data: { source: 'q2', target: 'q2', label: 'a' } },
        //         { data: { source: 'q2', target: 'q3', label: 'b' } },
        //         // { data: { source: 'q3', target: 'q3', label: 'c' } },
        //         { data: { source: 'q3', target: 'q2', label: 'c' } },
        //         { data: { source: 'q3', target: 'q4', label: '(' } },
        //         { data: { source: 'q3', target: 'q5', label: '[' } },
        //         // { data: { source: 'q4', target: 'q4', label: '1' } },
        //         { data: { source: 'q4', target: 'q6', label: ')' } },
        //         { data: { source: 'q5', target: 'q6', label: ']' } },
        //         // { data: { source: 'q5', target: 'q5', label: '0' } },
        //         { data: { source: 'q6', target: 'q7', label: 'e' } },
        //         // { data: { source: 'q7', target: 'q7', label: 'q' } },
        //         { data: { source: 'q7', target: 'q1', label: 'q' } }
        //     ]
    });

    return cy;
}