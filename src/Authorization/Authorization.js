import React from 'react';

export default class Authorization extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }
    // const users = []

    // function getUsers() {
    //     const usersJson = localStorage.getItem('users')
    //     users = usersJson ? JSON.parse(usersJson) : []
    // }
        
    handleChange = (e) => {
        this.setState({email: e.target.value});
    }
    handlePasswordChange = (e) =>  {
        this.setState({password: e.target.value});
    }
        
    handleSubmit = (e) =>  {
        e.preventDefault();
        
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
