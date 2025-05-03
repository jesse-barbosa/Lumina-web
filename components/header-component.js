class HeaderComponent extends HTMLElement {
    connectedCallback() {
      const user = JSON.parse(localStorage.getItem('user')) || { name: 'Usuário' };
      const pageTitle = this.getAttribute('page-title') || 'Página';
  
      this.innerHTML = `
        <div class="sticky top-0 z-10 flex justify-between items-center p-4 bg-white border-b border-neutral-200">
          <div class="flex items-center">
            <h1 class="text-lg font-semibold text-neutral-800">${pageTitle}</h1>
          </div>
          <div class="flex items-center gap-4">
            <div class="relative inline-block text-left">
              <button id="dropdownButton" class="flex items-center gap-2 focus:outline-none">
                <img src="../assets/profile/default.png" alt="Profile" class="w-8 h-8 rounded-full border border-neutral-200">
                <span class="text-sm font-medium" id="user-name-display-header">${user.name}</span>
                <i class="bi bi-chevron-down text-neutral-500 text-sm"></i>
              </button>
              <ul id="dropdownMenu" class="hidden absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-md shadow-lg z-10">
                <li><span class="block px-4 py-2 text-sm text-neutral-700">Usuário: <span id="user-name-header">${user.name}</span></span></li>
                <li><a href="../index.html" class="block px-4 py-2 text-sm text-center text-white bg-red-500 hover:bg-red-600 rounded-b-md">Sair</a></li>
              </ul>
            </div>
          </div>
        </div>
      `;
  
      // Adiciona evento ao botão de dropdown
      this.querySelector('#dropdownButton').addEventListener('click', () => {
        this.querySelector('#dropdownMenu').classList.toggle('hidden');
      });
    }
  }
  
  customElements.define('header-component', HeaderComponent);
  