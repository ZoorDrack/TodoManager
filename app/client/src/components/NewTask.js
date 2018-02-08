import React, {Component} from 'react'
import dateConverter from './dateConverter'
import inputValidation from './inputValidation'
import ValidationMessage from './ValidationMessage'
import { Button, Form, Modal } from 'semantic-ui-react'

export default class NewTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalOpen: false,
            title: '',
            prior: '',
            state: 'New',
            deadLine: new dateConverter().todayISO()
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

    sendTask = () => {
        fetch('/tasks', {
            method: "POST",
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body:
                "title="+this.state.title+
                "&prior="+this.state.prior+
                "&state="+this.state.state+
                "&deadLine="+this.state.deadLine
        })
            .then(res => {
                this.props.todoListUpdate();
                res.json()
            })
            .then(tasks => console.log(tasks));

        this.setState({
            title: '',
            prior: '',
            state: 'New',
            deadLine: new dateConverter().todayISO()
        })
        this.handleClose();
    }

    render() {
        const {title,prior,deadLine} = this.state
        const priority = this.props.priority

        return (
            <Modal
                trigger={
                    <Button
                        onClick ={this.handleOpen}
                        className={'float-right'}
                        floated='right'
                        color='blue'
                    >
                        Add new task
                    </Button>
                }
                open={this.state.modalOpen}
                onClose={this.handleClose}
                size='small'
            >
                <Modal.Header>Insert a new task</Modal.Header>
                <Modal.Content>
                    <Form className='attached fluid' error>
                        <Form.Group widths='equal' size='small'>
                            <Form.Input
                                id='title-input'
                                fluid
                                label='Title'
                                placeholder='Title'
                                type='text'
                                name='title'
                                value={title}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
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
                                id='deadline-input'
                                label='Deadline date'
                                placeholder='Deadline'
                                type='date'
                                name='deadLine'
                                value={deadLine}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                    </Form>
                    <ValidationMessage onRef={ref => (this.msg = ref)} />
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.validationCheck} color='green'>Add task</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}