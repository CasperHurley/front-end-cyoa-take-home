import moment from 'moment'

// moment JS is deprecated now, I wouldn't use it anymore in a production app (would probably just stick with native JS), but feels fine for this app

export function formatDate(date) {
    const d = new Date(date);
    const time = d.toLocaleTimeString('default') // Supposedly adding some Intl support with "default" option. Haven't fully researched this yet but I know that's an ongoing effort at MC.
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