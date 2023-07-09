import React from "react";
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'
import Togglable from "./Togglable";
test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important : true
    }

    const {container } = render (<Note note={note}/>)
    const div = container.querySelector('.note')
    expect(div).toHaveTextContent('Component testing is done with react-testing-library')

    // //for rendering the components, using render method, instead of rendering in DOM
    // render(<Note note={note}/>)  
    // screen.debug()  
    // //This gives access to the rendered components 
    // const element = screen.getByText('Component testing is done with react-testing-library')
    // screen.debug(element)
    // expect(element).toBeDefined()
})
test('clicking the button calls event handler once', async () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }
    const mockHandler = jest.fn()
    render(<Note note={note} toggleImportance={mockHandler}/>)
    const user = userEvent.setup()
    const button = screen.getByText('make not important')
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
})
describe('<Togglable/>', () => {
    let container 
    beforeEach(() => {
        container = render(<Togglable buttonLabel='show' >
            <div className="testDiv" >togglable content </div>
        </Togglable>).container
    })
    test('renders its children',async() => {
        await screen.findAllByText('togglable content')
    })
    test('at start the children are not displayed', async () => {
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display : none')
    })
    test('after clicking the buttons, the children are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show')
        await user.click(button)
        const div = container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display : none')
    })
    test('toggled component can be closed',async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show')
        await user.click(button)
        const closeButton = screen.getByText('cancel')
        await user.click(closeButton)
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display : none')
    })
})