describe("EditCommentPage", () => {
    // for each of these
    // render page
    // mock REST call (GET /api/comment/:id) to handle loading comment
    // usually I do this with axios, pretty sure for fetch you'd have to mock the global fetch object instead
    // or maybe in our case we can just mock the Api object we made, similarly to mocking axios, something like:
        // when mocked Api.get called with endpoint
        // either return success or failure depending on what we're testing

    test("Loads with comment name and message in the input fields", () => {
        // expect name input loads with fetched comment name
        // expect message input loads with fetched comment message
    })
    test("No changes made to either input", () => {
        // expect update button to be disabled
    })
    test("Error fetching comment", () => {
        // expect screen getByText "Error fetching comment for editing." to be in doc
        // expect update button to be disabled
        // expect delete button to be disabled
    })
    test("Submitting updated comment", () => {
        // mock ws
        // update either input
        // click button
        // expect navigation back to home page to happen...?
        // if we were testing error scenario, mock ws to fail on editComment message, expect error Alert to show with expected message? (this is not a feature yet)
    })
})