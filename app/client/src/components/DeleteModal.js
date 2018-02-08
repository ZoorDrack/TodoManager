import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

class DeleteModal extends Component {
    constructor(props) {
        super(props)

        this.state = { open: false }
    }

    show = size => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })

    render() {
        const { open, size } = this.state

        return (

                <Modal
                    size={size}
                    open={open}
                    onClose={this.close}
                    trigger={
                        <Button onClick={this.show('mini')} color='red' floated='right'>Delete</Button>
                    }
                >
                    <Modal.Header>
                        Delete Task
                    </Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete this task</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close}>
                            No
                        </Button>
                        <Button
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content='Yes'
                            onClick={
                                this.props.deleteTask
                            }
                        />
                    </Modal.Actions>
                </Modal>
        )
    }
}

export default DeleteModal