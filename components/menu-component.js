class MenuComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- Sidebar Menu -->
        <header class="flex flex-col justify-between w-52 fixed top-0 left-0 h-screen bg-white border-r shadow px-3 py-5 z-20">
          <div class="flex items-center gap-2 mb-8">
            <img src="../assets/icon.png" alt="Lumina" class="w-8 h-8 mr-2">
            <h1 class="text-xl font-bold text-neutral-700">Lumina</h1>
          </div>
          
          <nav class="space-y-6 my-auto">
            <div>
              <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Início</h2>
              <ul class="space-y-2">
                <li><a href="./home.html"><i class="bi bi-list-check px-1 mr-2"></i>Tarefas</a></li>
                <li><a href="./home.html"><i class="bi bi-journals px-1 mr-2"></i>Anotações</a></li>
              </ul>
            </div>

            <div>
              <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Anotações</h2>
              <ul class="space-y-2">
                <li>
                  <a href="./workspaces.html" class="flex items-center">
                    <i class="bi bi-grid px-1 mr-2"></i>
                    <span class="truncate w-36">Anotação sem Título</span>
                  </a>
                </li>
                <li><button class="w-full text-left text-neutral-500" data-bs-toggle="modal" data-bs-target="#addPageModal"><i class="bi bi-plus-circle px-1 mr-2"></i>Adicionar Página</button></li>
              </ul>
            </div>

            <div>
              <h2 class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Mais</h2>
              <ul class="space-y-2">
                <li><button class="w-full text-left" data-bs-toggle="modal" data-bs-target="#settingsModal"><i class="bi bi-gear px-1 mr-2"></i>Configurações</button></li>
                <li><a href="https://lumina-app.odoo.com/" target="_blank"><i class="bi bi-question-circle px-1 mr-2"></i>Suporte</a></li>
              </ul>
            </div>
          </nav>

          <div class="flex items-center mt-auto">
              <img src="../assets/profile/default.png" alt="Profile" class="w-9 h-9 rounded-full border border-neutral-200">
              <div class="flex flex-col text-start ml-2">
                <span class="text-sm font-semibold" id="user-name-display">USER_NAME</span>
                <span class="text-xs text-neutral-600 font-medium truncate w-32" id="user-name-display">email_user@example.com</span>
              </div>
          </div>
        </header>
        `;
  }
}
customElements.define('menu-sidebar', MenuComponent);