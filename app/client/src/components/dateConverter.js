export default class dateConverter {
    constructor(props) {
        this.date = props
    }

    dateToISO = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    todayISO = () => {
        var today = new Date();

        return this.dateToISO(today)
    }

    checkTodayISO = () => {
        return this.date === this.todayISO()
    }
}