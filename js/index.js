$(function () {
    $(document).ready(function () {
        var layout = 'circle';

        $("button").click(function () {
            draw();
        });

        var resetVisualizationType = function () {
            $('ul[class="dropdown-menu"] > li').each(function (i, e) {
                $(e).removeClass('active');
            });
        }
        
        $('ul[class="dropdown-menu"] > li').each(function (i, e) {
            console.log($(e).children());
            $(e).children().click(function (elem) {
                resetVisualizationType();
                $(e).addClass('active');
                layout = this.text;
                draw();
                return false;
            });
        });

        $('input').keydown(function (e) {
            if (e.keyCode === 13) {
                draw();
            }
        });

        $('#regexp').val('(.*AB((C|D*E)F)*G)');
        $('#text').val('AABD');

        function draw() {
            var text = $('#text').val();
            var regexp = $('#regexp').val();
            if (text.lenght !== 0 && regexp.lenght !== 0) {
                var nfa = new NFA(regexp, false);
                //alert(nfa.Recognize(text));
                //nfs.graph.nodes()
                var nfa_vis = new NFA(regexp, true);

                nfa_vis.graph.layout({
                    name: layout
                });
            }
        }
    });
});