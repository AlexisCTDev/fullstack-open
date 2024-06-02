const { test, expect } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Super User',
        username: 'root',
        password: '123'
      }
    })

    await page.goto('/')
  })

  test('has title', async ({ page }) => {
    await expect(page.getByText('blogs')).toBeVisible()
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Loggin into application')).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', '123')
      await expect(page.getByText('Super User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', '1234')

      const errorDiv = page.locator('.notification.error')

      await expect(errorDiv).toBeVisible()
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('padding', '10px')
      await expect(errorDiv).toBeHidden({ timeout: 3000 })

      await expect(page.getByText('Super User logged in')).not.toBeVisible()
    })

    test.describe('When logged in', () => {
      test.beforeEach(async ({ page }) => {
        await loginWith(page, 'root', '123')
        await expect(page.getByText('Super User logged in')).toBeVisible()
      })

      test('a new blog can be created', async ({ page }) => {
        createBlog(
          page,
          'blog created by playwright',
          'playwright',
          'google.com'
        )

        await expect(page.locator('.blog')).toBeVisible()
        await expect(page.locator('.blog')).toContainText(
          'blog created by playwright - playwright'
        )
      })
    })
  })
})
