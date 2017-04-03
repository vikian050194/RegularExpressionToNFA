$(function () {
    $(document).ready(function () {
        var cy = window.cy = new cytoscapeFactory().getInstance();

        $("button").click(function () {
            draw();
        });

        $('input').keydown(function (e) {
            if (e.keyCode === 13) {
                draw();
            }
        });

        function draw() {
            var elements = [
                { data: { id: 'q0' }, classes: 'start' },
                { data: { id: 'q1' }, classes: 'finish' },
                { data: { id: 'q2' } },
                { data: { id: 'q3' } },
                { data: { id: 'q4' } },
                { data: { id: 'q5' } },
                { data: { id: 'q6' } },
                { data: { id: 'q7' } },
                { data: { source: 'q0', target: 'q2', label: 'a' } },
                // { data: { source: 'q2', target: 'q2', label: 'a' } },
                { data: { source: 'q2', target: 'q3', label: 'b' } },
                // { data: { source: 'q3', target: 'q3', label: 'c' } },
                { data: { source: 'q3', target: 'q2', label: 'c' } },
                { data: { source: 'q3', target: 'q4', label: '(' } },
                { data: { source: 'q3', target: 'q5', label: '[' } },
                // { data: { source: 'q4', target: 'q4', label: '1' } },
                { data: { source: 'q4', target: 'q6', label: ')' } },
                { data: { source: 'q5', target: 'q6', label: ']' } },
                // { data: { source: 'q5', target: 'q5', label: '0' } },
                { data: { source: 'q6', target: 'q7', label: 'e' } },
                // { data: { source: 'q7', target: 'q7', label: 'q' } },
                { data: { source: 'q7', target: 'q1', label: 'q' } }
            ];

            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                cy.add(element);
            }
            // elements.forEach(cy.add);

            cy.layout({
                name: 'dagre'
            });
        }

        function dfs(root) {
            var dfs = cy.elements().dfs({
                roots: '#' + root,
                directed: true
            });
            var result = [];
            for (var i = 1; i < dfs.path.length; i++) {
                var e = dfs.path[i];
                if (e.isNode()) {
                    result.push(e.id());
                }
            }
            console.log(result);
            return result;
        }

        // dfs('q0');
    });
});