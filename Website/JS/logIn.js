//Function that will login the user on the website
function login() {

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;


    var userData = {
        email: email,
        password: password,
    };
    
    console.log(userData);

   /* fetch('http://localhost:3000/users/create', {
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

    */
}
