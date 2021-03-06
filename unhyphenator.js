var Unhyphenator = (function () {
    "use strict";

    var shy = /(?:\u00AD|\&#173;|\&shy;)/g;
    var zws = /(?:\u200B|\&#8203;)/g;

    var shyFilter = function (text) {
        return text.replace(shy, '');
    };

    var zwsFilter = function (text) { 
        return text.replace(zws, '');
    };

    function Unhyphenator(filters) {
        if (!filters) filters = [shyFilter, zwsFilter];
        var self = this;
        this.shy = shy;
        this.boundHandler = function (ev) {
            self.handler(ev, filters);
        };
    }

    // Active the handler.
    Unhyphenator.prototype.start = function (el) {
        el = el || document.body;
        if (window.addEventListener) {
            el.addEventListener("copy", this.boundHandler, true);
        } else {
            el.attachEvent("oncopy", this.boundHandler);
        }
    };

    // Deactivate the handler.
    Unhyphenator.prototype.stop = function (el) {
        el = el || document.body;
        if (window.removeEventListener) {
            el.removeEventListener("copy", this.boundHandler, true);
        } else {
            el.detachEvent("oncopy", this.boundHandler);
        }
    };

    // Build the handler.
    Unhyphenator.prototype.handler = function (e, filters) {
        var i;
        var target = e.target || e.srcElement,
            document = target.ownerDocument,
            body = document.body,
            window = document.defaultView || document.parentWindow;
        var shadow = document.createElement("div");

        // Make the shadow invisible.
        var shadowColor = window.getComputedStyle ?
            window.getComputedStyle(body, null) :
            "#FFFFFF";
        shadow.style.color = shadowColor;
        shadow.style.fontsize = '0px';
        body.appendChild(shadow);

        var sel, range;

        if (window.getSelection !== undefined) {
            e.stopPropagation();
            sel = window.getSelection();
            range = sel.getRangeAt(0);
            shadow.appendChild(range.cloneContents());
            for (i = 0; i<filters.length; i++)
                shadow.innerHTML = filters[i](shadow.innerHTML);
            sel.selectAllChildren(shadow);
            window.setTimeout(function () {
                shadow.parentNode.removeChild(shadow);
                //sel.removeAllRanges(); // IE
                sel.addRange(range);
            }, 0);
        } else {                // IE
            sel = document.selection;
            range = sel.createRange();
            for (i = 0; i<filters.length; i++)
                shadow.innerHTML = filters[i](range.htmlText);
            var range2 = body.createTextRange();
            range2.moveToElementText(shadow);
            range2.select();
            window.setTimeout (function () {
                shadow.parentNode.removeChild(shadow);
                if (range.text) {
                    range.select();
                }
            }, 0);
        }
    };

    return Unhyphenator;
})();
