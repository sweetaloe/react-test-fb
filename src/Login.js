import { useState } from "react";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, browserSessionPersistence, setPersistence } from "firebase/auth";
import { auth } from './firebase';


export function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [regMode, setRegMode] = useState(false);


    const handleLogin = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);
    const handleRegMode = () => setRegMode(prev => !prev);


    const loginUser = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('error', error)
            });
    }

    const registerUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('error', error)
            });
    }



    return (
        <div className="App">
            <div>

                <div style={{ display: 'flex', flexDirection: 'row', margin: 'auto', width: '100%' }}>
                    <div style={{ width: '100%' }}>
                        <h3 style={{ marginTop: '20px' }}>{regMode ? 'Стать смешариком' : 'Войти'}</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto', width: 'fit-content', padding: '20px' }}>
                            <h4>Имейл:</h4>
                            <input
                                type="string"
                                placeholder='login'
                                value={email}
                                onChange={handleLogin}
                            />
                            <h4>Паролито:</h4>
                            <input
                                type="string"
                                placeholder='password'
                                value={password}
                                onChange={handlePassword}
                            />

                            {regMode && <>
                                <h4>Имя:</h4>
                                <input
                                    type="string"
                                    placeholder='name'
                                    value={name}
                                    onChange={handleName}
                                />
                            </>
                            }

                        </div>


                        <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto', width: 'fit-content', padding: '20px' }}>
                            <button onClick={regMode ? registerUser : loginUser}>{regMode ? 'Зарегистрироваться' : 'Войти'}</button>
                            <button className="link-button" onClick={handleRegMode}>{regMode ? 'Я уже смешарик' : 'Хочу стать смешариком'}</button>
                        </div>
                    </div>

                </div>


            </div>


        </div>
    );
}
