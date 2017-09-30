const plusBtn = document.getElementsByClassName('plusbtn')[0];
const mainWindow = document.getElementsByClassName('mainwindow')[0];
const totalDiv = document.getElementsByClassName('total')[0];

function addRow (){
  const row = document.createElement('div');
  row.innerHTML = `
  <div class="rows">
    <input type="text" class="name"><input type="text" class="per100"><input type="text" class="grams"><div class="result"></div>
  </div>`;
  mainWindow.insertBefore(row, plusBtn);
}
function handleChange(e) {
  let per100 = parseInt(e.target.parentNode.children[1].value);
  let weight = e.target.parentNode.children[2].value;
  let text = e.target.parentNode.children[3];

  if(weight.includes('-')) {
    weight = weight.split('-').reduce((a,v)=>+a- +v);
  } else {
    weight = parseInt(weight);
  }

  let result = per100*weight/100;
  if(isNaN(result)) {
    text.textContent = '';
    total();
    return;
  }
  text.textContent = result.toFixed(2);
  total();
}
function total() {
  let allResults = document.querySelectorAll('.result');
  let total = 0;
  allResults.forEach(node=>total+= +node.textContent);
  totalDiv.textContent = total.toFixed(2);
}

addRow();

plusBtn.addEventListener('click',addRow);
mainWindow.addEventListener('change',handleChange);
mainWindow.addEventListener('keyup',handleChange);
