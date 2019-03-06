class ShoppingView {
    constructor(model) {
        // The bind() method creates a new function that, when called, has its this keyword set to the provided value.
        model.subscribe(this.redrawList.bind(this))
    }

    redrawList(shoppingList, msg) {
        let tbl = document.getElementById("shoppinglist")
        tbl.innerHTML = ""
        for (let task of shoppingList.newItems) {

            this.addRow(task, tbl)
        }
    }

    addRow(task, parent) {
        let row = document.createElement("tr")
        row.classList.add(task.priority)
        let cb = document.createElement("input")
        cb.type = "checkbox"
        cb.classList.add("form-control")
        cb.onclick = function () { task.purchased = true; row.classList.add('checked'); row.classList.add('strike_through');}
        row.appendChild(cb)

        for (let val of ['task', 'assignee', 'date']) {
            let td = document.createElement("td")
            td.innerHTML = task[val]
            row.appendChild(td)
        }

        parent.appendChild(row)
    }
}