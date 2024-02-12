import { formatDate } from './CommentUtil.js'
import moment from 'moment'

describe("CommentUtil", () => {
    describe("formatDate()", () => {
        it("formats current date as day name", () => {
            expect(moment.weekdays().some(day => formatDate(new Date()).includes(day))).toBe(true)
        })
        it("formats dates in the past week (minus a day) as day name", () => {
            const prevDate = new Date()
            prevDate.setDate(prevDate.getDate() - 6)
            expect(moment.weekdays().some(day => formatDate(prevDate).includes(day))).toBe(true)
        })
        it("formats dates further back than the past week as month name and day number", () => {
            const prevDate = new Date()
            prevDate.setDate(prevDate.getDate() - 7)
            expect(moment.months().some(month => formatDate(prevDate).includes(month))).toBe(true)
        })
        it("formats dates further back than the past year as month name plus day number and year number", () => {
            const prevDate = new Date()
            prevDate.setDate(prevDate.getDate() - 366)
            expect(formatDate(prevDate).includes(prevDate.getFullYear())).toBe(true)
        })

    })
})