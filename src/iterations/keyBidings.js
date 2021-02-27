import { save_all, buttonSave } from "./functions.js";
import { alertMsg } from "./alert.js";

const BUTTON_close_header_application = document.getElementById("close_header_application");
const BUTTON_choose_background = document.getElementById("background");
const CANVAS = document.getElementById("root");
const BUTTON_save_all = document.getElementById("save_all");

var globals = {
  changed: false,
  header_application_is_open: false,
  function_to_apply: [],
};

const ha = header_application();
const btns = buttonSave();

function header_application() {
  const el = document.getElementById("header_application");
  return {
    open() {
      document.body.style.overflowX = "hidden";
      el.style = `
      top: 0;
      left: 0;
      position: relative;
      `;
      globals.header_application_is_open = true;
    },
    close() {
      if (globals.changed) {
        function action(result) {
          if (result) {
            globals.function_to_apply = [];
            globals.changed = false;
            ha.close();
            btns.hide();
          }
        }

        alertMsg("exit, without save?", {
          buttonRight: true,
          buttonLeft: true
        }, action);

      } else {
        el.removeAttribute("style");
        globals.header_application_is_open = false;
      }
    },
  };
}


const bidings = {
  m: () => {
    if (globals.header_application_is_open) {
      ha.close();
    } else {
      ha.open();
    }
  },
};

// LISTENERS

window.addEventListener("keydown", (event) => {
  let key = event.key;
  if (bidings[key]) {
    return bidings[key]();
  }
});

BUTTON_close_header_application.addEventListener("click", () => {
  setTimeout(ha.close, 150);
});

BUTTON_choose_background.addEventListener("change", (e) => {
  globals.changed = true;
  btns.show();
  globals.function_to_apply.push(() => {
    setTimeout(() => {
      CANVAS.style.background = e.target.value;
    }, 500);
  });
});

BUTTON_save_all.addEventListener("click", (e) => {
  e.stopPropagation();
  if (globals.changed) {
    save_all(globals.function_to_apply, ha.close);
    alertMsg('All changes saved!', {
      buttonRight: true,
      textButtonRight: 'OK',
    }, ha.close);
    globals.changed = false;
    btns.hide();
    return;
  }
});
