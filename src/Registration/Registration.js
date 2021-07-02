import React, { useState } from 'react';

export default function Registration(props) {

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
        <h2>Регистрация</h2>
        <p>Введите ваше имя</p>
        <input type="text" name="auth-name" onChange={handleChange} placeholder="Введите ваше имя"></input>
        <p>Введите ваш e-mail</p>
        <input type="text" name="auth-mail" onChange={handleChange}  value={person} placeholder="Введите ваш e-mail"></input>
        <p>Введите ваш пароль</p>
        <input type="password" name="auth-password" onChange={handlePasswordChange} placeholder="Введите ваш пароль"></input><br/>
        <p>Подтвердите пароль</p>
        <input type="password" name="auth-password"  placeholder="Подтвердите пароль"></input><br/>
        <button className="button" type="submit">Отправить</button>
    </form>
    )
}