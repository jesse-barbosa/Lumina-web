class MenuComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- Sidebar Menu -->
      <aside class="fixed top-0 left-0 h-screen shadow w-48 bg-white border-r border-neutral-100 z-20 flex flex-col">
        <!-- Logo -->
        <div class="px-4 py-5 flex items-center">
          <img src="../assets/icon.png" alt="Lumina" class="w-8 h-8 rounded-md">
          <span class="ml-2 text-lg font-medium">Lumina</span>
        </div>
        
        <!-- Navigation -->
        <nav class="flex-1 px-3 py-4">
          <!-- Main Navigation -->
          <ul class="space-y-1.5">
            <li>
              <a href="./dashboard.html" class="nav-link flex items-center px-2 py-1.5 rounded-md text-neutral-700 hover:bg-neutral-50 group" data-page="dashboard">
                <i class="bi bi-house text-neutral-500 group-hover:text-blue-500 mr-2"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="./tasks.html" class="nav-link flex items-center px-2 py-1.5 rounded-md text-neutral-700 hover:bg-neutral-50 group" data-page="tasks">
                <i class="bi bi-check2-square text-neutral-500 group-hover:text-blue-500 mr-2"></i>
                <span>Tarefas</span>
              </a>
            </li>
            <li>
              <a href="./notations.html" class="nav-link flex items-center px-2 py-1.5 rounded-md text-neutral-700 hover:bg-neutral-50 group" data-page="notations">
                <i class="bi bi-journal-text text-neutral-500 group-hover:text-blue-500 mr-2"></i>
                <span>Anotações</span>
              </a>
            </li>
          </ul>
          
          <!-- Recent Notes Section -->
          <div class="mt-6">
            <p class="px-2 text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Recentes</p>
            <ul class="space-y-1">
              <li>
                <a href="#" class="flex items-center px-2 py-1.5 rounded-md text-neutral-700 hover:bg-neutral-50 group">
                  <i class="bi bi-file-text text-neutral-400 group-hover:text-blue-500 mr-2"></i>
                  <span class="truncate">Reunião de Planejamento</span>
                </a>
              </li>
              <li>
                <a href="#" class="flex items-center px-2 py-1.5 rounded-md text-neutral-700 hover:bg-neutral-50 group">
                  <i class="bi bi-file-text text-neutral-400 group-hover:text-blue-500 mr-2"></i>
                  <span class="truncate">Ideias para Campanha</span>
                </a>
              </li>
            </ul>
            <button class="w-full mt-1 flex items-center px-2 py-1.5 text-sm text-neutral-500 hover:text-blue-500 hover:bg-neutral-50 rounded-md">
              <i class="bi bi-plus-circle mr-2"></i>
              <span>Nova anotação</span>
            </button>
          </div>
        </nav>
        
        <!-- User Profile -->
        <div class="border-t border-neutral-100 p-3">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-500">
              <img src="../assets/profile/default.png" alt="Profile" class="w-8 h-8 rounded-full border border-neutral-200">
            </div>
            <div class="flex flex-col text-start ml-2 overflow-hidden">
              <p class="text-sm font-medium truncate" id="user-name-display">USER_NAME</p>
              <span class="text-xs text-neutral-600 font-medium truncate w-32">email_user@example.com</span>
            </div>
          </div>
        </div>
      </aside>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .nav-link.active {
        background-color: #E3F2FD;
        color: #3B82F6;
        font-weight: 500;
      }
      
      .nav-link.active i {
        color: #3B82F6 !important;
      }
    `;
    this.appendChild(style);

    // Set active menu item based on current page
    this.setActivePage();
  }

  setActivePage() {
    // Get current page filename from URL
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    
    // Find all navigation links
    const navLinks = this.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      const linkPage = linkHref.split('/').pop();
      
      // Check if this link corresponds to the current page
      if (currentPage === linkPage) {
        link.classList.add('active');
      } else if (currentPage === '' && linkPage === 'dashboard.html') {
        link.classList.add('active');
      }
    });
  }
}

customElements.define('menu-sidebar', MenuComponent);