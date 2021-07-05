import React from 'react';

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: [],
            points: 0,
            question: '',
            time: 0,
            interval: 0,
            statistic: null,
            disabled: false
        }
    }

    componentDidMount = () => {
        if (!localStorage.getItem('token')) {
            this.props.history.push('/authorization')
            return
        }
        this.createFieldGame()
    }

    componentWillUnmount = () => {
        clearInterval(this.state.interval)
    }

    createFieldGame = () => {
        let game = JSON.parse(localStorage.getItem('game'))
        if (!game) {
            this.props.history.push('/start-testing')
            return
        }

        localStorage.removeItem('game')

        this.setState ({time: game.time })
        this.setState({question: game.question})
        this.setState({points: game.points})
        this.setState({options: game.options})
        this.timer()
    }

    handleGoBackClick = (e) => {
        this.props.history.push('/start-testing')
    }

    renderOptions = () => {
        return this.state.options && this.state.options.length > 0
            ? this.state.options.map(o => (<div disabled={this.state.disabled} key={o} onClick={() => this.handleOptionClick(o)} className="answer">{o}</div>)) 
            : (<div>No options</div>)
    }

    handleOptionClick = (option) => {
        console.log(option)

        this.setState({disabled: true})

        clearInterval(this.state.interval)
        let tokenJson = localStorage.getItem('token')
        let token = JSON.parse(tokenJson)
        let accessToken = token.access_token
        let level = parseInt(localStorage.getItem('level'))

        fetch("https://internsapi.public.osora.ru/api/game/play", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                'answer': option,
	            'type_hard': level,
                'type': 2
            })
        })
            .then(response => response.json())
            .then(response => {
                if (!response.status) {
                    const error = Object.keys(response.errors).map(k => response.errors[k].join(',')).join('\n')
                    alert(error)
                    return
                }

                if (!response.data.questions) {
                    this.setState({disabled: false})
                    let responseJson = JSON.stringify(response.data)
                    localStorage.setItem('game', responseJson)
                    this.createFieldGame()
                    console.log(response)
                    return
                } 

                this.setState({statistic: response.data})
            })
    }

    timer = () => {
        this.setState({interval: setInterval(() => {
                let time = this.state.time
                if ( time > 0 ) {
                    time = time - 1
                    this.setState({time: time})
                }  else {
                    clearInterval(this.state.interval)
                    this.setState({disabled: true})
                    alert('Время истекло')
                }
            }, 1000)
        })
    }

    
    render() {
        return(
            <div className="authorization">
                <p>SCORE: {this.state.points} </p>
                <p>TIME: {this.state.time}</p>
                { !this.state.statistic 
                    ? (
                        <div>
                            <p>{this.state.question}</p>
                            <div className="box">
                                {this.renderOptions()}
                            </div>
                            <button onClick={this.handleGoBackClick} className="btn">Go Back</button>
                        </div>
                    )
                    : (
                        <div className="statistic">
                            <p>END GAME</p>
                            <table>
                                <thead>
                                    <th>Question</th>
                                    <th>Answer</th>
                                    <th>Correct</th>
                                </thead>
                                <tbody>
                                    {this.state.statistic.questions.map(q => {
                                        return (
                                            <tr>
                                                <td>{q.question}</td>
                                                <td>{q.current_answer}</td>
                                                <td>{q.answer}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <button onClick={this.handleGoBackClick} className="btn">Try again</button>
                        </div>
                    )
                }
            </div>
        )
    }
}