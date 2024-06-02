async function loginWith (page, username, password) {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

async function createBlog (page, title, author, url) {
  await page.getByRole('button', { name: 'Create new' }).click()
  await page.getByLabel('title').fill(title)
  await page.getByLabel('author').fill(author)
  await page.getByLabel('url').fill(url)
  await page.getByRole('button', { name: 'Create' }).click()
}

export { loginWith, createBlog }
