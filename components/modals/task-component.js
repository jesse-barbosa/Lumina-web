class TaskComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- Modal de Criar Tarefa -->
      <div id="addTaskModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md">
          <div class="flex items-center justify-between px-6 py-4">
            <h5 class="text-lg font-semibold">Criar Nova Tarefa</h5>
            <button type="button" class="text-neutral-600 hover:text-neutral-800" onclick="document.getElementById('addTaskModal').classList.add('hidden')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="px-6">
            <form id="addTaskForm">
            <div class="w-full max-w-md flex flex-row gap-3 mt-6 items-center border-b-2 border-neutral-400">
              <input
                  type="text"
                  id="taskTitle"
                  placeholder="Título da Tarefa"
                  class="flex-1 text-md text-neutral-800 py-5"
                  value=""
              />
            </div>
            <div class="mb-4 w-full max-w-md flex flex-row gap-3 mt-6 items-center border-b-2 border-neutral-400">
              <input
                  type="text"
                  id="taskDescription"
                  placeholder="Descrição (opcional)"
                  class="flex-1 text-md text-neutral-800 py-5"
                  value=""
              />
            </div>
              <button type="submit" class="mt-4 mb-6 w-full rounded-md text-white font-medium bg-blue-500 hover:bg-blue-600 px-4 py-2 transition">
                Criar Tarefa
              </button>
            </form>
          </div>
        </div>
      </div>
        `;
  }
}
customElements.define('task-modal', TaskComponent);