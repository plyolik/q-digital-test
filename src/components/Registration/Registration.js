import React from 'react';

export default class Registration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            person: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        }
    }

    handleChange = (e) => {
        this.setState({ person: e.target.value });
    }

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    handlePasswordConfirmationChange = (e) => {
        this.setState({passwordConfirmation: e.target.value});
    }
        
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.password !== this.state.passwordConfirmation) {
            alert('Пароли не совпадают!')
            return
        }

        let user = {
            name: this.state.person,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.passwordConfirmation
        }

        fetch("https://internsapi.public.osora.ru/api/auth/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(response => {
                if (!response.status) {
                    const error = Object.keys(response.errors).map(k => response.errors[k].join(',')).join('\n')
                    alert(error)
                    return
                }
                
                this.props.history.push('/authorization')
            })

        this.setState({ person: ''});
        this.setState({ email: ''});
        this.setState({ password: ''});
        this.setState({ passwordConfirmation: ''});
    }

    render() { 
        return ( 
            <form onSubmit={this.handleSubmit} className="authorization">
            <h2>Регистрация</h2>
            <p>Введите ваше имя</p>
            <input type="text" name="auth-name" onChange={this.handleChange} value={this.state.person} placeholder="Введите ваше имя"></input>
            <p>Введите ваш e-mail</p>
            <input type="text" name="auth-mail" onChange={this.handleEmailChange}  value={this.state.email} placeholder="Введите ваш e-mail"></input>
            <p>Введите ваш пароль</p>
            <input type="password" name="auth-password" onChange={this.handlePasswordChange} value={this.state.password}  placeholder="Введите ваш пароль"></input><br/>
            <p>Подтвердите пароль</p>
            <input type="password" name="auth-password-confirmation" onChange={this.handlePasswordConfirmationChange} value={this.state.passwordConfirmation} placeholder="Подтвердите пароль"></input><br/>
            <button className="button" type="submit">Отправить</button>
        </form>
        )
    }
}