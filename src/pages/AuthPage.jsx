import React, { useState } from 'react';
import { useHistory } from 'react-router';
const AuthPage = () => {
    const history = useHistory();
    const [info, setInfo] = useState({user: '', password: ''});
    const [userError, setUserError] = useState(false);
    const [passError, setPassError] = useState(false);
    const [passShow, setPassShow] = useState(false);
    const [respError, setRespError] = useState(false);
    const onInputChange = (event) => {
        setInfo({...info, [event.target.name]: event.target.value});
        if (event.target.name === 'user'){
            if (event.target.value){
                setUserError(false);
            }
        }
        if (event.target.name === 'password'){
            if (event.target.value){
                setPassError(false);
            }
        }
    }
    const fetchData = async (url,method, body={}) => {
            await fetch(url,{ headers: {'Content-Type': 'application/json'},method, body: JSON.stringify(body)})
            .then(response => {if (response.status == 200) {
                setRespError(false);
                return response.body}
                else {
                    setRespError(true)
                }
            })
            .then(rb => {
            const reader = rb.getReader();
            return new ReadableStream({
                start(controller) {
                function push() {
                    reader.read().then( ({done, value}) => {
                        if (done) {
                            controller.close();
                            return;
                        }
                        controller.enqueue(value);
                        push();
                    })
                }
                push();
                }
        });
        })
        .then(stream => {
            return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
        })
        .then(result => {
            window.localStorage.setItem('token',(JSON.parse(result).token));
        })
        
    };
    const onEyeClick = (event) => {
        event.preventDefault();
        setPassShow(!passShow);
    }
    const onFormSubmit = async (event) => {
        event.preventDefault();
        if (!info.user){
            setUserError(true);
        }
        if (!info.password){
            setPassError(true)
        }
        if (info.password && info.user){
            await fetchData('https://emphasoft-test-assignment.herokuapp.com/api-token-auth/','POST', {username: info.user, password: info.password});
            history.push('users');
        
        }
    }
    return (
        <div className="w-screen h-screen bg-gradient-to-tr from-bright-turquoise to-electric-violet pt-20">
            <form className="container mx-auto pt-6 bg-white w-96 h-96 md:w-128 md:h-104 rounded-xl">
                <h2 className="text-center text-5xl">Вход</h2>
                {userError || passError || respError ? <section className="ml-8 mr-8 mt-4 pl-4 h-14 pt-1 bg-red-400 rounded-xl">
                    {userError && <p className="text-md">Отсутствует логин</p>}
                    {passError && <p className="text-md">Отсутствует пароль</p>}
                    {respError && <p className="text-md">Неверные данные</p>}
                </section> : null
                }
                <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 h-6 w-6 absolute ml-10 mt-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input placeholder="Введите логин:" className={`focus:outline-none focus:border-bright-turquoise pl-8 text-xl w-80 md:w-112 h-12 border-2 ${userError ? 'border-red-500' : 'border-black'} rounded-xl ml-8 mt-4`} onChange={onInputChange} type="text" id="user" name="user"/>
                <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 h-6 w-6 absolute ml-10 mt-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {!passShow ? <svg onClick={onEyeClick} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer h-6 w-6 absolute ml-76 md:ml-108 mt-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg> :
                <svg onClick={onEyeClick} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer h-6 w-6 absolute ml-76 md:ml-108 mt-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                }
                <input placeholder="Введите пароль:" className={`focus:outline-none  focus:border-bright-turquoise pl-8 text-xl w-80 md:w-112 h-12 pr-12 border-2 ${passError ? 'border-red-500' : 'border-black'} rounded-xl ml-8 mt-4`} onChange={onInputChange} type={passShow ? 'text' : 'password'} id="password" name="password" />
                <div className="flex">
                    <button onClick={onFormSubmit} className="mx-auto text-white text-2xl rounded-full mt-8 md:mt-16 bg-gradient-to-tr from-bright-turquoise to-electric-violet w-64 h-14">Войти</button>
                </div>
            </form>
        </div>
    )
}
export default AuthPage;