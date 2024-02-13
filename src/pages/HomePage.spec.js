import { render, screen, fireEvent } from '@testing-library/react'
import HomePage from './HomePage'
import * as router from 'react-router'

describe("HomePage", () => {
    const navigate = jest.fn() // had to mock navigate from router

    const comments = {
        data: [
            { id: 1, name: 'Bobert', message: "Names Bob", created: "", updated: "" },
            { id: 2, name: 'Bob Loblaw', message: "Bob law", created: "", updated: "" },
        ]
    };

    const renderPage = () => {
        render(
            <HomePage
                comments={comments}
                submitComment={jest.fn()}
                deleteComment={jest.fn()}
                deleteAllComments={jest.fn()}
                readyState="OPEN"
                ReadyState={{ OPEN: 'OPEN' }}
            />
        );
    }

    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })
        
    test("Displaying comments", () => {
        renderPage()
        expect(screen.getByText(/Bobert/)).toBeInTheDocument()
        expect(screen.getByText(/Names Bob/)).toBeInTheDocument()
        expect(screen.getByText(/Bob Loblaw/)).toBeInTheDocument()
        expect(screen.getByText(/Bob law/)).toBeInTheDocument()
    })
    test("Submitting new comment", () => {
        renderPage()
        fireEvent.change(screen.getByLabelText('Name'), {
            target: {value: "R.O.B. 64"}
        })
        fireEvent.change(screen.getByLabelText('Message'), {
            target: {value: "Location confirmed. Sending supplies."}
        })
        fireEvent.click(screen.getByTestId('comment-submit-button'))
        // need to mock websocket
            // haven't done this before, feel like I'm at the suggested time limit right now
            // assuming it's something like: 
                // create mock ws (found some packages like mock-socket that might help)
                // when mock ws gets createComment message
                // return mocked list of updated comments
                // this triggers re-render
                // expect comment to have appeared in list with values
                // expect new comment input fields to be reset
    })
    test("Navigate to edit comment", () => {
        // renderPage()
        // click edit button on comment card
        // expect navigate fn to have been called with correct comment ID
    })
    test("Delete comment", () => {
        // renderPage()
        // click delete button on comment card
        // expect navigate fn to have been called with correct comment ID
        // when mock ws gets deleteComment message
        // return mocked list of updated comments (minus the one we deleted)
        // expect screen getByText name from deleted comment *not* to be in document
        // expect screen getByText message from deleted comment *not* to be in document
    })
    test("Delete all comments", () => {
        // renderPage()
        // click delete all comments button
        // when mock ws gets deleteAllComments message
        // return mocked list of updated comments (in this case empty array)
        // expect screen getByText "No comments available" to be in document
    })
})