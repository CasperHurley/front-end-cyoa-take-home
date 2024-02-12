import { render, screen, act, fireEvent } from '@testing-library/react'
import HomePage from './HomePage'
import * as router from 'react-router'

describe("HomePage", () => {
    const navigate = jest.fn()

    const comments = [
        { id: 1, name: 'Bobert', message: "Names Bob", created: "", updated: "" },
        { id: 2, name: 'Bob Loblaw', message: "Bob law", created: "", updated: "" },
    ];

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
        
    test("Submitting new comment", () => {
        renderPage()
        fireEvent.change(screen.getByLabelText('Name'), {
            target: {value: "R.O.B. 64"}
        })
        fireEvent.change(screen.getByLabelText('Message'), {
            target: {value: "Location confirmed. Sending supplies."}
        })
        fireEvent.click(screen.getByTestId('comment-submit-button'))
        // expect comment to have appeared
    })
})