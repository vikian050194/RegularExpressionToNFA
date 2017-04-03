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
                { data: { source: 'q0', target: 'q1', label: 'a' } },
            ];

            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                cy.add(element);
            }
            // elements.forEach(cy.add);

            cy.layout({
                name: 'dagre'
            }).run();
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