let todoItems =[];
let n = 0;

LoadLastPage();


function GetAllLabel() {
    const labels = [];
    const form = document.getElementById("bottom_of_form");

    for (const node of form.childNodes) {

        if (node.nodeName == "LABEL") {
            labels.push(node)
        }
    }
    return labels;

}

function SurchNo(n) {
    for(let i = 0; i < todoItems.length; i++){
        if (todoItems[i].id == +n) {
            return i;
        }
    }
    return false;
}

function CreateNewTasks() {

    const input = document.getElementById("AddEl");
    const val = input.value

    if(GetAllLabel().length == 0){
        const form = document.getElementById("bottom_of_form");
        form.classList.add("border_bottom_of_form");
    }

    const newInput = document.createElement("input");

    newInput.type = "checkbox";
    newInput.name = "task";
    newInput.addEventListener("click", CrossTask);


    const newLabel = document.createElement("label");
    newLabel.classList.add("labels");
    newLabel.id = n;

    const text = document.createTextNode(val);

    const form = document.getElementById("bottom_of_form");

    const classLabels = form.getElementsByClassName("labels");

    newLabel.appendChild(newInput);
    newLabel.appendChild(text);
    form.insertBefore(newLabel, classLabels[0]);

    let obj = {};
    obj.str = val;
    obj.id = n;
    obj.crossed = false;
    n = n + 1;
    
    todoItems.push(obj);



    localStorage.setItem('key', JSON.stringify(todoItems));
    input.value = '';
    input.focus();

}


function RemoveTask() {

    for (const node of GetAllLabel()) {

        let tik = node.control;
        if (tik.checked == true) { 
            

            todoItems.splice(SurchNo(node.id), 1);
            localStorage.setItem('key', JSON.stringify(todoItems));
            node.remove();

        }
        
    }
    if(GetAllLabel().length == 0){
        const form = document.getElementById("bottom_of_form");
        form.classList.remove("border_bottom_of_form");
    }
}

function CrossTask() {

    for (const node of GetAllLabel()) {

        let tik = node.control;
        if (tik.checked == true) {
            node.classList.add("crossTask");
            todoItems[SurchNo(node.id)].crosed = true;
            localStorage.setItem('key', JSON.stringify(todoItems));

        } else {
            node.classList.remove("crossTask")
            todoItems[SurchNo(node.id)].crosed = false;
            localStorage.setItem('key', JSON.stringify(todoItems));
        }
        
    }

}

function LoadLastPage(){

    const todoSLabels = localStorage.getItem('key');
    const todoLabels = JSON.parse(todoSLabels);
    if (todoLabels){

        todoItems = [];
        for(const node of todoLabels){

            const newInput = document.createElement("input");

            newInput.type = "checkbox";
            newInput.name = "task";
            newInput.addEventListener("click", CrossTask);

            const newLabel = document.createElement("label");
            newLabel.classList.add("labels");
            newLabel.id = n;
            if(	node.crosed){
                newLabel.classList.add("crossTask");
                newInput.checked = "true";
            }

            const text = document.createTextNode(node.str);

            const form = document.getElementById("bottom_of_form");

            form.classList.add("border_bottom_of_form");

            const classLabels = form.getElementsByClassName("labels");

            newLabel.appendChild(newInput);
            newLabel.appendChild(text);
            form.insertBefore(newLabel, classLabels[0]);

            let obj = {};
            obj.str = node.str;
            obj.id = n;
            if(node.crosed){
                obj.crosed = true;
            }
            
            todoItems.push(obj);
            n = n + 1;


            localStorage.setItem('key', JSON.stringify(todoItems));;
        }  
                                                                          
    }
}





const printButton = document.getElementById("PrintEl");
printButton.addEventListener("click", CreateNewTasks);




const deleteButton = document.getElementById("DeleteEl");
deleteButton.addEventListener("click", RemoveTask);

document.addEventListener('keydown', function (event){
    if (event.code === "Enter") {
         CreateNewTasks();	
    }
});
