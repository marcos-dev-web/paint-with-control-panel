var color = 'black';
var pencil = 'default';
var backgroundColor = 'white';

function changeColor(value) {
  color = value;
}

function changePencil(value) {
  pencil = value;
}

function changeBackground(value) {
  backgroundColor = value;
}

export {
  changeColor,
  changePencil,
  changeBackground,
  color,
  pencil,
  backgroundColor
};