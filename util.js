(function () {
    if (!window._) {
        window._ = {};
    }

    function $ (selector, node) {
        return (node || document).querySelector(selector);
    }
    _.$ = $;

    function html2node (t) {
        var div = document.createElement('div');
        div.innerHTML = t;
        return div.firstElementChild;
    }
    _.html2node = html2node;
})()