import { save_all, buttonSave, header_application } from "./functions.js";
import { alertMsg } from "./alert.js";
import {changeColor, changePencil, changeBackground, backgroundColor} from '../settings.js';

const CANVAS = document.getElementById("root");

const buttonCloseHeaderApplication = document.getElementById(
  "close_header_application"
);
const buttonChooseBackground = document.getElementById("background");
const buttonChoosePaintColor = document.getElementById('paint_color');
const buttonSaveAll = document.getElementById("save_all");

var globals = {
  needSave: false,
  headerApplicationIsOpen: false,
  configsToSave: [],
};

const btns = buttonSave();
const ha = header_application(
  btns,
  (res) => {
    for (let key in res) {
      globals[key] = res[key];
    }
  },
  btns
);

const listBidings = {
  m: () => {
    if (globals.headerApplicationIsOpen) {
      ha.close(globals.needSave);
    } else {
      ha.open();
    }
  },
  b: () => {
    changePencil('del');
    CANVAS.style = `cursor: url('src/img/mouse.png'), pointer;`;
  },
  p: () => {
    changePencil('draw');
    CANVAS.removeAttribute('style');
  }
};

function backgrounColorChanged(e) {
  globals.needSave = true;
  btns.show();
  globals.configsToSave.push(() => {
    setTimeout(() => {
      document.body.style.background = e.target.value;
      changeBackground(e.target.value);
    }, 500);
  });
}

function changeColorPaint(e) {
  globals.needSave = true;
  btns.show();
  globals.configsToSave.push(() => {
    changeColor(e.target.value);
  });
}

function saveConfigs() {
  if (globals.needSave) {
    save_all(globals.configsToSave, () => ha.close(globals.needSave));
    alertMsg(
      "All changes saved!",
      {
        buttonRight: true,
        textButtonRight: "OK",
      },
      () => ha.close(globals.needSave)
    );
    globals.needSave = false;
    btns.hide();
    return;
  }
}

function closeWithDaley() {
  setTimeout(() => {
    ha.close(globals.needSave);
  }, 150);
}

buttonCloseHeaderApplication.onclick = closeWithDaley;
buttonChooseBackground.onchange = backgrounColorChanged;
buttonSaveAll.onclick = saveConfigs;
buttonChoosePaintColor.onchange = changeColorPaint;

window.addEventListener("keydown", (event) => {
  let key = event.key;
  if (listBidings[key]) {
    return listBidings[key]();
  }
});
