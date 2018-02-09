import priority from './priority'
import statusList from './statusList'

export default class inputValidation {
    constructor(props) {
        this.props = {
            title: props.title,
            prior: props.prior,
            state: props.state,
            deadLine: props.deadLine
        }
    }

    titleValidation = () => {
        return (this.props.title.length <= 50 && this.props.title.length > 0)
    }

    dateValidation = () => {
        var today = new Date(),
            check = new Date(this.props.deadLine)
        today.setHours(0,0,0,0)

        return (today <= check)
    }

    stateValidation = () => {
        var element = {
            text: this.props.state,
            value: this.props.state
        }

        return this.containsObject(statusList,element)
    }

    priorValidation = () => {
        var element = {
            text: this.props.prior,
            value: this.props.prior
        }

        return this.containsObject(priority,element)
    }

    totalCheck = () => {
        return (
            this.titleValidation() &&
            this.dateValidation() &&
            this.priorValidation() &&
            this.stateValidation()
        )
    }

    containsObject = (arr, elem) => {
        for (var i = 0; i < arr.length; i++) {
            if (JSON.stringify(arr[i]) === JSON.stringify(elem)) {
                return true;
            }
        }
        return false;
    }
}








