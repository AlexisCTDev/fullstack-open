import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  test('by default, the url and likes are not visible', () => {
    const blog = {
      title: 'Blog Title',
      author: 'Blog author',
      url: 'google.com',
      likes: 10,
      user: {
        username: 'root',
        name: 'Super User'
      }
    }

    const { container } = render(<Blog blog={blog} />)

    expect(container).toHaveTextContent('Blog Title')
    expect(container).toHaveTextContent('Blog author')

    expect(container).not.toHaveTextContent('google.com')
    expect(container).not.toHaveTextContent(10)
    expect(container).not.toHaveTextContent('Super User')
  })

  test('after clicking the button, url and likes are displayed', async () => {
    const blog = {
      title: 'Blog Title',
      author: 'Blog author',
      url: 'google.com',
      likes: 10,
      user: {
        username: 'root',
        name: 'Super User'
      }
    }

    const { container } = render(<Blog blog={blog} />)

    const viewButton = screen.getByText('view')
    const user = userEvent.setup()

    await user.click(viewButton)

    expect(container).toHaveTextContent('google.com')
    expect(container).toHaveTextContent(10)
    expect(container).toHaveTextContent('Super User')
  })

  test('if dblClick calls handleEvent twice', async () => {
    const blog = {
      title: 'Blog Title',
      author: 'Blog author',
      url: 'google.com',
      likes: 10,
      user: {
        username: 'root',
        name: 'Super User'
      }
    }
    const handleLikeSubmit = vi.fn()

    render(<Blog blog={blog} handleLikeSubmit={handleLikeSubmit} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')

    await user.click(viewButton)

    const likeButton = screen.getByTestId('like-button')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleLikeSubmit).toHaveBeenCalledTimes(2)
  })
})
