document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-button");
    const dropdown = document.getElementById("dropdown");
    const notesContainer = document.getElementById("notes-container");
    let draggedElement = null;

    addButton.addEventListener("click", function (event) {
        event.stopPropagation();
        dropdown.classList.toggle("show");
    });

    // Event listener para o botão "Adicionar Título"
    document.getElementById("add-title").addEventListener("click", function () {
        addTitle();
    });

    // Event listener para o botão "Adicionar Texto"
    document.getElementById("add-content").addEventListener("click", function () {
        addContent();
    });

    // Event listener para o botão "Adicionar Lista"
    document.getElementById("add-list").addEventListener("click", function () {
        addList();
    });

    // Função para adicionar um novo título
    function addTitle() {
        const title = createTitle();
        notesContainer.appendChild(title);
        makeDraggable(title);
        saveNotes();
        dropdown.classList.remove("show");
    }

    // Função para criar um título
    function createTitle() {
        const title = document.createElement("div");
        title.classList.add("note-title", "draggable");

        const titleInput = document.createElement("input");
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("class", "title-input");
        titleInput.setAttribute("placeholder", "Digite seu título");

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
            title.remove();
            saveNotes();
        });

        title.appendChild(titleInput);
        title.appendChild(saveButton);
        title.appendChild(removeButton);

        return title;
    }

    // Função para adicionar um novo texto (conteúdo)
    function addContent() {
        const content = createContent();
        notesContainer.appendChild(content);
        makeDraggable(content);
        saveNotes();
        dropdown.classList.remove("show");
    }

    // Função para criar um texto (conteúdo)
    function createContent() {
        const content = document.createElement("div");
        content.classList.add("note-content", "draggable");

        const contentTextarea = document.createElement("textarea");
        contentTextarea.setAttribute("class", "content-input");
        contentTextarea.setAttribute("placeholder", "Digite seu conteúdo");

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
            content.remove();
            saveNotes();
        });

        content.appendChild(contentTextarea);
        content.appendChild(saveButton);
        content.appendChild(removeButton);

        return content;
    }

    // Função para adicionar uma nova lista
    function addList() {
        const list = createList();
        notesContainer.appendChild(list);
        makeDraggable(list);
        dropdown.classList.remove("show");
    }

    // Função para criar uma lista
    function createList() {
        const list = document.createElement("div");
        list.classList.add("list", "draggable");

        const listTitleInput = document.createElement("input");
        listTitleInput.setAttribute("type", "text");
        listTitleInput.setAttribute("class", "list-content");
        listTitleInput.setAttribute("placeholder", "Título da Lista");

        const listItemsContainer = document.createElement("ul");
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

    // Função para criar um item da lista
    function createListItem() {
        const listItem = document.createElement("li");
        listItem.classList.add("list-item");

        const itemInput = document.createElement("input");
        itemInput.setAttribute("type", "text");
        itemInput.setAttribute("class", "item");
        itemInput.setAttribute("placeholder", "Digite um item");

        const removeButton = document.createElement("button");
        removeButton.innerHTML = '<i class="bi bi-trash"></i>';
        removeButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
        removeButton.addEventListener("click", function () {
            listItem.remove();
            saveNotes();
        });

        listItem.appendChild(itemInput);
        listItem.appendChild(removeButton);

        return listItem;
    }

    // Função para tornar um elemento arrastável
    function makeDraggable(element) {
        element.setAttribute("draggable", "true");

        element.addEventListener("dragstart", function (event) {
            draggedElement = event.target;
            setTimeout(function () {
                event.target.style.display = "none";
            }, 0);
        });

        element.addEventListener("dragend", function (event) {
            setTimeout(function () {
                draggedElement.style.display = "block";
                draggedElement = null;
            }, 0);
        });

        notesContainer.addEventListener("dragover", function (event) {
            event.preventDefault();
            const afterElement = getDragAfterElement(notesContainer, event.clientY);
            const draggable = document.querySelector(".draggable.dragging");
            if (afterElement == null) {
                notesContainer.appendChild(draggable);
            } else {
                notesContainer.insertBefore(draggable, afterElement);
            }
        });
    }

    // Função auxiliar para obter o elemento após o qual arrastar
    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging)")];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Função para salvar as notas
    function saveNotes() {
        const notes = notesContainer.querySelectorAll(".draggable");
        const notesData = [];

        notes.forEach((note) => {
            const noteData = {
                type: note.classList.contains("note-title") ? "title" :
                    note.classList.contains("note-content") ? "content" :
                    note.classList.contains("list") ? "list" :
                    "",
                content: ""
            };

            if (noteData.type === "title") {
                noteData.content = note.querySelector("input").value;
            } else if (noteData.type === "content") {
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

    // Função para carregar as notas salvas
    function loadNotes() {
        const notesData = JSON.parse(localStorage.getItem("notesData")) || [];

        notesData.forEach((noteData) => {
            if (noteData.type === "title") {
                const title = createTitle();
                title.querySelector("input").value = noteData.content;
                notesContainer.appendChild(title);
                makeDraggable(title);
            } else if (noteData.type === "content") {
                const content = createContent();
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

    // Carregar as notas ao iniciar a aplicação
    loadNotes();

    // Evento para fechar o dropdown ao clicar fora dele
    window.addEventListener("click", function (event) {
        if (!event.target.matches("#add-button")) {
            dropdown.classList.remove("show");
        }
    });

    // Evento para fechar o dropdown ao pressionar ESC
    window.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            dropdown.classList.remove("show");
        }
    });
});
