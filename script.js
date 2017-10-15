// global vars
const mainWindow = document.getElementById('mainWindow');
const addRowBtn = document.getElementById('addRow');
const totalDiv = document.getElementById('total');
const recipeObject = {
  rowNumber: 0,
};

function storeData() {
  // TODO: Store fields data in object and save it to localstorage.
}

function saveRecipeObject() {
  // TODO: save changes to object that represent all fields.
}

function fillData() {
  // TODO: fetch data from localstorage and generate proper set of fields.
}

function calculateRow(row) {
  // TODO: get row reference, fetch all needed data for this row calculation, return result for this row.

}

function calculateTotal() {
  // TODO: get all row results, calculate total.
}

function addRow(e) {
  // TODO: add new row to the screen. (looks like innerHTML works faster in this case than bunch of createElements and classList.add)
  // if row added through button - get prevSibling data-rowNumber and set this one to +1.

  const row = document.createElement('div');
  row.classList.add('rows');
  row.setAttribute('data-rowNumber', recipeObject.rowNumber++);
  row.innerHTML = `<input class="itemName"><input class="calories"><input class="weight"><div class="result"></div>`;
  mainWindow.appendChild(row);
  // return row to use it in store/restore functions. or anywhere else...
  return row;
}

function changeHandler(e) {
  // TODO: handle all change events on mainform, pass needed references to other functions (saveRecipeObject...)
  const parent = e.target.parentElement;
  const itemName = parent.getElementsByClassName('itemName')[0];
  const calories = parent.getElementsByClassName('calories')[0];
  const weight = parent.getElementsByClassName('weight')[0];
  const result = parent.getElementsByClassName('result')[0];
  // TODO: here maybe pass all elements or values to saveRecipeObject to store.

  // calculate result (+sign to convert string to int)
  result.textContent = +calories.value * +weight.value / 100;

}

function removeRow() {
  // TODO: remove row.
}

// add first row at the begining
addRow();

// event handlers
addRowBtn.addEventListener('click', addRow);
mainWindow.addEventListener('keyup', changeHandler, true);
mainWindow.addEventListener('change', changeHandler, true);
