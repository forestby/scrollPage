(function () {
    var tpl = `<div class="scroll_sideIndex">
        <ul></ul></div>`;

    function ScrollPage () {
        this.scrollWrap = _.$('.scroll_wrap');
        this.scrollSections = document.querySelectorAll('.scroll_wrap .scroll_section');
        this.index = 0;        
        this.setSize();
        this.createSide();
        this.initEvent();
        this.stepPage(0);
    };

    ScrollPage.prototype.createSide = function () {
        var side = _.html2node(tpl);
        this.scrollWrap.parentNode.appendChild(side);

        for (var i = 0, len = this.scrollSections.length; i < len; i++) {
            var li = document.createElement('li');
            _.$('ul', side).appendChild(li);
        }

        this.lis = document.querySelectorAll('.scroll_sideIndex li');
    }

    ScrollPage.prototype.initEvent = function () {
        // resize 事件重新调整宽高
        window.addEventListener('resize', function (e) {
            this.setSize();
        }.bind(this));

        //下滑滚动事件
        var mousewheelHandler = function (e) {
            if (e.wheelDelta < 0) {
                //下滚
                if (this.index < this.scrollSections.length - 1) {
                    this.stepPage(this.index + 1);
                }
            } else {
                if (this.index > 0) {
                    this.stepPage(this.index - 1);
                }
            }
        }.bind(this);
        this.scrollWrap.addEventListener('mousewheel', mousewheelHandler);

        //侧边栏点击
        var clickHandler = function (i) {
            return function () {
                this.stepPage(i);
            }.bind(this);
        }.bind(this);
        for (var i = 0, len = this.lis.length; i < len; i++) {
            this.lis[i].addEventListener('click', clickHandler(i));
        }
    };

    ScrollPage.prototype.stepPage = function (n) {
        this.lis[this.index].className = '';
        this.index = n;
        var height = -this.pageHeight * this.index;
        this.scrollWrap.style.top = height + 'px';
        this.lis[this.index].className = 'active';
    };

    ScrollPage.prototype.setSize = function () {
        this.pageWidth = window.innerWidth;
        this.pageHeight = window.innerHeight;

        this.scrollWrap.style.width = this.pageWidth + 'px';
        Array.prototype.forEach.call(this.scrollSections, function (sct) {
            sct.style.width = this.pageWidth + 'px';
            sct.style.height = this.pageHeight + 'px';
        }.bind(this));
    };

    document.addEventListener('DOMContentLoaded', function (e) {
        new ScrollPage();
    });
})()