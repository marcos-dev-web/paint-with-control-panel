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
  const button = document.getElementById('save_all');

  return {
    hide() {
      button.removeAttribute('style');
    },
    show() {
      button.style = `
        opacity: 1;
        pointer-events: all;
      `
    }
  }
}