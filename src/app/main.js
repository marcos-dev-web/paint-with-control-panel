import {color, pencil} from '../settings.js';

const canvas = document.getElementById('root');
const context = canvas.getContext('2d');

const d = (x, y) => {
  context.fillStyle = color;
  context.fillRect(x, y, 10, 10);
}

const c = (x, y) => {
  context.clearRect(x, y, 10, 10);
}

$("#root").mousedown(function (e) {
  const {offsetX, offsetY} = e;
    if (pencil == 'draw') {
      d(offsetX, offsetY);
    } else if (pencil == "del") {
      c(offsetX, offsetY);
    }
  $(this).mousemove(function (e) {
    const {offsetX, offsetY} = e;
    if (pencil == 'draw') {
      d(offsetX, offsetY);
    } else if (pencil == "del") {
      c(offsetX, offsetY);
    }
  });
}).mouseup(function () {
  $(this).unbind('mousemove');
}).mouseout(function () {
  $(this).unbind('mousemove');
});