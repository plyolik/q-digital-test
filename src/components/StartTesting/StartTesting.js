import React from 'react';

export default class Registration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            level: '1'
        }
    }

    handleStartClick = (e) => {
        e.preventDefault()

        let tokenJson = localStorage.getItem('token')
        let token = JSON.parse(tokenJson)
        let accessToken = token.access_token
        let level = parseInt(this.state.level)

        fetch('https://internsapi.public.osora.ru/api/game/play', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                'type_hard': level,
                'type': 1 // я не понимаю откуда этот тип, но без него не работает Что это?
            })
        })
            .then(response => response.json())
            .then(response => console.log(response))
    }
    
    handleLevelChange = (e) => {
        this.setState({level: e.target.value})
    }
    
    render() {
        return (
            <div className="authorization">
                <select onChange={this.handleLevelChange}>
                    <option disabled="disabled" value>Выберите сложность</option>
                    <option value="1">Easy/Легко</option>
                    <option value="2">Тяжело</option>
                </select><br/>
                <button onClick={this.handleStartClick} className="button">Start</button>
            </div>
        )
    }
}