// Garante que o JS carregue depois do DOM
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o reload

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Usa o cliente supabase criado no supabase.js
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            // Mostra erro
            errorMessage.textContent = error.message;
            errorMessage.classList.remove('hidden');
        } else {
            // Login OK
            errorMessage.classList.add('hidden');
            console.log('Usuário logado:', data.user);

            // Redireciona para dashboard
            window.location.href = "dashboard.html";
        }
    });
});