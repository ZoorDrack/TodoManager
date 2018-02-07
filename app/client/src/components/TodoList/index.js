import React, {Component} from 'react'
import TodoItemList from '../TodoListItem/index'
import EditTask from '../EditTask/index'
import { Table, Input, Dropdown } from 'semantic-ui-react'
import priority from "../priority";

export default class TodoList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const todoElements = this.props.tasks.map((task,index) =>
            <EditTask
                key={task._id}
                task={task}
                todoListUpdate={this.props.todoListUpdate.bind(this)}
                priority={this.props.priority}
            />

        )

        return (
            <Table
                celled
                basic
                selectable
            >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Priority</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {todoElements}
                </Table.Body>
            </Table>
        )
    }
}