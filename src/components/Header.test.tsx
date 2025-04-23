import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header Component', () => {
  it('renders the app tittle', () => {
    render(<Header/>)
    expect(screen.getByText(/Medication Application/i)).toBeInTheDocument()
  })

  it('shows the word Nursing', () => {
    render(<Header/>)
    expect(screen.getByText(/Nursing/i)).toBeInTheDocument()
  })
})