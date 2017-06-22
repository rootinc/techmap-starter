(function($){
    var defaults = {
        zoom: .1,
		maxZoom: 3.0,
		dblClickZoom:2.5,
		zoomControls:true
    };
    var wheel;

    if ( document.onmousewheel !== undefined ) { // Webkit/Opera/IE
        wheel = 'onmousewheel';
    }
    else if ( document.onwheel !== undefined) { // FireFox 17+
        wheel = 'onwheel';
    }

    $.fn.zoomWindow = function(options){
        var settings = $.extend({}, defaults, options);

        if (!this[0] || !wheel || !('backgroundSize' in this[0].style)) { // do nothing in IE8 and lower
            return this;
        }

        return this.each(function(){
            var img = this,
                $img = $(img);

            function loaded() {
                var width = $img.width(),
                    height = $img.height(),
                    bgWidth = width,
                    bgHeight = height,
                    bgPosX = 0,
                    bgPosY = 0,
                    dblClicked = false,
                    totalZoom = 1,
                    scaling = false,
                    dragging = false,
                    startX = 0,
                    startY = 0,
                    lastTouchDist = 0;
				
				if (settings.zoomControls)
				{
					$img.append('<div class="zoom"><span class="plus">+</span><span class="minus">&ndash;</span></div>');
				}

                function reset() {
                    bgWidth = width;
                    bgHeight = height;
                    bgPosX = bgPosY = 0;
                    totalZoom = 1;
                    updateBgStyle();
                }

                function updateBgStyle() {
                    if (bgPosX > 0) {
                        bgPosX = 0;
                    } else if (bgPosX < width - bgWidth) {
                        bgPosX = width - bgWidth;
                    }

                    if (bgPosY > 0) {
                        bgPosY = 0;
                    } else if (bgPosY < height - bgHeight) {
                        bgPosY = height - bgHeight;
                    }

                    img.style.backgroundSize = bgWidth+'px '+bgHeight+'px';
                    img.style.backgroundPosition = bgPosX+'px '+bgPosY+'px';
                }

                function mainZoom(offsetX, offsetY, deltaY, zoomAmount) {
                    var bgCursorX = offsetX - bgPosX;
                    var bgCursorY = offsetY - bgPosY;
                    var bgRatioX = bgCursorX/bgWidth;
                    var bgRatioY = bgCursorY/bgHeight;

                    if (deltaY < 0) {
                        bgWidth += bgWidth*zoomAmount;
                        bgHeight += bgHeight*zoomAmount;
                        totalZoom += Math.round(zoomAmount * 10) / 10;
                    } else {
                        bgWidth -= bgWidth*zoomAmount;
                        bgHeight -= bgHeight*zoomAmount;
                        totalZoom -= Math.round(zoomAmount * 10) / 10;
                    }
                    totalZoom = Math.round(totalZoom * 10) / 10;
                    bgPosX = offsetX - (bgWidth * bgRatioX);
                    bgPosY = offsetY - (bgHeight * bgRatioY);

                    if (bgWidth <= width || bgHeight <= height) {
                        reset();
                    } else {
                        updateBgStyle();
                    }
                }

                $img.css({
                    backgroundSize: width+'px '+height+'px',
                    backgroundPosition: '0 0'
                }).bind('zoomWindow.reset', reset);

                img[wheel] = function (e) {
                    var deltaY = 0;

                    e.preventDefault();

                    if (e.deltaY) { // FireFox 17+ (IE9+, Chrome 31+?)
                        deltaY = e.deltaY;
                    } else if (e.wheelDelta) {
                        deltaY = -e.wheelDelta;
                    }

                    var offsetParent = $img.offset();
                    var offsetX = e.pageX - offsetParent.left;
                    var offsetY = e.pageY - offsetParent.top;

                    if (!(deltaY < 0 && totalZoom >= settings.maxZoom)) {
                        mainZoom(offsetX, offsetY, deltaY, settings.zoom);
                    }
                };

                $img.on('dblclick', function(e) {
                    var deltaY = -1;
                    e.preventDefault();
                    var offsetParent = $img.offset();
                    var offsetX = e.pageX - offsetParent.left;
                    var offsetY = e.pageY - offsetParent.top;

                    if (dblClicked) {
                        reset();
                        dblClicked = false;
                    } else if (totalZoom < settings.dblClickZoom) {
                        mainZoom(offsetX, offsetY, deltaY, settings.dblClickZoom-totalZoom);
                        dblClicked = true;
                    } else {
                        dblClicked = true;
                    }
                }).on('touchstart',function (event) {
                    event.preventDefault();
                    if (event.originalEvent.touches.length === 2) {
                        scaling = true;
                    }
                }).on('touchmove',function (event) {
                    event.preventDefault();
                    if (scaling) {
                        var e = event.originalEvent;
                        var dist = Math.sqrt(Math.pow((e.touches[0].clientX - e.touches[1].clientX), 2) + Math.pow((e.touches[0].clientY - e.touches[1].clientY), 2));
                        if (totalZoom <= settings.maxZoom || (lastTouchDist - dist) > 0) {
                            mainZoom(457, 230, lastTouchDist - dist, settings.zoom);
                        }
                        lastTouchDist = dist;
                    }
                }).on('touchend', function (e) {
                    e.preventDefault();
                    if (scaling) {
                        scaling = false;
                    }
                    lastTouchDist = 0;
                });

                function startDrag(event) {
                    event.preventDefault();
                    dragging = true;

                    var x = event.pageX;
                    var y = event.pageY;
                    if (event.type === 'touchstart') {
                        event.preventDefault();
                        var e = event.originalEvent;

                        if (e.touches.length > 1) {
                            return;
                        }
                        x = e.touches[0].clientX;
                        y = e.touches[0].clientY;
                    }

                    startX = x - $img.offset().left;
                    startY = y - $img.offset().top;
                }

                $img.mousedown(startDrag).on('touchstart', startDrag);

                function drag(event) {
                    event.preventDefault();
                    var x = event.pageX;
                    var y = event.pageY;
                    if (event.type === 'touchmove') {
                        event.preventDefault();
                        var e = event.originalEvent;
                        if (e.touches.length > 1) {
                            return;
                        }
                        x = e.touches[0].clientX;
                        y = e.touches[0].clientY;
                    }
                    var differenceX = startX - (x - $img.offset().left);
                    var differenceY = startY - (y - $img.offset().top);

                    if (dragging) {
                        updateContentPosition(-differenceX, -differenceY);
                    }

                    startX = x - $img.offset().left;
                    startY = y - $img.offset().top;
                }

                $img.mousemove(drag).on('touchmove', drag);


                function stopDrag(event) {
                    event.preventDefault();
                    dragging = false;
                }

                $img.mouseup(stopDrag).mouseout(stopDrag).on('touchend', stopDrag);

				if (settings.zoomControls)
				{
					$img.find('.zoom .plus').on('touchstart click dblclick', function(event) {
						event.preventDefault();
						event.stopPropagation();
						if (totalZoom <= settings.maxZoom) {
							mainZoom(457, 230, -1, settings.zoom);
						}
					});

					$img.find('.zoom .minus').on('touchstart click dblclick', function (event) {
						event.preventDefault();
						event.stopPropagation();
						mainZoom(457, 230, 1, settings.zoom);
					});
				}

                function updateContentPosition(left, top) {
                    bgPosX += left;
                    bgPosY += top;
                    updateBgStyle();
                }
            }

            $img.one('load', loaded);
            loaded();

        });
    };

    $.fn.zoomWindow.defaults = defaults;

}(window.jQuery));
