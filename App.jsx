import React from 'react';


export default class App extends React.Component {
    state = {
      count: 0,
      isCounting: false,
    };

    componentDidMount() {
      let userTimer = localStorage.getItem('timer');
      if (userTimer) {
        this.setState({count: +userTimer});
      }
    }

    componentDidUpdate() {
      localStorage.setItem('timer', this.state.count);
    }

    componentWillUnmount() {
      clearInterval(this.counterId);
    }

    render() {
      let handleStart = () => {
        this.setState({isCounting: true});
        this.counterId = setInterval(() => {
          this.setState({count: this.state.count + 1});
        }, 1000);
      }

      let handleStop = () => {
        this.setState({isCounting: false});
        clearInterval(this.counterId);
      }

      let handleReset = () => {
        this.setState({count: 0});
        this.setState({isCounting: false});
        clearInterval(this.counterId);
      }
        return (
            <div className="App">
                <h1>React Timer</h1>
                <h3>{this.state.count}</h3>
                {!this.state.isCounting ? (
                    <button onClick={handleStart}>Start</button>
                ) : (
                    <button onClick={handleStop}>Stop</button>
                )}
                <button onClick={handleReset}>Reset</button>
            </div>
        );
    }
}
