import React from 'react';

export default class Authorization extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }
 
    handleChange = (e) => {
        this.setState({email: e.target.value});
    }
    handlePasswordChange = (e) =>  {
        this.setState({password: e.target.value});
    }
        
    handleSubmit = (e) =>  {
        e.preventDefault();
        
        let user = {
            email: this.state.email,
            password: this.state.password,
        }

        fetch("https://internsapi.public.osora.ru/api/auth/login", {
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

                let responseJson = JSON.stringify(response.data)
                localStorage.setItem('token', responseJson)
            })

        this.setState({ email: ''});
        this.setState({ password: ''});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="authorization">
                <h2>Авторизация</h2>
                <p>Введите ваш e-mail</p>
                <input type="text" name="auth-mail" onChange={this.handleChange}  value={this.state.email} placeholder="Введите ваш e-mail"></input>
                <p>Введите ваш пароль</p>
                <input type="password" name="auth-password" onChange={this.handlePasswordChange} value={this.state.password} placeholder="Введите ваш пароль"></input><br/>
                <button className="button" type="submit">Отправить</button>
            </form>
        );
    }
}
