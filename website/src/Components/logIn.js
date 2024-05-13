import '../CSS/logIn.css';
import GreenSwap from '../images/GreenSwap.png';

function Login() {
    // Função para lidar com o clique no botão de login
    const login = () => {
        // Coloque aqui a lógica de login
        console.log('Login clicked');
    };

    return (
        <div>
            <div id="bg"></div>

            <div className="main">
                {/* Ícone clicável que leva o usuário para a página inicial */}
                <div className="iconDiv">
                    <a href="home.html">
                    <img src={GreenSwap} style={{ width: '60%', height: '60%' }} className="icon" alt="GreenSwap Icon" />
                    </a>
                </div>

                {/* Formulário */}
                <div className="formDiv">
                    <span className="poppins-regular greetings"><b>Welcome!</b></span>

                    <div className="input-box">
                        <span className="material-symbols-outlined">
                            person
                        </span>
                        <input className="poppins-regular textBox" type="text" id="email" placeholder="Email" />
                    </div>

                    <div className="input-box">
                        <span className="material-symbols-outlined">
                            lock
                        </span>
                        <input className="poppins-regular textBox" type="password" id="password" placeholder="Password" />
                    </div>
                    
                    <button className="poppins-regular" onClick={login}>Login</button>

                    <span className="poppins-regular linknote">Not registered? <a href="register.html">Create an account</a></span>
                </div>
            </div>
        </div>
    );
}

export default Login;