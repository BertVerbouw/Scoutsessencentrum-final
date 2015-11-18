function setMail(leiding) {

    document.getElementById(leiding).innerHTML = '<a href="mailto:' + leiding + 'leiding@scoutsessencentrum.be">' + leiding + 'leiding@scoutsessencentrum.be';

}

var largeNav = function () {
    var top = document.body;
    if (top.scrollTop === 0 && !document.getElementById("toggleButton").isVisible()) {
        document.getElementById("navbar").setAttribute("class", "navbar navbar-default navbar-fixed-top largeNav");
        document.getElementById("scrollable").setAttribute("class", "scrolledTop");
        document.getElementById("logo-no-background").setAttribute("class", "logo-visible");
    } else {
        document.getElementById("navbar").setAttribute("class", "navbar navbar-default navbar-small navbar-fixed-top");
        document.getElementById("scrollable").setAttribute("class", "");
        document.getElementById("logo-no-background").setAttribute("class", "logo-hidden");
    }

}

var onLoad = function () {
    largeNav();
    var x = document.getElementById("logo-no-background");
    x.src = "images/logo_black_no_background.png";

}

window.onload = onLoad;
window.onscroll = largeNav;
window.onresize = largeNav;

Element.prototype.isVisible = function () {

    'use strict';

    /**
     * Checks if a DOM element is visible. Takes into
     * consideration its parents and overflow.
     *
     * @param (el)      the DOM element to check if is visible
     *
     * These params are optional that are sent in recursively,
     * you typically won't use these:
     *
     * @param (t)       Top corner position number
     * @param (r)       Right corner position number
     * @param (b)       Bottom corner position number
     * @param (l)       Left corner position number
     * @param (w)       Element width number
     * @param (h)       Element height number
     */
    function _isVisible(el, t, r, b, l, w, h) {
        var p = el.parentNode,
            VISIBLE_PADDING = 2;

        if (!_elementInDocument(el)) {
            return false;
        }

        //-- Return true for document node
        if (9 === p.nodeType) {
            return true;
        }

        //-- Return false if our element is invisible
        if (
            '0' === _getStyle(el, 'opacity') ||
            'none' === _getStyle(el, 'display') ||
            'hidden' === _getStyle(el, 'visibility')
        ) {
            return false;
        }

        if (
            'undefined' === typeof (t) ||
            'undefined' === typeof (r) ||
            'undefined' === typeof (b) ||
            'undefined' === typeof (l) ||
            'undefined' === typeof (w) ||
            'undefined' === typeof (h)
        ) {
            t = el.offsetTop;
            l = el.offsetLeft;
            b = t + el.offsetHeight;
            r = l + el.offsetWidth;
            w = el.offsetWidth;
            h = el.offsetHeight;
        }
        //-- If we have a parent, let's continue:
        if (p) {
            //-- Check if the parent can hide its children.
            if (('hidden' === _getStyle(p, 'overflow') || 'scroll' === _getStyle(p, 'overflow'))) {
                //-- Only check if the offset is different for the parent
                if (
                    //-- If the target element is to the right of the parent elm
                    l + VISIBLE_PADDING > p.offsetWidth + p.scrollLeft ||
                    //-- If the target element is to the left of the parent elm
                    l + w - VISIBLE_PADDING < p.scrollLeft ||
                    //-- If the target element is under the parent elm
                    t + VISIBLE_PADDING > p.offsetHeight + p.scrollTop ||
                    //-- If the target element is above the parent elm
                    t + h - VISIBLE_PADDING < p.scrollTop
                ) {
                    //-- Our target element is out of bounds:
                    return false;
                }
            }
            //-- Add the offset parent's left/top coords to our element's offset:
            if (el.offsetParent === p) {
                l += p.offsetLeft;
                t += p.offsetTop;
            }
            //-- Let's recursively check upwards:
            return _isVisible(p, t, r, b, l, w, h);
        }
        return true;
    }

    //-- Cross browser method to get style properties:
    function _getStyle(el, property) {
        if (window.getComputedStyle) {
            return document.defaultView.getComputedStyle(el, null)[property];
        }
        if (el.currentStyle) {
            return el.currentStyle[property];
        }
    }

    function _elementInDocument(element) {
        while (element = element.parentNode) {
            if (element == document) {
                return true;
            }
        }
        return false;
    }

    return _isVisible(this);

};