import React, {Component} from 'react'
import { Table } from 'semantic-ui-react'

export default class TodoList extends Component {
    checkDeadLine = (deadLineISO) => {
        var curDate = new Date();
        var deadLine = new Date(deadLineISO)

        if (curDate >= deadLine) {
            return true
        } else {
            return false
        }
    }

    render() {
        const todoElements = this.props.tasks.map((task,index) =>
            <Table.Row error={this.checkDeadLine(task.deadLine)}>
                <Table.Cell>{task.state}</Table.Cell>
                <Table.Cell>{task.title}</Table.Cell>
                <Table.Cell>{task.deadLine}</Table.Cell>
                <Table.Cell>{task.prior}</Table.Cell>
            </Table.Row>
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