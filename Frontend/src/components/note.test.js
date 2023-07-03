import React from "react";
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import Note from './Note'
test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important : true
    }
    //for rendering the components, using render method, instead of rendering in DOM
    render(<Note note={note}/>)    
    //This gives access to the rendered components 
    const element = screen.getByText('Component testing is done with react-testing-library')
    screen.debug(element)
    expect(element).toBeDefined()
})