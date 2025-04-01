let display = document.getElementById('display');
function appendValue(val) {
  display.value += val;
}

function deleteAll() {
  display.value = '';
}

function deleteLast() {
  let exp = display.value;
  display.value = exp.slice(0, -1);
}

function evaluateResult() {
  let exp= display.value;
  try {
    let result = eval(exp);
    display.value = result;
  } catch (e) {
    display.value = ' ERROR';
  }
}