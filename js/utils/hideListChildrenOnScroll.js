'use strict';

var is = require('is_js');

/* this will hide elements in a list when they are scrolled out of view. It assumes the list is
   lazy loaded, and new children will be added as the page is scrolled down. This function should
   be called on scroll. It's not attached to the scroll event here so the view can take actions
   like adding children on scroll before the size of the wrapper is calculated.
   */

module.exports = function(listWrapper, itemHeightVal, perRowVal) {
  const childViews = listWrapper.children();
  const itemHeight = is.number(itemHeightVal) ? itemHeightVal : childViews.eq(0)[0].offsetHeight;
  const perRow = perRowVal || 1;
  const listRect = listWrapper[0].getBoundingClientRect();
  const listAbove = listRect.top < 0 ? listRect.top * -1 : 0;
  const hiddenAbove = Math.round(listAbove / itemHeight) > 2 ? Math.round(listAbove / itemHeight) - 2 : 0;
  const listBelow = listRect.bottom - window.innerHeight;
  const hiddenBelow = Math.round(listBelow / itemHeight) > 2 ? Math.round(listBelow / itemHeight) - 2 : 0;

  if (hiddenAbove) childViews.slice(0, hiddenAbove * perRow).addClass('outOfScroll');
  childViews.slice(childViews.length - (hiddenBelow * perRow)).addClass('outOfScroll');
  childViews.slice(hiddenAbove * perRow, childViews.length - (hiddenBelow * perRow)).removeClass('outOfScroll');
};
