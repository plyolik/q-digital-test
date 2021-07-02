import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export default function Authorization(props) {

    const [ person, setPerson ] = useState('');
    const [ password, setPassword ] = useState('');
        
    function handleChange(e) {
        setPerson(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }
        
    function handleSubmit(e) {
        localStorage.setItem('email', person)
        localStorage.setItem('pass', password)
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className="authorization">
            <h2>Авторизация</h2>
            <p>Введите ваш e-mail</p>
            <input type="text" name="auth-mail" onChange={handleChange}  value={person} placeholder="Введите ваш e-mail"></input>
            <p>Введите ваш пароль</p>
            <input type="password" name="auth-password" onChange={handlePasswordChange} placeholder="Введите ваш пароль"></input><br/>
            <button type="submit">Отправить</button>
        </form>
    );
}
