import React, {PureComponent} from 'react'
import TodoItem from '../TodoItem'
import './style.css'

export default class TodoItemList extends PureComponent {
    state = {
        newestTask: null
    }

    render() {
        console.log(this.props);
        const todoElements = this.props.tasks.map((task,index) =>
            <li key = {task._id} className = 'todo-item clearfix'>
                <TodoItem task = {task}/>
            </li>
        )
        return (
            <ul>
                {todoElements}
            </ul>
        )
    }
}