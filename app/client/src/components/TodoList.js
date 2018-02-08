import React, {Component} from 'react'
import EditTask from './EditTask'
import { Table } from 'semantic-ui-react'

export default class TodoList extends Component {
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
                selectable
                color='blue'
                sortable
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