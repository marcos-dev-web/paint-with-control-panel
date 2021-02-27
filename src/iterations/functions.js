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
