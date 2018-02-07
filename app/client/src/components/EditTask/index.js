import React, {Component} from 'react'
import { Button, Form, Icon, Modal, Dropdown } from 'semantic-ui-react'
import TodoListItem from '../TodoListItem'
import statusList from '../statusList'

export default class EditTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalOpen: false,
            title: this.props.task.title,
            prior: this.props.task.prior,
            state: this.props.task.state,
            deadLine: this.props.task.deadLine
        }
    }

    handleOpen = () => {
        this.setState({ modalOpen: true })
        console.log(this.props.task)
    }

    handleClose = () => this.setState({ modalOpen: false })

    handleChange = (e, { name,value }) => this.setState({ [name]: value })

    checkState = (state,button) => {
        return state === button
    }

    sendTask = () => {
        fetch('/tasks/'+this.props.task._id, {
            method: 'PUT',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body:
                "title="+this.state.title+
                "&prior="+this.state.prior+
                "&state="+this.state.state+
                "&deadLine="+this.state.deadLine
        })
            .then(res => res.json())
            .then(tasks => console.log(tasks));

        this.handleClose();
        this.props.todoListUpdate();
    }

    render() {
        const {title,prior,state,deadLine} = this.state
        const priority = this.props.priority

        const stateElement = statusList.map((state,index) =>
            <Button
                active={this.checkState(this.state.state,state.text)}
                placeholder='Status'
                type='text'
                name='state'
                value={state.text}
                onClick={this.handleChange}
            >
                {state.text}
            </Button>
        )

        return (
            <Modal
                trigger={
                    <TodoListItem
                        task={this.props.task}
                        priority={this.props.priority}
                        handleOpen={this.handleOpen.bind(this)}
                    />
                }
                style={'margin: 10em 0em 10em -44%;'}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                size='small'
            >
                <Modal.Header>Edit task</Modal.Header>
                <Modal.Content>
                    <Form className='attached fluid'>
                        <Form.Input
                            fluid
                            label='Title'
                            placeholder='Title'
                            type='text'
                            name='title'
                            value={title}
                            onChange={this.handleChange}
                        />
                        <Form.Group widths='equal' size='small'>
                            <Form.Dropdown
                                fluid
                                search
                                selection
                                options={priority}
                                label='Priority'
                                placeholder='Priority'
                                type='text'
                                name='prior'
                                value={prior}
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                label='Deadline date'
                                placeholder='Deadline'
                                type='date'
                                name='deadLine'
                                value={deadLine}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Button.Group
                            fluid
                        >
                            {stateElement}
                        </Button.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.sendTask} color='green'>Update task</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}