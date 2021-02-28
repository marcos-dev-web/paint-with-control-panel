const alertBox = document.getElementById('alertMessages');
const fieldMessage = alertBox.querySelector('#message p');

const [yes, no] = [
  alertBox.querySelector('#buttons #yes'),
  alertBox.querySelector('#buttons #no'),
]

const functionsAlert = {
  show() {
    alertBox.style.top = '10px';
  },
  hide() {
    alertBox.style.top = '-100%';
    setTimeout(() => {
      alertBox.removeAttribute('style');
      document.querySelector('#buttons #yes').removeAttribute('style');
      document.querySelector('#buttons #no').removeAttribute('style');
      document.getElementById('buttons').removeAttribute('style');
      fieldMessage.textContent = '';
    }, 200);
  },
}

export function alertMsg(msg, {buttonLeft, buttonRight, textButtonLeft, textButtonRight}, callback) {
  functionsAlert.show();
  fieldMessage.textContent = msg;

  if (!buttonLeft) {
    document.querySelector('#buttons #no').style.display = 'none';
  }
  if (!buttonRight) {
    document.querySelector('#buttons #yes').style.display = 'none';
  }
  no.textContent = textButtonLeft ? textButtonLeft : 'no';
  yes.textContent = textButtonRight ? textButtonRight : 'yes';

  if (buttonLeft && !buttonRight || buttonRight && !buttonLeft) {
    document.getElementById('buttons').style.justifyContent = 'flex-end';
  }

  function y(e) {
    e.stopPropagation();
    functionsAlert.hide();
    no.removeEventListener('click', n)
    return callback(true)
  }
  
  function n(e) {
    e.stopPropagation();
    functionsAlert.hide();
    yes.removeEventListener('click', y)
    return callback(false)
  }

  yes.addEventListener('click', y, {
    once: true
  })

  no.addEventListener('click', n, {
    once: true,
  })
}