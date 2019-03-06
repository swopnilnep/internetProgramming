var assignees_list = ['Fareway', 'Ace Hardware', 'Caseys', 'The Hatchery', 'Amundsens']
var taskModel = new ShoppingList()
var taskView = new ShoppingView(taskModel)

function clickedon() {
	//rowcolids uses id, not name
    let rowcolids = ['task', 'assignees', 'priority', 'date']
    let vals = {}
    for (let cid of rowcolids) {
        vals[cid] = document.getElementById(cid).value;
    }
    let task = new Item(vals.task, vals.assignees, vals.priority, vals.date)
    taskModel.addTask(task)
    
}

function populateSelect(selectId, sList) {
	for (let item in sList) {
		console.log(item)
	}
    let sel = document.getElementById(selectId, sList)
    for (let s of sList) {
        let opt = document.createElement("option")
        opt.value = s
        opt.innerHTML = s
        sel.appendChild(opt)
    }
}

function deleteRow(rowclass) {

    var rows = document.getElementsByClassName(rowclass);
    for (let row of rows) {
		//deleting either one of these breaks the function
        row.parentNode.removeChild(row);     
        document.getElementsByClassName('table').deleteRow(row);
    }

}

function removePurchased() {

    deleteRow('checked');
    taskModel.update();

}

function removeAll() {

    taskModel.emptyList();
    taskModel.update();

}


var table = document.getElementById('output_table');
var t_body = $('#all_output_rows');

function newRow() {

    var cell_Index = 0;
    var row = table.insertRow(-1);
    for (i = 0; i < 4; i++) {
        var cell = row.insertCell(cell_Index);
        cell_Index++;
    }

    row.setAttribute('class', 'output_rows');


    var last_row = (table.rows.length - 1);
    var first_cell = 0;

    populateRows();

    var set_row_id = $('#task_name_field').val();
    row.setAttribute('id', set_row_id);
    var row_id = row.getAttribute('id');
    document.getElementById('output_table').rows[last_row].cells[first_cell].innerHTML = "<input type='checkbox' onchange=taskDone(" + row_id + ")>";

}

function populateRows() {

    //this is the last row, not 2nd to last :/
	var priority = $('#priority').val();
    if (priority == 'Low') {
        document.getElementById('output_table').rows[second_to_last_row].setAttribute("style", "background-color: #adebad;");
    }
    if (priority == 'Medium') {
        document.getElementById('output_table').rows[second_to_last_row].setAttribute("style", "background-color: #ffffb3;");
    }
    if (priority == 'High') {
        document.getElementById('output_table').rows[second_to_last_row].setAttribute("style", "background-color: #ffcccc;");
    }
    var second_to_last_row = [table.rows.length - 1];

    var task_name = $('#task').val();
    document.getElementById('output_table').rows[second_to_last_row].cells[1].innerHTML = task_name;

    var assignees = $('#assignees').val();
    document.getElementById('output_table').rows[second_to_last_row].cells[2].innerHTML = assignees_name;

    var date = $('#date').val();
    document.getElementById('output_table').rows[second_to_last_row].cells[3].innerHTML = date;


}

function taskDone(x) {

    x.classList.add('strike_through');

}


$(document).ready(function () {

    populateSelect('assignees', assignees_list)
    
})

