// tweaked version of:
// http://stackoverflow.com/a/22480938
function isScrolledIntoView(el, scrollContainer) {
  var elemTop = el.getBoundingClientRect().top;
  var elemBottom = el.getBoundingClientRect().bottom;

  scrollContainer = scrollContainer || window;

  var isVisible = (elemTop >= 0) && (elemBottom <= scrollContainer.clientHeight);
  return isVisible;
}

module.exports = {
  isScrolledIntoView: isScrolledIntoView
}