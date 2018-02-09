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
                        <Table.HeaderCell width={2}>Status</Table.HeaderCell>
                        <Table.HeaderCell width={8}>Title</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Date</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Priority</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Position</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {todoElements}
                </Table.Body>
            </Table>
        )
    }
}