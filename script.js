// global vars
const mainWindow = document.getElementById('mainWindow');
const addRowBtn = document.getElementById('addRowBtn');
const totalDiv = document.getElementById('total');
const resetBtn = document.getElementById('resetWindow');
let recipeObject = {
  rowNumber: 0
};

function storeData() {
  // TODO: Store fields data in object and save it to localstorage.
  localStorage.setItem('currentRecipe', JSON.stringify(recipeObject));
}

function saveRecipeObject(parent, itemName, calories, weight, result) {
  // TODO: save changes to object that represent all fields.
  recipeObject[parent.dataset.rownumber] = {
    id: parent.dataset.rownumber,
    itemName,
    calories,
    weight,
    result
  };
  storeData();
}

function fillData() {
  // TODO: fetch data from localstorage and generate proper set of fields.
  // if localStorage empty - add first row and return
  if (!localStorage.getItem('currentRecipe')) {
    addRowHandler();
    return;
  }
  recipeObject = JSON.parse(localStorage.getItem('currentRecipe'));
  for (let row in recipeObject) {
    if (row == 'rowNumber') continue;
    composeRow(recipeObject[row]);
  }
  calculateTotal();
}

function calculateTotal() {
  // TODO: get all row results, calculate total.
  const allResults = Array.from(document.getElementsByClassName('result'));
  totalDiv.textContent = (allResults.reduce((a, v) => a + (+v.textContent), 0)).toFixed(2) || '0.00';
}

// helper func just to get rid of event argument and send right rowNumber
function addRowHandler() {
  changeHandler(composeRow());
}

function keyHandler(e) {
  const field = e.target.classList.value;
  const key = e.key;
  // console.log(field, e);
  if ((field == 'calories' || field == 'weight') && !('0123456789-+*/.'.includes(key))) {
    e.preventDefault();
    return;
  }
}

// helper function that compose row and insert data if available
function composeRow(rowObj = {}) {
  const {
    id = '',
      itemName = '',
      calories = '',
      weight = '',
      result = ''
  } = rowObj;
  let row = document.createElement('div');
  row.innerHTML = ` <div class="rows" data-rownumber="${id || recipeObject.rowNumber++}"><input class="itemName" value="${itemName}"><input class="calories" value="${calories}"><input class="weight" value="${weight}"><div class="result">${result}</div><button class="deleteRowBtn">X</button></div>`;
  row = row.firstElementChild;
  mainWindow.appendChild(row);
  changeHandler(row);
  return row;
}

function changeHandler(e) {
  // TODO: handle all change events on mainform, pass needed references to other functions (saveRecipeObject...)
  const parent = e.target ?
    e.target.parentElement :
    e;
  const itemName = parent.getElementsByClassName('itemName')[0];
  const calories = parent.getElementsByClassName('calories')[0];
  const weight = parent.getElementsByClassName('weight')[0];
  const result = parent.getElementsByClassName('result')[0];
  // calculate result (+sign to convert string to int)
  const rowSum = +calculateField(calories) * +calculateField(weight) / 100;
  result.textContent = rowSum.toFixed(2);
  // result.textContent = rowSum > 0 ?
  //   rowSum.toFixed(2) :
  //   '';
  calculateTotal();
  // TODO: here maybe pass all elements or values to saveRecipeObject to store.
  saveRecipeObject(parent, itemName.value, calories.value, weight.value, result.textContent);
}

function clickHandler(e) {
  // if DELETE row
  if (e.target.classList.contains('deleteRowBtn')) {
    delete recipeObject[e.target.parentElement.dataset.rownumber];
    storeData();
    e.target.parentElement.remove();
    calculateTotal();
  }
}

function calculateField(field, signs, numbers) {
  const fieldValue = field.value;
  if (!signs) {
    signs = fieldValue.replace(/[^-+*/]/g, '').split('');
    numbers = fieldValue.split(/[^\d.]/).map(Number);
  }
  if (signs.length > 0 && numbers[numbers.length - 1] == '') {
    field.parentElement.classList.add('nudge');
  } else {
    field.parentElement.classList.remove('nudge');
  }
  if (signs.length == 0) {
    return numbers[0];
  }
  let result = {
    '+': function(a, b) {
      return a + b;
    },
    '-': function(a, b) {
      return a - b;
    },
    '*': function(a, b) {
      return a * b;
    },
    '/': function(a, b) {
      return a / b;
    },
  }[signs.shift()](numbers.shift(), numbers.shift());
  if (signs.length) {
    numbers.unshift(result);
    return (calculateField(field, signs, numbers));

  } else {
    // console.log(result, signs, numbers);
    return result;
  }
}

function resetWindow() {
  localStorage.removeItem('currentRecipe');
  mainWindow.innerHTML = '';
  recipeObject = {
    rowNumber: 0
  };
  fillData();
}

// restore data from localStorage onload (or if empty, add new row)
fillData();

// event handlers
addRowBtn.addEventListener('click', addRowHandler);
mainWindow.addEventListener('keypress', keyHandler, true);
mainWindow.addEventListener('click', clickHandler, true);
mainWindow.addEventListener('keyup', changeHandler, true);
mainWindow.addEventListener('change', changeHandler, true);
resetBtn.addEventListener('click', resetWindow);
