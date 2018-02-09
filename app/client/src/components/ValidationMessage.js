import React, {Component} from 'react'
import { Message } from 'semantic-ui-react'

export default class ValidationMessage extends Component {
    constructor(props) {
        super(props)

        this.state ={
            hidden: true,
            messages: []
        }
    }

    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    render() {
        const messageStrings = this.state.messages.map((message,index) =>
            <Message.Item key={index}>{message}</Message.Item>
        )

        return (
            <Message
                error
                hidden={this.state.hidden}
            >
                <Message.Header>Incorrect input data</Message.Header>
                <Message.List>
                    {messageStrings}
                </Message.List>
            </Message>
        )
    }
}
