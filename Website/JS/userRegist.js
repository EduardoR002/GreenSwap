document.getElementById("registerButton").addEventListener("click", function() {
    // Pega os valores dos campos do formulário
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;
    var description = document.getElementById("description").value;
    // O campo de foto é um pouco diferente, pois é um campo de arquivo
    var photo = document.getElementById("fotoInput").files[0];

    // Cria um objeto FormData para enviar os dados do formulário, incluindo a foto
    var formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('photo', photo);

    // Envia uma solicitação POST para a rota de criação de usuário da API
    fetch('http://localhost:port/users/create', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Lida com a resposta da API
        console.log(data);
        // Aqui você pode fazer algo com a resposta, como exibir uma mensagem de sucesso ou redirecionar o usuário para outra página
    })
    .catch(error => {
        console.error('Error:', error);
        // Lida com o erro da API
        // Aqui você pode exibir uma mensagem de erro para o usuário
    });
});