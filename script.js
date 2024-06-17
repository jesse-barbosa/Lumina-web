document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-button");
    const dropdown = document.getElementById("dropdown");
    const notesContainer = document.getElementById("notes-container");

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
        saveNotes();
        dropdown.classList.remove("show");
    }

    // Função para criar um título
    function createTitle() {
        const title = document.createElement("div");
        title.classList.add("note-title", "draggable");

        const titleInput = document.createElement("input");
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("class", "form-control");
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
        saveNotes();
        dropdown.classList.remove("show");
    }

    // Função para criar um texto (conteúdo)
    function createContent() {
        const content = document.createElement("div");
        content.classList.add("note-content", "draggable");

        const contentTextarea = document.createElement("textarea");
        contentTextarea.setAttribute("class", "form-control");
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
        saveNotes();
        dropdown.classList.remove("show");
    }

    // Função para criar uma lista
    function createList() {
        const list = document.createElement("div");
        list.classList.add("list", "draggable");

        const listTitleInput = document.createElement("input");
        listTitleInput.setAttribute("type", "text");
        listTitleInput.setAttribute("class", "form-control");
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
        list.appendChild(removeButton);

        return list;
    }

    // Função para criar um item da lista
    function createListItem() {
        const listItem = document.createElement("li");
        listItem.classList.add("list-item");

        const itemInput = document.createElement("input");
        itemInput.setAttribute("type", "text");
        itemInput.setAttribute("class", "form-control");
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
            } else if (noteData.type === "content") {
                const content = createContent();
                content.querySelector("textarea").value = noteData.content;
                notesContainer.appendChild(content);
            } else if (noteData.type === "list") {
                const list = createList();
                list.querySelector("input[type=text]").value = noteData.title;
                noteData.content.forEach((itemContent) => {
                    const listItem = createListItem();
                    listItem.querySelector("input[type=text]").value = itemContent;
                    list.querySelector(".list-items").appendChild(listItem);
                });
                notesContainer.appendChild(list);
            }
        });
    }

    // Carregar as notas ao iniciar a página
    loadNotes();
});
