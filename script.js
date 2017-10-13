// global vars
const mainWindow = document.getElementById('mainwindow');
const addRowBtn = document.getElementById('addrow');
const totalDiv = document.getElementById('total');
const recipeObject = {};

function storeData() {
  // TODO: Store fields data in object and save it to localstorage.
}

function saveRecipeObject() {
  // TODO: dave changes to object that represent all fields.
}

function fillData() {
  // TODO: fetch data from localstorage and generate propery set of fields.
}

function calculateRow(row) {
  // TODO: get row reference, fetch all needed data for this row calculation, return result for this row.
}

function calculateTotal() {
  // TODO: get all row results, calculate total.
}

function addRow() {
  // TODO: add new row to the screen. (looks like innerHTML works faster in this case than bunch of createElements and classList.add)
  const row = document.createElement('div');
  row.innerHTML = `<input class="itemName"><input class="calories"><input class="weight"><div class="result"></div>`;
  mainWindow.appendChild(row);
  return row;
}

function changeHandler(e) {
  // TODO: handle all change events on mainform, pass needed references to other functions (saveRecipeObject...)

}

function removeRow() {
  // TODO: remove row.
}


// event handlers
addRowBtn.addEventListener('click', addRow);
mainWindow.addEventListener('change', changeHandler);
