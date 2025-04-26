// Garante que o JS carregue depois do DOM
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o reload

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Cria o usuário no Supabase Auth
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password
        });

        if (signUpError) {
            // Mostra erro
            errorMessage.textContent = signUpError.message;
            errorMessage.classList.remove('hidden');
            return;
        }

        // Se o signup foi bem-sucedido
        const userId = signUpData.user.id; // Pega o ID gerado no auth.users

        // Depois insere na tabela personalizada 'users'
        const { error: insertError } = await supabase
            .from('users')
            .insert([{
                name: name,
                email: email,
                user_id: userId,
                status: 1
            }]);

        if (insertError) {
            // Mostra erro
            errorMessage.textContent = insertError.message;
            errorMessage.classList.remove('hidden');
            return;
        }

        // Tudo certo, redireciona
        errorMessage.classList.add('hidden');
        console.log('Usuário registrado e adicionado na tabela personalizada.');
        window.location.href = "dashboard.html";
    });
});
