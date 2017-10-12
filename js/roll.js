/**
 * Created by GaoWei on 2017/5/31.
 */
/*ʹ�÷�ʽ
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

        // �Զ�����
        function autoPlay() {
            timer = setInterval(function () {
                i++;
                moveImg(i);
            }, arg.intervalTime);
        }

        autoPlay(); // ҳ������Զ�����

        function moveImg(num) {
            if (i == imgLi.length) { // ��������һ��ͼƬ
                i = 1;
                imgWrap.css({left: 0});
            }
            if (i == -1) { // ����ǵ�һ��
                i = imgLi.length - 2;
                imgWrap.css({left: (imgLi.length - 1) * -w});
            }

            // �ƶ�ͼƬ
            imgWrap.stop().animate({left: i * -w}, arg.animateTime);

            // ��С��ı��
            if (i == (imgLi.length - 1)) {
                dotLi.eq(0).addClass(activeClass).siblings().removeClass(activeClass);
            } else {
                dotLi.eq(i).addClass(activeClass).siblings().removeClass(activeClass);
            }
        }

        // ��һ��
        prev.click(function () {
            i--;
            moveImg(i);
        });


        // ��һ��
        next.click(function () {
            i++;
            moveImg(i);
        });

        // ���Сͼ�� ��ת��ָ����ͼƬ
        dotLi.click(function () {
            i = $(this).index();
            moveImg(i);
        });

        // ��껬�����뿪�ֲ�����
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
