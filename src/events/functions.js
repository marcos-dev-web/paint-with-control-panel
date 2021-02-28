import { alertMsg } from "./alert.js";

export function save_all(functions = [], exec) {
  functions.forEach((func) => {
    func();
  });
  if (exec) {
    setTimeout(() => {
      exec();
    }, 500);
  }
}

export function buttonSave() {
  const button = document.getElementById("save_all");

  return {
    hide() {
      button.removeAttribute("style");
    },
    show() {
      button.style = `
        opacity: 1;
        pointer-events: all;
      `;
    },
  };
}

export function header_application(btns, callback) {
  const header = document.getElementById("header_application");
  const body = document.body;

  const actions = {
    open() {
      body.style.overflowX = "hidden";

      header.style = `
        top: 0;
        left: 0;
        position: relative;
      `;
      callback({ headerApplicationIsOpen: true });
    },
    close(changed) {
      if (changed) {
        function action(result) {
          if (result) {
            callback({
              configsToSave: [],
              needSave: false,
              headerApplicationIsOpen: false,
            });
            btns.hide();
            header.removeAttribute("style");
          }
        }

        alertMsg(
          "exit, without save?",
          {
            buttonRight: true,
            buttonLeft: true,
          },
          action
        );
      } else {
        callback({ headerApplicationIsOpen: false });
        header.removeAttribute("style");
      }
    },
  };

  return actions;
}
