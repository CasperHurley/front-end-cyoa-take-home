import moment from 'moment'

export function formatDate(date) {
    const d = new Date(date);
    const time = d.toLocaleTimeString('default')
    let formattedDate
    const dateObj = moment(d);
    const currentDate = moment();
    const daysDifference = currentDate.diff(dateObj, 'days');
    const yearsDifference = currentDate.diff(dateObj, 'years');

    if (daysDifference <= 6) {
        formattedDate = d.toLocaleDateString('default', { weekday: 'long' })
    } else {
        formattedDate = `${d.toLocaleString('default', { month: 'long' })} ${d.toLocaleString('default', { day: 'numeric' })}`;
    }
    if (yearsDifference) {
        formattedDate += `, ${d.toLocaleString('default', { year: 'numeric' })}`
    }
    return `${formattedDate} at ${time}`
} 