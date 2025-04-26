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

        const userId = signUpData.user.id; // ID do auth.users

        // Insere na tabela personalizada 'users'
        const { data: insertData, error: insertError } = await supabase
            .from('users')
            .insert([{
                name: name,
                email: email,
                user_id: userId,
                status: 1
            }])
            .select()
            .single(); // retorna o registro inserido direto

        if (insertError) {
            // Mostra erro
            errorMessage.textContent = insertError.message;
            errorMessage.classList.remove('hidden');
            return;
        }

        // Salva no Local Storage
        localStorage.setItem('user', JSON.stringify({
            id: insertData.id,
            name: insertData.name,
            email: insertData.email
        }));

        errorMessage.classList.add('hidden');
        console.log('Usuário registrado e salvo no localStorage.');

        // Redireciona
        window.location.href = "dashboard.html";
    });
});