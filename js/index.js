$(function () {
    $(document).ready(function () {
        var layout = 'circle';
        var useId = false;

        $("button").click(function () {
            draw(false);
        });

        var resetLayoutType = function () {
            $('#layout > li').each(function (i, e) {
                $(e).removeClass('active');
            });
        }

        $('#layout > li').each(function (i, e) {
            $(e).children().click(function (elem) {
                resetLayoutType();
                $(e).addClass('active');
                layout = this.text;
                draw(true);
                return false;
            });
        });

        var resetNodesType = function () {
            $('#nodes > li').each(function (i, e) {
                $(e).removeClass('active');
            });
        }

        $('#nodes > li').each(function (i, e) {
            $(e).children().click(function (elem) {
                resetNodesType();
                $(e).addClass('active');
                useId = i === 0;
                draw(true);
                return false;
            });
        });

        $('input').keydown(function (e) {
            if (e.keyCode === 13) {
                draw(false);
            }
        });

        $('#regexp').val('(.*AB((C|D*E)F)*G)');
        $('#text').val('AABD');

        function draw(justRefresh) {
            var text = $('#text').val();
            var regexp = $('#regexp').val();
            if (text.lenght !== 0 && regexp.lenght !== 0) {
                if (!justRefresh) {
                    var nfa = new NFA(regexp, false, useId);
                    if (nfa.Recognize(text)) {
                        alert('Text does belong to the language!')
                    } else {
                        alert('Text does NOT belong to the language!');
                    }
                }
                var nfa_vis = new NFA(regexp, true, useId);
                nfa_vis.graph.layout({
                    name: layout
                });
            }
        }
    });
});