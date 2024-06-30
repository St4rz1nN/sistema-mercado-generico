async function checkUsuarioSession(){
    try {
        const response = await fetch('http://127.0.0.1:3000/permissao/checkUsuarioSession', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' // Adicionado para incluir cookies


        });

        const data = await response.json();
        if (data.session === false) {
            alert("Sua sessão expirou! Logue-se novamente!");
            window.location.href = './Login.html';
            return false;
        }
        return true;
    } catch (error) {
        console.log('Erro ao obter informações da Sessão do Usuario: ', error);
        return false;
    }
}