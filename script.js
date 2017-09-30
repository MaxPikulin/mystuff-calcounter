const plusBtn = document.getElementsByClassName('plusbtn')[0];
const mainWindow = document.getElementsByClassName('mainwindow')[0];
const totalDiv = document.getElementsByClassName('total')[0];

function addRow (){
  let row = document.createElement('div');
  row.innerHTML = `
  <div class="rows">
    <input type="text" class="name"><input type="text" class="per100"><input type="text" class="grams"><div class="result"></div>
  </div>`;
  mainWindow.insertBefore(row, plusBtn);
  row.children[0].children[0].focus();

}

function handleChange(e) {
  let per100 = parseInt(e.target.parentNode.children[1].value);
  let weight = e.target.parentNode.children[2].value;
  let text = e.target.parentNode.children[3];

  if(e.which==13) {
    if(e.target.classList.value.includes('grams')) {
      addRow();
    }
    e.target.nextSibling.focus();
  }

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

function handleEnter(e) {

}

addRow();

plusBtn.addEventListener('click',addRow);
mainWindow.addEventListener('change',handleChange);
mainWindow.addEventListener('keyup',handleChange);
