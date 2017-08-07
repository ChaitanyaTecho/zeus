(function($) {

    $.fn.extend({
        spinIt: function(options) {
            var colors = [];
            getRandomColor = function() {
                var color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

                if (colors.indexOf(color) != -1)
                    color = getRandomColor();
                else {
                    colors.push(color)
                    return color;
                }
                return color;
            }
            var defaults = {
                angle: 90,
                angleOffset: -90,
                speed: 5000,
                easing: "easeInOutElastic",
            };

            var opt = $.extend(defaults, options);
            var data = [];

            for (var i = 1; i <= opt.numOfDivs; i++) {
                data.push({
                    text: i,
                    color: getRandomColor()
                });
            }



            return this.each(function() {
                var o = opt;

                var angle = o.angle,
                    angleOffset = o.angleOffset,
                    speed = o.speed,
                    esing = o.easing,
                    itemSize = data.length,
                    itemSelector = "item",
                    d = 360 / itemSize,
                    $wrap = $(this),
                    $btnStart = $wrap.find("#btn-start"),
                    $spinner = $wrap.find(".spinner"),
                    wrapW = $wrap.width(),
                    borderTopWidth = wrapW,
                    borderRightWidth = tanDeg(d);
                $spinner.empty();
                for (i = 0; i < itemSize; i++) {
                    var label = i + 1;
                    var itemHTML = $('<div class="' + itemSelector + '"><div>' + label + '</div></div>'),
                        idx = i;

                    $spinner.append(itemHTML);
                    $spinner.children("." + itemSelector).eq(idx).css({
                        "left": wrapW / 2,
                        "top": -wrapW / 2,
                        "border-top-width": borderTopWidth,
                        "border-right-width": borderRightWidth,
                        "border-top-color": data[idx].color,
                        "transform": "rotate(" + i * d + "deg)"
                    });
                    if (itemSize > 5) {
                        $spinner.children("." + itemSelector).eq(idx).children('div').css({
                            "width": borderRightWidth / 4
                        });
                        if (idx < 10) {
                            $spinner.children("." + itemSelector).eq(idx).children('div').css({
                                "width": borderRightWidth / 4 + 15
                            });
                        }
                    } else {
                        $spinner.children("." + itemSelector).eq(idx).children('div').css({
                            "width": borderRightWidth / 8
                        });
                        if (idx < 10) {
                            $spinner.children("." + itemSelector).eq(idx).children('div').css({
                                "width": borderRightWidth / 8 + 15
                            });
                        }
                    }
                    $spinner.children("." + itemSelector).eq(idx).attr('deg', i * d);
                }

                function tanDeg(deg) {
                    var rad = deg * Math.PI / 180;
                    return wrapW / (1 / Math.tan(rad));
                }


                function rotateIt() {
                    var randomNumForAnimTime = (Math.round(Math.random() * 2000)) * 10;
                    $spinner.css('transform', 'rotate(' + randomNumForAnimTime + 'deg)');

                    var deg = Math.abs((randomNumForAnimTime % 360) - 360);
                    var each = 360 / data.length;
                    var diff = Math.abs(each - deg);
                    var selected = 0;
                    $('.item').each(function() {
                        var low = parseInt($(this).attr('deg'));
                        var high = parseInt($(this).next().attr('deg'));
                        if (diff >= low && diff < high) {
                            selected = $(this).next().find('div').html();
                        }
                    });
                    console.log(selected)
                }
                $('#btn-start').click(function(e) {
                    e.stopImmediatePropagation();
                    rotateIt();
                });

            });
        }
    });
})(jQuery);

$(function() {

    $('.spinner-box').spinIt({
        numOfDivs: 10
    });
    $("form").submit(function(e) {
        e.preventDefault();
        $('.spinner-box').spinIt({
            numOfDivs: $('#getNumber').val()
        });

    });
});