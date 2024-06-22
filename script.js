document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-button");
    const dropdown = document.getElementById("dropdown");
    const notesContainer = document.getElementById("notes-container");

    addButton.addEventListener("click", function (event) {
        event.stopPropagation();
        dropdown.classList.toggle("show");
    });

    document.getElementById("add-text").addEventListener("click", function () {
        addText();
    });

    document.getElementById("add-list").addEventListener("click", function () {
        addList();
    });

    function addText() {
        const text = createText();
        notesContainer.appendChild(text);
        makeDraggable(text);
        saveNotes();
        dropdown.classList.remove("show");
    }

    function createText() {
        const text = document.createElement("div");
        text.classList.add("note-content", "draggable");
        text.draggable = true;
        const textInput = document.createElement("textarea");
        textInput.setAttribute("class", "content-input");
        textInput.setAttribute("placeholder", "Digite seu texto");

        const saveButton = document.createElement("button");
        saveButton.innerHTML = '<i class="bi bi-save"></i>';
        saveButton.classList.add("btn", "btn-success", "btn-sm", "ms-2");
        saveButton.addEventListener("click", function () {
            saveNotes();
        });

        const removeButton = document.createElement("button");
        removeButton.innerHTML = '<i class="bi bi-trash"></i>';
        removeButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
        removeButton.addEventListener("click", function () {
            text.remove();
            saveNotes();
        });

        saveButton.classList.add("invisible")
        removeButton.classList.add("invisible")

        text.addEventListener("click", function () {
            saveButton.classList.remove("invisible");
            removeButton.classList.remove("invisible");
        
        textInput.classList.add("border", "border-1");
        })
        notesContainer.addEventListener("click", function () {
            saveButton.classList.add("invisible")
            removeButton.classList.add("invisible")
            
            textInput.classList.remove("border", "border-1");
        });
        
        text.appendChild(textInput);
        text.appendChild(saveButton);
        text.appendChild(removeButton);

        return text;
    }


    function addList() {
        const list = createList();
        notesContainer.appendChild(list);
        makeDraggable(list);
        dropdown.classList.remove("show");
    }

    function createList() {
        const list = document.createElement("div");
        list.classList.add("list", "draggable");
        list.draggable = true;

        const listTitleInput = document.createElement("input");
        listTitleInput.setAttribute("type", "text");
        listTitleInput.setAttribute("class", "list-content");
        listTitleInput.setAttribute("placeholder", "Título da Lista");

        const listItemsContainer = document.createElement("div");
        listItemsContainer.setAttribute("class", "list-items");

        const addItemButton = document.createElement("button");
        addItemButton.innerHTML = '<i class="bi bi-plus"></i>';
        addItemButton.classList.add("btn", "btn-primary", "btn-sm", "ms-2");
        addItemButton.addEventListener("click", function () {
            const listItem = createListItem();
            listItemsContainer.appendChild(listItem);
            saveNotes();
        });

        const saveButton = document.createElement("button");
        saveButton.innerHTML = '<i class="bi bi-save"></i>';
        saveButton.classList.add("btn", "btn-success", "btn-sm", "ms-2");
        saveButton.addEventListener("click", function () {
            saveNotes();
        });

        const removeButton = document.createElement("button");
        removeButton.innerHTML = '<i class="bi bi-trash"></i>';
        removeButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
        removeButton.addEventListener("click", function () {
            list.remove();
            saveNotes();
        });

        list.appendChild(listTitleInput);
        list.appendChild(listItemsContainer);
        list.appendChild(addItemButton);
        list.appendChild(saveButton);
        list.appendChild(removeButton);

        return list;
    }


    function createListItem() {
        const listItem = document.createElement("div");
        listItem.classList.add("list-item");

        const itemInput = document.createElement("input");
        itemInput.setAttribute("type", "text");
        itemInput.setAttribute("class", "item");
        itemInput.setAttribute("placeholder", "Digite um item");

        const removeButton = document.createElement("button");
        removeButton.innerHTML = '✔';
        removeButton.classList.add("btn", "btn-success", "btn-sm", "ms-2");
        removeButton.addEventListener("click", function () {
            listItem.remove();
            saveNotes();
        });

        listItem.appendChild(itemInput);
        listItem.appendChild(removeButton);

        return listItem;
    }

    function saveNotes() {
        const notes = notesContainer.querySelectorAll(".draggable");
        const notesData = [];

        notes.forEach((note) => {
            const noteData = {
                type: note.classList.contains("note-content") ? "content" :
                    note.classList.contains("list") ? "list" : "",
                content: ""
            };

            if (noteData.type === "content") {
                noteData.content = note.querySelector("textarea").value;
            } else if (noteData.type === "list") {
                noteData.title = note.querySelector("input[type=text]").value;
                noteData.content = [];
                const items = note.querySelectorAll(".list-item input[type=text]");
                items.forEach((item) => {
                    noteData.content.push(item.value);
                });
            }

            notesData.push(noteData);
        });

        localStorage.setItem("notesData", JSON.stringify(notesData));
    }


    function loadNotes() {
        const notesData = JSON.parse(localStorage.getItem("notesData")) || [];

        notesData.forEach((noteData) => {
            if (noteData.type === "content") {
                const content = createText();
                content.querySelector("textarea").value = noteData.content;
                notesContainer.appendChild(content);
                makeDraggable(content);
            } else if (noteData.type === "list") {
                const list = createList();
                list.querySelector("input[type=text]").value = noteData.title;
                const itemsContainer = list.querySelector(".list-items");
                noteData.content.forEach((item) => {
                    const listItem = createListItem();
                    listItem.querySelector("input").value = item;
                    itemsContainer.appendChild(listItem);
                });
                notesContainer.appendChild(list);
                makeDraggable(list);
            }
        });
    }

    loadNotes();

    window.addEventListener("click", function (event) {
        if (!event.target.matches("#add-button")) {
            dropdown.classList.remove("show");
        }
    });

    window.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            dropdown.classList.remove("show");
        }
    });

    function makeDraggable(element) {
        element.addEventListener("dragstart", function (event) {
            event.dataTransfer.setData("text/plain", "");
            setTimeout(function () {
                element.classList.add("dragging");
            }, 0);
        });

        element.addEventListener("dragend", function () {
            element.classList.remove("dragging");
            saveNotes();
        });

        element.addEventListener("dragover", function (event) {
            event.preventDefault();
        });

        element.addEventListener("drop", function (event) {
            event.preventDefault();
            const draggable = document.querySelector(".dragging");
            const parent = element.parentElement;
            parent.insertBefore(draggable, element.nextSibling);
            saveNotes();
        });
    }
});
