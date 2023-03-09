import Home from "../components/Home";
import { render,screen } from "@testing-library/react";
import '@testing-library/jest-dom'

describe('Details of the Home',()=>{
  test('checking the text of home',() => {
    render(<Home/>)

    const homeText = screen.getByText('Home',{exact:false})
    expect(homeText).toBeInTheDocument()
  })
})