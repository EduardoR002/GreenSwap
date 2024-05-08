function test() {
    var name = document.getElementById("name").value;
    var address = document.getElementById("adress").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var description = "test";


    var userData = {
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: address,
        description: description // Como está fixo em "test", não precisa ser enviado
    };
    
    console.log(userData);

    fetch('http://localhost:3000/users/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
