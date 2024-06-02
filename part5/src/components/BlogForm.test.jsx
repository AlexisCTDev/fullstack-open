import { describe, expect, test, vi } from 'vitest'
import { screen, render } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  test('blog form calls event handler with correct details', async () => {
    const createBlog = vi.fn()

    const { container } = render(<BlogForm createBlog={createBlog} />)

    const titleInput = container.querySelector('input[name="title"]')
    const authorInput = container.querySelector('input[name="author"]')
    const urlInput = container.querySelector('input[name="url"]')
    const createButton = screen.getByTestId('create-blog-btn')

    const user = userEvent.setup()

    await user.type(titleInput, 'Blog title')
    await user.type(authorInput, 'Blog author')
    await user.type(urlInput, 'google.com')

    await user.click(createButton)

    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Blog title')
    expect(createBlog.mock.calls[0][0].author).toBe('Blog author')
    expect(createBlog.mock.calls[0][0].url).toBe('google.com')
  })
})
