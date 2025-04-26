// Garante que o JS carregue depois do DOM
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o reload

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Login no Supabase Auth
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (signInError) {
            // Mostra erro
            errorMessage.textContent = signInError.message;
            errorMessage.classList.remove('hidden');
            return;
        }

        const userId = signInData.user.id;

        // Busca os dados adicionais do usuário na tabela 'users'
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('id, name, email')
            .eq('user_id', userId)
            .single(); // Garante que vai trazer apenas 1

        if (userError) {
            errorMessage.textContent = userError.message;
            errorMessage.classList.remove('hidden');
            return;
        }

        // Salva no Local Storage
        localStorage.setItem('user', JSON.stringify({
            id: userData.id,
            name: userData.name,
            email: userData.email
        }));

        console.log('Usuário logado:', userData);

        // Redireciona para dashboard
        window.location.href = "dashboard.html";
    });
});
