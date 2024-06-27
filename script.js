
document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-button");
    const dropdown = document.getElementById("dropdown");
    const notesContainer = document.getElementById("main-principal");

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

    let draggedItem = null;

    function addText() {
        const text = createText();
        notesContainer.appendChild(text);
        makeDraggable(text);
        saveNotes();
        dropdown.classList.remove("show");
    }

    function createText() {
        const text = document.createElement("div");
        text.classList.add("note-content", "position-absolute", "draggable");
        text.setAttribute('draggable', 'true');
        const textInput = document.createElement("textarea");
        textInput.setAttribute("class", "content-input");

        const removeButton = document.createElement("button");
        removeButton.innerHTML = '<i class="bi bi-trash"></i>';
        removeButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2", "position-absolute");
        removeButton.addEventListener("click", function () {
            text.remove();
            saveNotes();
        });

        removeButton.classList.add("invisible");

        textInput.addEventListener("click", function () {
            removeButton.classList.remove("invisible");
            text.classList.add("border", "border-1");
        });

        window.addEventListener("click", function (event) {
            if (!event.target.matches("textarea")) {
                removeButton.classList.add("invisible");
                text.classList.remove("border", "border-1");
                saveNotes();
            }
        });

        window.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                removeButton.classList.add("invisible");
                text.classList.remove("border", "border-1");
            }
        });

        text.appendChild(textInput);
        text.appendChild(removeButton);

        return text;
    }

    function addList() {
        const list = createList();
        notesContainer.appendChild(list);
        makeDraggable(list);
        saveNotes();
        dropdown.classList.remove("show");
    }

    function createList() {
        const list = document.createElement("div");
        list.classList.add("list", "position-absolute", "draggable");
        list.setAttribute('draggable', 'true');

        const listTitleInput = document.createElement("input");
        listTitleInput.setAttribute("type", "text");
        listTitleInput.setAttribute("class", "list-title");
        listTitleInput.setAttribute("placeholder", "Título da Lista");

        const listItemsContainer = document.createElement("div");
        listItemsContainer.setAttribute("class", "list-items");

        const addItemButton = document.createElement("button");
        addItemButton.innerHTML = '<i class="bi bi-plus"></i>';
        addItemButton.classList.add("btn", "btn-primary", "btn-sm", "mt-4", "position-absolute");
        addItemButton.addEventListener("click", function () {
            const listItem = createListItem();
            listItemsContainer.appendChild(listItem);
            saveNotes();
        });

        const removeButton = document.createElement("button");
        removeButton.innerHTML = '<i class="bi bi-trash"></i>';
        removeButton.classList.add("btn", "btn-danger", "btn-sm", "ms-5", "mt-4", "position-absolute");
        removeButton.addEventListener("click", function () {
            list.remove();
            saveNotes();
        });

        removeButton.classList.add("invisible");
        addItemButton.classList.add("invisible");

        list.addEventListener("click", function () {
            removeButton.classList.remove("invisible");
            addItemButton.classList.remove("invisible");
            list.classList.add("border", "border-1");
        });

        window.addEventListener("click", function (event) {
            if (!list.contains(event.target)) {
                removeButton.classList.add("invisible");
                addItemButton.classList.add("invisible");
                list.classList.remove("border", "border-1");
                saveNotes();
            }
        });

        window.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                removeButton.classList.add("invisible");
                addItemButton.classList.add("invisible");
                list.classList.remove("border", "border-1");
                saveNotes();
            }
        });

        list.appendChild(listTitleInput);
        list.appendChild(listItemsContainer);
        list.appendChild(addItemButton);
        list.appendChild(removeButton);

        return list;
    }

    function createListItem() {
        const listItem = document.createElement("div");
        listItem.classList.add("list-item");

        const itemInput = document.createElement("input");
        itemInput.setAttribute("type", "text");
        itemInput.setAttribute("class", "item");

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

    function makeDraggable(element) {
        element.addEventListener('dragstart', dragStart);
        element.addEventListener('dragend', dragEnd);
    }

    function dragStart(event) {
        draggedItem = event.target;
        setTimeout(() => {
            event.target.classList.add('hide');
        }, 0);
    }

    function dragEnd(event) {
        event.target.classList.remove('hide');
    }

    notesContainer.addEventListener('dragover', dragOver);
    notesContainer.addEventListener('drop', dropItem);

    function dragOver(event) {
        event.preventDefault();
    }

    function dropItem(event) {
        event.preventDefault();
        let main = document.getElementsByTagName("main")[0];
        if (draggedItem) {
            const boundingRect = main.getBoundingClientRect();
            const offsetX = event.clientX - boundingRect.left - (draggedItem.offsetWidth / 2);
            const offsetY = event.clientY - boundingRect.top - (draggedItem.offsetHeight / 2);

            const maxX = main.clientWidth - draggedItem.offsetWidth;
            const maxY = main.clientHeight - draggedItem.offsetHeight;

            let left = offsetX < 0 ? 0 : offsetX;
            left = left > maxX ? maxX : left;

            let top = offsetY < 0 ? 0 : offsetY;
            top = top > maxY ? maxY : top;

            draggedItem.style.position = 'absolute';
            draggedItem.style.left = left + 'px';
            draggedItem.style.top = top + 'px';

            saveNotes();
            draggedItem = null;
        }
    }

    function saveNotes() {
        const notes = notesContainer.querySelectorAll(".draggable");
        const notesData = [];

        notes.forEach((note) => {
            const noteData = {
                type: note.classList.contains("note-content") ? "content" :
                    note.classList.contains("list") ? "list" : "",
                content: "",
                position: {
                    left: note.style.left,
                    top: note.style.top
                },
                size: {
                    width: note.querySelector("textarea") ? note.querySelector("textarea").offsetWidth : null,
                    height: note.querySelector("textarea") ? note.querySelector("textarea").offsetHeight : null
                }
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
                content.style.left = noteData.position.left;
                content.style.top = noteData.position.top;
                content.querySelector("textarea").style.width = noteData.size.width + "px";
                content.querySelector("textarea").style.height = noteData.size.height + "px";
                notesContainer.appendChild(content);
                makeDraggable(content);
            } else if (noteData.type === "list") {
                const list = createList();
                list.querySelector("input[type=text]").value = noteData.title;
                list.style.left = noteData.position.left;
                list.style.top = noteData.position.top;
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
});
