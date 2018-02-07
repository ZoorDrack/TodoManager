import React, {Component} from 'react'
import { Button, Form, Icon, Modal, Dropdown } from 'semantic-ui-react'

export default class NewTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalOpen: false,
            title: '',
            prior: '',
            state: 'New',
            deadLine: new Date()
        }
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    handleChange = (e, { name,value }) => this.setState({ [name]: value })

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
            .then(res => res.json())
            .then(tasks => console.log(tasks));

        this.setState({
            title: '',
            prior: '',
            state: 'New',
            deadLine: new Date()
        })
        this.handleClose();
        this.props.todoListUpdate();
    }

    render() {
        const {title,prior,state,deadLine} = this.state
        const priority = this.props.priority

        return (
            <Modal
                trigger={<Button onClick ={this.handleOpen} className={'float-right'}>Add new task</Button>}
                style={'margin: 10em 0em 10em -44%;'}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                size='small'
            >
                <Modal.Header>Insert a new task</Modal.Header>
                <Modal.Content>
                    <Form className='attached fluid'>
                        <Form.Group widths='equal' size='small'>
                            <Form.Input
                                fluid
                                label='Title'
                                placeholder='Title'
                                type='text'
                                name='title'
                                value={title}
                                onChange={this.handleChange}
                            />
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
                        </Form.Group>
                        <Form.Input
                            label='Deadline date'
                            placeholder='Deadline'
                            type='date'
                            name='deadLine'
                            value={deadLine}
                            onChange={this.handleChange}
                        />
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.sendTask} color='green'>Add task</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}