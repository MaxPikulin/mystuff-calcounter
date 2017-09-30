const plusBtn = document.getElementsByClassName('plusbtn')[0];
const mainWindow = document.getElementsByClassName('mainwindow')[0];
const totalDiv = document.getElementsByClassName('total')[0];
// let rowCount = 0;
let fieldsObj = {};

function storeData() {
  localStorage.setItem('current', JSON.stringify(fieldsObj));
}

function restoreData() {
  fieldsObj = localStorage.getItem('current');
  for (let row in fieldsObj) {
    addRow(row);
  }
}

function addRow(rowData) {
  // rowCount++;
  //debugger;
  const {
    num = '',
      name = '',
      cal = '',
      weight = '',
      result = ''
  } = (rowData || {});
  let row = document.createElement('div');
  row.classList.add('rows');
  row.id = num;
  row.innerHTML = `
    <input type="text" class="name" value="${name}"><input type="text" class="cal" value="${cal}"><input type="text" class="weight" value="${weight}"><div class="result">${result}</div><button name="delrowbtn" class="delrow">X</button>
`;
  mainWindow.insertBefore(row, plusBtn);
  row.children[0].focus();
}

function handleChange(e) {
  console.log(e);
  let target = e.target;
  let parent = target.parentNode;
  let cal = parent.getElementsByClassName('cal')[0].value;
  let weight = parent.getElementsByClassName('weight')[0].value;
  let result = parent.getElementsByClassName('result')[0];


  if (e.which == 13) {
    if (target.classList.value.includes('weight')) {
      addRow();
    }
    target.nextSibling.focus();
  }

  if (weight.includes('-')) {
    weight = weight.split('-').reduce((a, v) => +a - +v);
  } else {
    weight = parseInt(weight);
  }

  let calc = cal * weight / 100;
  if (isNaN(calc)) {
    result.textContent = '';
    total();
    return;
  }
  result.textContent = calc.toFixed(2);
  total();
  //store();
}

function handleClick(e) {
  if (e.target.name != "delrowbtn") return;
  e.target.parentNode.remove();
  rowCount--;
}

function total() {
  let allResults = document.querySelectorAll('.result');
  let total = 0;
  allResults.forEach(node => total += +node.textContent);
  totalDiv.textContent = total.toFixed(2);
}

addRow();
//restore();

plusBtn.addEventListener('click', addRow);
mainWindow.addEventListener('change', handleChange);
mainWindow.addEventListener('keyup', handleChange);
mainWindow.addEventListener('click', handleClick);
