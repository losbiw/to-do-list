const body = document.querySelector("body");
const createButton = document.querySelector(".create");
const createIcon = createButton.querySelector('img');
const editButtons = document.getElementsByClassName('edit');
const deleteButtons = document.getElementsByClassName('delete');
const paragraphs = document.getElementsByClassName('task');
const inputs = document.getElementsByClassName('input');

const styles = {
    editFil: 'invert(86%) sepia(97%) saturate(4755%) hue-rotate(62deg) brightness(99%) contrast(86%)',
    deleteFil: 'invert(30%) sepia(81%) saturate(5177%) hue-rotate(337deg) brightness(103%) contrast(84%)',
    createFil: 'invert(67%) sepia(24%) saturate(3516%) hue-rotate(143deg) brightness(105%) contrast(107%)',
    backFil: 'invert(99%) sepia(3%) saturate(295%) hue-rotate(316deg) brightness(112%) contrast(87%)',
    editCol: '#10f687',
    deleteCol: '#eb3452',
    createCol: '#00e4ff',
    backCol: '#efeeee',
    shadow: '-0.18vh -0.18vh 0.46vh rgba(255, 255, 255, 0.83) inset, 0.18vh 0.18vh 0.74vh rgba(217, 210, 200, 0.51) inset'
};

setCreate();
setEdits();
setDelets();
setFilters(createIcon, styles.createFil);

function createTask(){
    const template = document.querySelector('.item.hidden');
    let newItem = template.cloneNode(true);
    newItem.classList.remove('hidden');
    body.insertBefore(newItem, createButton);
    replaceItems();
    sendData();
}

function replaceItems(){
    let items = document.querySelectorAll('.item');
    let clone = NodeList;
    for(let i = 0; i < items.length; i++){
        clone[i] = items[i].cloneNode(true);
        items[i].parentNode.replaceChild(clone[i], items[i]);
    }
    setEdits();
    setDelets();
}

function setEdits(){
    for(let i = 0; i < editButtons.length; i++){
        const icon = editButtons[i].querySelector('img');
        
        setFilters(icon, styles.editFil);
        
        editButtons[i].addEventListener('click', ()=>{
            inputs[i].value = paragraphs[i].textContent;
            paragraphs[i].classList.add('hidden');
            inputs[i].classList.remove('hidden');

            inputs[i].addEventListener('keydown', e=>{
                if(e.key == 'Enter'){
                    e.preventDefault();
                    if(paragraphs[i].textContent != inputs[i].value){
                        paragraphs[i].textContent = inputs[i].value;
                        sendData();
                    }
                    paragraphs[i].classList.remove('hidden');
                    inputs[i].classList.add('hidden');
                }
            });
        });

        editButtons[i].addEventListener('mouseover', ()=>hoverOverFilter('edit', icon, editButtons[i]));
        editButtons[i].addEventListener('mouseout', ()=>hoverOutFilter('edit', icon, editButtons[i]));
    }
}

function setDelets(){
    for(let deleteBut of deleteButtons){
        const icon = deleteBut.querySelector('img');
        
        const deleteTask = function(){
            const currentItem = deleteBut.parentNode.parentNode;
            body.removeChild(currentItem);
            replaceItems();
            sendData();
        }
        
        setFilters(icon, styles.deleteFil);

        deleteBut.addEventListener('mouseover', ()=>hoverOverFilter('delete', icon, deleteBut));
        deleteBut.addEventListener('mouseout', ()=>hoverOutFilter('delete', icon, deleteBut));
        deleteBut.addEventListener('click', deleteTask);
    }
}

function setCreate(){
    const icon = createButton.querySelector('img');
    createButton.addEventListener('click', createTask);
    createButton.addEventListener('mouseover', ()=>hoverOverFilter('create', icon, createButton));
    createButton.addEventListener('mouseout', ()=>hoverOutFilter('create', icon, createButton));
}

function hoverOverFilter(action, icon, background){
    let iconColor = styles.backFil;
    let backColor;
    if(action == 'edit') backColor = styles.editCol;
    else if(action == 'delete') backColor = styles.deleteCol;
    else if(action == 'create') backColor = styles.createCol;
    icon.setAttribute('style', `filter: ${iconColor}`);
    background.setAttribute('style', `background-color: ${backColor};
                                      box-shadow: none;
    `);
}

function hoverOutFilter(action, icon, background){
    let backColor = styles.backCol;
    let iconColor;
    if(action == 'edit') iconColor = styles.editFil;
    else if(action == 'delete') iconColor = styles.deleteFil;
    else if(action == 'create') iconColor = styles.createFil;
    icon.setAttribute('style', `filter: ${iconColor}`);
    background.setAttribute('style', `background-color: ${backColor};
                                      box-shadow: ${styles.shadow};
    `);
}

function setFilters(icon, color){
    icon.setAttribute('style', `filter: ${color}`);
}

function sendData(){
    const id = localStorage.getItem('id');
    let tasks = [];
    for(let i = 1; i < paragraphs.length; i++){
        tasks.push(paragraphs[i].textContent);
    }
    (async()=>{
        const req = await fetch('./addData', {
            headers: {
                'Content-type': 'application/json' 
            },
            method: 'POST',
            body: JSON.stringify({id: id, tasks: tasks})
        });
    })();
}