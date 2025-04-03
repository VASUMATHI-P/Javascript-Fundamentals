let draggingItem = null;
const list = document.querySelector('.items-list');

list.addEventListener('dragstart', (e) => {
  draggingItem = e.target;
  e.target.classList.add("dragging");
})

list.addEventListener('dragenter', (e) => {
  if(e.target.tagName === "LI" && e.target !== draggingItem) {
    e.target.classList.add('drag-over');
  }
})

list.addEventListener('dragover', (e) => {
  e.preventDefault(); //It allows dropping (Default behaviour is not allowing to drop)

  const draggingOver = e.target;
  if(draggingOver.tagName === "LI" && draggingOver !== draggingItem) {
    draggingOver.classList.add('drag-over');
    const bounding = draggingOver.getBoundingClientRect();

    const offset = e.clientY - bounding.top;
    console.log(offset + " " + bounding.height/2);

    if(offset > bounding.height/2) {
      list.insertBefore(draggingItem, draggingOver.nextSibling); //Moves down
    } else {
      list.insertBefore(draggingItem, draggingOver); //Moves Up
    }
  }
})

list.addEventListener('dragleave', (e) => {
  e.target.classList.remove('drag-over');
})

list.addEventListener('drop', (e) => {
  e.preventDefault();
  e.target.classList.remove('drag-over');
})

list.addEventListener('dragend', (e) => {
  e.target.classList.remove("dragging");draggingItem = null;
})
