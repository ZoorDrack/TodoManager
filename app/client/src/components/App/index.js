import React, { Component } from 'react'
import 'semantic-ui-css/semantic.css'
import NewTask from '../NewTask/index'
import TodoList from '../TodoList/index'
import logo from './logo.svg'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css';
import { Header } from 'semantic-ui-react'

class App extends Component {
    state = {
        tasks: []
    }

    componentDidMount() {
        this.todoListUpdate();
    }

    todoListUpdate() {
        fetch('/tasks', {
            method: "GET"
        })
            .then(res => res.json())
            .then(tasks => this.setState({ tasks }));
    }

    render() {
        return (
            <div>
                <div className='App-header'>
                    <Header
                        as='h2'
                        floated='left'
                        inverted
                        color='grey'
                        content='Todo Manager'
                    />
                    <NewTask todoListUpdate={this.todoListUpdate.bind(this)} />
                </div>
                <div style={{padding: '20px'}}>
                    <TodoList tasks={this.state.tasks}/>
                </div>
            </div>
        );
    }
}

export default App;
