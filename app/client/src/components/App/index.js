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

    componentDidMount = () => {
        this.todoListUpdate();
    }

    todoListUpdate = () => {
        fetch('/tasks', {
            method: "GET"
        })
            .then(res => res.json())
            .then(tasks => {
                this.setState({ tasks })
                this.newTaskIndexBind(tasks)
            })

    }

    newTaskIndexBind = (list) => {
        const index = (list !== undefined) ? list[list.length-1].index + 1 : 0
        this.newTask.setState({index: index})
    }

    render() {
        const style = {
            padding: '20px',
            maxWidth: '1000px',
            margin: 'auto'
        }
        return (
            <div>
                <div className='App-header'>
                    <div style={{maxWidth: '900px',margin: 'auto'}}>
                        <Header
                            as='h2'
                            floated='left'
                            inverted
                            color='grey'
                            content='Todo Manager'
                        />
                        <NewTask
                            index={this.state.tasks}
                            todoListUpdate={this.todoListUpdate.bind(this)}
                            onRef={ref => (this.newTask = ref)}
                            priority={priority}
                            floating={''}
                        />
                    </div>
                </div>
                <div style={style}>
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
