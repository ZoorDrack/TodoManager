import React, {Component} from 'react'
import { Table, Icon } from 'semantic-ui-react'

export default class TodoListItem extends Component {
    checkDeadLine = (deadLineISO) => {
        const curDate = new Date();
        const deadLine = new Date(deadLineISO)

        if ((this.props.task.state !== 'Resolved')) return (curDate >= deadLine)
    }

    checkResolve = () => {return (this.props.task.state === 'Resolved')}

    checkClosed = () => {return (this.props.task.state === 'Closed')}

    moveItem = (direction) => {
        const index = (direction === 'up') ? (Number(this.props.task.index)-1.1) : (Number(this.props.task.index)+1.1)
        fetch('/tasks/'+this.props.task._id, {
            method: 'PATCH',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body:
                "index="+index
        })
            .then(res => {
                this.props.todoListUpdate();
                res.json()
            })
    }

    upItem = () => {
        this.moveItem('up');
    }

    downItem = () => {
        this.moveItem('down');
    }

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
                <Table.Cell  textAlign='center'>
                    <Icon name='up chevron' style = {{cursor: 'pointer'}} onClick = {this.upItem} />
                    <Icon name='down chevron' style = {{cursor: 'pointer'}} onClick = {this.downItem} />
                </Table.Cell>
            </Table.Row>
        )
    }
}