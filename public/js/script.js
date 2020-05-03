const editButtons = document.getElementsByClassName('edit');
const deleteButtons = document.getElementsByClassName('delete');
const createButton = document.querySelector('.create');
const paragraphs = document.getElementsByClassName('task');
const inputs = document.getElementsByClassName('input');
const createIcon = createButton.querySelector('img');
const body = document.querySelector('body');

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

createSet();
editHovers();

function editHovers(){
    for(let i = 0; i < editButtons.length; i++){
        const editIcon = editButtons[i].querySelector('img');
        const deleteIcon = deleteButtons[i].querySelector('img');

        firstSet(editIcon, deleteIcon, createIcon);

        let handler = function(){
            buttonHover(editIcon, editButtons[i], styles.editFil, styles.backCol, styles.shadow);
        }
        
        editButtons[i].addEventListener('mouseover', ()=>buttonHover(editIcon, editButtons[i], styles.backFil, styles.editCol, 'none'));
        editButtons[i].addEventListener('mouseout', handler);
        editButtons[i].addEventListener('click', ()=>{
            editButtons[i].removeEventListener('mouseout', handler);
            paragraphs[i].classList.add('hidden');
            inputs[i].classList.remove('hidden');
            inputs[i].value = paragraphs[i].textContent;

            inputs[i].addEventListener('keyup', e=>{
                if(e.key === "Enter"){
                    e.preventDefault();
                    const data = inputs[i].value;
                    paragraphs[i].textContent = data;
                    paragraphs[i].classList.remove('hidden');
                    inputs[i].classList.add('hidden'); 
                    buttonHover(editIcon, editButtons[i], styles.editFil, styles.backCol, styles.shadow);
                    editButtons[i].addEventListener('mouseout', handler);
                }
            });
        });

        deleteButtons[i].addEventListener('mouseover', ()=>buttonHover(deleteIcon, deleteButtons[i], styles.backFil, styles.deleteCol, 'none'));
        deleteButtons[i].addEventListener('mouseout', ()=>buttonHover(deleteIcon, deleteButtons[i], styles.deleteFil, styles.backCol, styles.shadow));
        deleteButtons[i].addEventListener('click', ()=>{
            let item = deleteButtons[i].parentNode.parentNode;
            body.removeChild(item);
            editHovers();
        });
    }
}

function buttonHover(icon, background, iconColor, backColor, shadow){
    icon.setAttribute('style', `filter: ${iconColor}`);
    
    background.setAttribute('style', 
        `background-color: ${backColor}; 
        transition: 500ms; box-shadow: ${shadow}`
    );
}

function createSet(){
    createIcon.setAttribute('style', `filter: ${styles.createFil}`);

    createButton.addEventListener('mouseover', ()=>buttonHover(createIcon, createButton, styles.backFil, styles.createCol, 'none'));
    createButton.addEventListener('mouseout', ()=>buttonHover(createIcon, createButton, styles.createFil, styles.backCol, styles.shadow));

    createButton.addEventListener('click', ()=>{
        let template = document.querySelector(".item.hidden");
        let newTask = template.cloneNode(true);
        newTask.classList.remove('hidden');
        body.insertBefore(newTask, createButton);
        editHovers();
    });
}

function firstSet(editIcon, deleteIcon){
    deleteIcon.setAttribute('style', `filter: ${styles.deleteFil}`);
    editIcon.setAttribute('style', `filter: ${styles.editFil}`);
}