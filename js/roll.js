/**
 * Created by GaoWei on 2017/5/31.
 */
/*使用方式
 roll.move({
 wraper: 'play',
 imgWrap: 'ul',
 dotWrap: 'ol',
 prev: 'prev',
 next: 'next',
 activeClass: 'active',
 intervalTime: 6000,
 animateTime: 1000
 });*/

var roll = {
    move: function (arg) {
        var wraper = $(this.matchingSelector(arg.wraper))
        var imgWrap = $(this.matchingSelector(arg.imgWrap));
        imgWrap.append(imgWrap.find('li').first().clone());
        var imgLi = imgWrap.find('li');
        var w = wraper.width();
        imgWrap.width(imgLi.length * w);
        imgLi.each(function () {
            $(this).width(w)
        });
        var prev = $(this.matchingSelector(arg.prev));
        var next = $(this.matchingSelector(arg.next));
        var dotWrap = $(this.matchingSelector(arg.dotWrap));
        var dotLi = dotWrap.find('li');
        var activeClass = arg.activeClass;

        var i = 0, timer;

        // 自动播放
        function autoPlay() {
            timer = setInterval(function () {
                i++;
                moveImg(i);
            }, arg.intervalTime);
        }

        autoPlay(); // 页面加载自动播放

        function moveImg(num) {
            if (i == imgLi.length) { // 如果是最后一张图片
                i = 1;
                imgWrap.css({left: 0});
            }
            if (i == -1) { // 如果是第一张
                i = imgLi.length - 2;
                imgWrap.css({left: (imgLi.length - 1) * -w});
            }

            // 移动图片
            imgWrap.stop().animate({left: i * -w}, arg.animateTime);

            // 换小点的标记
            if (i == (imgLi.length - 1)) {
                dotLi.eq(0).addClass(activeClass).siblings().removeClass(activeClass);
            } else {
                dotLi.eq(i).addClass(activeClass).siblings().removeClass(activeClass);
            }
        }

        // 上一张
        prev.click(function () {
            i--;
            moveImg(i);
        });


        // 下一张
        next.click(function () {
            i++;
            moveImg(i);
        });

        // 点击小图标 跳转到指定的图片
        dotLi.click(function () {
            i = $(this).index();
            moveImg(i);
        });

        // 鼠标滑过和离开轮播容器
        wraper.mouseover(function () {
            clearInterval(timer);
        }).mouseout(function () {
            autoPlay();
        });
    },
    matchingSelector: function (selector) {
        selector = $.trim(selector);
        if (selector.slice(0, 1) == '.' || selector.slice(0, 1) == '#') {
            selector = selector;
        } else if ($('#' + selector).length > 0) {
            selector = '#' + selector;
        } else if ($('.' + selector).length > 0) {
            selector = '.' + selector;
        }
        return selector;
    }
}
