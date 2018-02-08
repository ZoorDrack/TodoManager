import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import NewTask from '../NewTask'
import TodoList from '../TodoList'
import './style.css';
import priority from '../priority'
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
                    <NewTask
                        todoListUpdate={this.todoListUpdate.bind(this)}
                        priority={priority}
                        floating={''}
                    />
                </div>
                <div style={{padding: '20px'}}>
                    <TodoList
                        tasks={this.state.tasks}
                        todoListUpdate={this.todoListUpdate.bind(this)}
                        priority={priority}
                    />
                </div>
            </div>
        );
    }
}

export default App;
