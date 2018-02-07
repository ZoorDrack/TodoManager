import React, {PureComponent} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Button, Card } from 'semantic-ui-react'

class TodoItem extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            count: 0
        }
    }

    componentWillMount() {
        console.log('---', 'mounting')
    }

    render () {
        const {task} = this.props;
        const style = {width: '40%'};
        /*return (
            <div className="card mx-auto float-left" style={style}>
                <div className="card-header">
                    <h2>
                        {task.title}
                    </h2>
                </div>
                <div className="card-body">
                    <h6 className="card-subtitle text-muted">
                        deadline date: {(new Date(task.deadLine)).toDateString()}
                    </h6>
                    <h3>
                        state: {task.state}
                    </h3>
                    <h3>
                        priority: {task.prior}
                    </h3>
                </div>
            </div>
        )*/

        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        {task.title}
                    </Card.Header>
                    <Card.Meta>
                        {task.state}
                    </Card.Meta>
                    <Card.Description>
                        Dead line: <strong>{(new Date(task.deadLine)).toDateString()}</strong>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui four buttons'>
                        <Button size='mini'>New</Button>
                        <Button size='mini' active>Active</Button>
                        <Button size='mini'>Resolved</Button>
                        <Button size='mini'>Closed</Button>
                    </div>
                </Card.Content>
            </Card>
        )
    }
}

export default TodoItem;