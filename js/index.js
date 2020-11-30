window.addEventListener('load', function () {
    //获取元素
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    //鼠标经过focus,就隐藏左右按钮
    focus.addEventListener('mouseover', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
    });
    focus.addEventListener('mouseout', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
    });
    //动态生成小圆圈,小圆圈的个数等于图片的个数
    var ol = document.querySelector('ol');
    var ul = document.querySelector('ul');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        //通过设置自定义属性，记录当前小圆圈的索引号
        li.setAttribute('index', i);
        ol.appendChild(li);
        //小圆圈的排他思想
        var focusWidth = focus.offsetWidth;
        li.addEventListener('click', function () {
            //排除所有人
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //给点击的小圆圈添加current类名
            this.className = 'current';
            //拿到当前小圆圈的索引号
            var index = this.getAttribute('index');
            //当点击li，把index给num
            num = index;
            circle = index;
            //点击小圆圈滚动图片
            animate(ul, -(index * focusWidth));
        })
    }
    ol.children[0].className = 'current';
    //克隆第一张(li)图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击右侧按钮，滚动图片
    var num = 0;
    var circle = 0;
    var flag = true;
    arrow_r.addEventListener('click', function () {
        //无缝滚动，走到了最后一张复制的图片，ul的left值要快速复原
        //num=0,又从头开始滚动
        if (flag) {   //节流阀，防止连续点击造成动画播放过快
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -(num * focusWidth), function () {
                flag = true;
            });
            circle++;
            // 先清除其余小圆圈的current类名
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    })
    //左侧按钮做法
    arrow_l.addEventListener('click', function () {
        //无缝滚动，走到了最后一张复制的图片，ul的left值要快速复原
        //num=0,又从头开始滚动
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * focusWidth + 'px';
        }
        num--;
        animate(ul, -(num * focusWidth));
        circle--;
        // 先清除其余小圆圈的current类名
        if (circle < 0) {
            circle = ol.children.length - 1;
        }
        circleChange();
    })
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //给当前小圆圈添加current类名
        ol.children[circle].className = 'current';
    }
    //自动播放轮播图
    var timer = this.setInterval(function () {
        //手动调用点击事件
        arrow_r.click();
    }, 2000)
})