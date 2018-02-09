import React, {Component} from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import TodoListItem from './TodoListItem'
import DeleteModal from './DeleteModal'
import ValidationMessage from './ValidationMessage'
import statusList from './statusList'
import inputValidation from "./inputValidation";

export default class EditTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalOpen: false,
            title: this.props.task.title,
            prior: this.props.task.prior,
            state: this.props.task.state,
            deadLine: this.props.task.deadLine,
            index: this.props.task.index
        }
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleChange = (e, { name,value }) => this.setState({ [name]: value })

    validationCheckMessage = () => {
        const check = new inputValidation(this.state)
        const messages = []

        if (!check.titleValidation()) { messages.push("It's too long or empty title. Maximum size of title is 50 symbols") }
        if (!check.dateValidation()) { messages.push("There is incorrect deadline date. It must be not before today") }
        if (!check.stateValidation()) { messages.push("Incorrect state") }
        if (!check.priorValidation()) { messages.push("Incorrect priority") }

        return messages
    }

    validationCheck = () => {
        const check = new inputValidation(this.state)
        if (!check.totalCheck()) {
            this.msg.setState({hidden: false, messages: this.validationCheckMessage()})
        } else {
            this.msg.setState({hidden: true, messages: []})
            this.sendTask()
        }
    }

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
                "&deadLine="+this.state.deadLine+
                "&index="+this.state.index
        })
            .then(res => {
                this.props.todoListUpdate();
                res.json()
            })
            .then(tasks => console.log(tasks));

        this.handleClose();
    }

    deleteTask = () => {
        fetch('/tasks/'+this.props.task._id, {
            method: 'DELETE',
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
        })
            .then(res => res.json())
            .then(tasks => console.log(tasks));

        this.handleClose();
        this.props.todoListUpdate();
    }

    render() {
        const {title,prior,deadLine} = this.state
        const priority = this.props.priority

        const stateElement = statusList.map((state,index) =>
            <Button
                key={index}
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
                        todoListUpdate={this.props.todoListUpdate.bind(this)}
                    />
                }
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
                    <ValidationMessage onRef={ref => (this.msg = ref)} />
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.validationCheck} color='green'>Update task</Button>
                    <DeleteModal deleteTask={this.deleteTask.bind(this)} />
                </Modal.Actions>
            </Modal>
        )
    }
}