'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 20;
const BAR_GAP = 50;
const TEXT_HEIGHT = 10;
const BAR_MAX_HEIGHT = 150;
const BAR_WIDTH = 40;
const COLOR_CURRENT_USER = "rgba(255, 0, 0, 1)";
const CLOUD_COLOR = "#fff";
const CLOUD_SHADE = "rgba(0, 0, 0, 0.7)";
const TEXT_COLOR = "#000000";

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const renderText = function (ctx) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = "16px PT Mono";
  ctx.textBaseline = "hanging";
  ctx.fillText("Ура вы победили!", CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText("Список результатов:", CLOUD_X + GAP, CLOUD_Y + (GAP * 2));
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, CLOUD_SHADE);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  renderText(ctx);
  let maxTime = getMaxElement(times);
  for (let i = 0; i < names.length; i++) {

    let time = Number.parseInt(times[i], 10);
    if (names[i] === 'Вы') {
      ctx.fillStyle = COLOR_CURRENT_USER;
    } else {
      let saturation = Math.floor(Math.random() * 101);
      ctx.fillStyle = "hsl(244, " + saturation + "%, 47%)";
    }

    let heigthBar = (BAR_MAX_HEIGHT * time) / maxTime;
    ctx.fillRect(
        CLOUD_X + 2 * GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - heigthBar - TEXT_HEIGHT - GAP,
        BAR_WIDTH,
        heigthBar
    );
    ctx.fillStyle = TEXT_COLOR;
    ctx.textBaseline = "hanging";
    ctx.fillText(
        names[i],
        CLOUD_X + 2 * GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - GAP
    );
    ctx.fillText(
        time,
        CLOUD_X + 2 * GAP + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_HEIGHT - GAP - TEXT_HEIGHT - heigthBar - (GAP / 2) - TEXT_HEIGHT
    );
  }
};

