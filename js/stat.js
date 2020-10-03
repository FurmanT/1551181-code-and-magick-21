'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;
var BAR_GAP = 50;
var TEXT_HEIGHT = 10;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var COLOR_CURRENT_USER = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx) {
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + (GAP * 2));
};


var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderText(ctx);
  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {

    var time = Number.parseInt(times[i], 10);
    if (names[i] === 'Вы') {
      ctx.fillStyle = COLOR_CURRENT_USER;
    } else {
      var saturation = Math.floor(Math.random() * 101);
      ctx.fillStyle = "hsl(244, " + saturation + "%, 47%)";
    }

    var heigthBar = (BAR_MAX_HEIGHT * time) / maxTime;
    ctx.fillRect(
        CLOUD_X + 2 * GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - heigthBar - TEXT_HEIGHT - GAP,
        BAR_WIDTH,
        heigthBar
    );
    ctx.fillStyle = '#000';
    ctx.textBaseline = 'hanging';
    ctx.fillText(
        names[i],
        CLOUD_X + 2 * GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - GAP
    );
    ctx.fillText(
        time,
        CLOUD_X + 2 * GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - GAP - TEXT_HEIGHT - heigthBar - GAP - TEXT_HEIGHT
    );
  }
};

