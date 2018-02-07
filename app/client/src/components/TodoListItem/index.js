import React, {Component} from 'react'
import { Table, Input, Dropdown } from 'semantic-ui-react'

export default class TodoListItem extends Component {
    constructor(props) {
        super(props)
    }

    checkDeadLine = (deadLineISO) => {
        const curDate = new Date();
        const deadLine = new Date(deadLineISO)

        if ((this.props.task.state !== 'Resolved')) return (curDate >= deadLine)
    }

    checkResolve = () => {return (this.props.task.state === 'Resolved')}

    checkClosed = () => {return (this.props.task.state === 'Closed')}

    render() {
        return (
            <Table.Row
                error={this.checkDeadLine(this.props.task.deadLine)}
                positive={this.checkResolve()}
                disabled={this.checkClosed()}
            >
                <Table.Cell selectable>
                    <a onClick = {this.props.handleOpen}>
                        {this.props.task.state}
                    </a>
                </Table.Cell>
                <Table.Cell selectable>
                    <a onClick = {this.props.handleOpen}>
                        {this.props.task.title}
                    </a>
                </Table.Cell>
                <Table.Cell selectable>
                    <a onClick = {this.props.handleOpen}>
                        {this.props.task.deadLine}
                    </a>
                </Table.Cell>
                <Table.Cell selectable>
                    <a onClick = {this.props.handleOpen}>
                        {this.props.task.prior}
                    </a>
                </Table.Cell>
            </Table.Row>
        )
    }
}