var $ = require('jquery');

var tooltipEl = document.createElement('div');
tooltipEl.className = 'tooltip';

function getTargetInfo(el) {
    var space = 4;
    var offset = $(el).offset();
    var rect = el.getBoundingClientRect();
    var elMidX = offset.left + rect.width / 2;
    var elMidY = offset.top + rect.height / 2;
    var showBelow = elMidY < window.innerHeight / 2;
    return {
        showBelow: showBelow,
        x: elMidX,
        y: showBelow ? offset.top + rect.height + space : offset.top - space
    };
}

module.exports = {
  show: function(evt) {
    var simpleTooltip = evt.target.getAttribute('simple-tooltip');
    if (simpleTooltip) {
        tooltipEl.textContent = simpleTooltip;
        document.body.appendChild(tooltipEl);
        var rect = tooltipEl.getBoundingClientRect();
        var target = getTargetInfo(evt.target);
        var offsetY = target.showBelow ? 0 : -rect.height;
        tooltipEl.style.left = Math.min(window.innerWidth - 5, Math.max(5, target.x - rect.width / 2));
        tooltipEl.style.top = target.y + offsetY;
    }
  },
  hide: function(evt) {
    if (evt.target.getAttribute('simple-tooltip')) {
        document.body.removeChild(tooltipEl);
    }
  }
};
