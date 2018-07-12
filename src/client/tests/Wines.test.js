import puppeteer from 'puppeteer'

const APP = 'http://localhost:8080'
let page
let browser
const width = 1920
const height = 1080

beforeAll(async () => {
  browser = await puppeteer.launch({
    // dumpio - pipe browser process stdout and stderr into process.stdout and
    // process.stderr. Useful for debugging puppeteer library problems. Defaults
    // to false.
    // dumpio: true,

    // To see the UI test run, uncomment the headless and slowMo options:
    headless: false,
    slowMo: 40,

    args: [`--window-size=${width},${height}`, '--no-sandbox'],
    ignoreHTTPSErrors: true,
  })
  page = await browser.newPage()
  await page.setViewport({ width, height })
})

describe('Wine Page UI Tests', async () => {
  test('Loads the wine page succesfully and the wineDiv appears', async () => {
    await page.goto(APP)
    await page.waitFor('#wineDiv')
  }, 150000)

  test('Clicks on a wine in the list and sees the wineSelected h3 has the name of that wine as text', async () => {
    await page.goto(APP)
    await page.waitFor('#ApothicRed')
    await page.click('#ApothicRed')
    const wineSelected = await page.$eval('#wineSelected', e => e.textContent)
    expect(wineSelected).toEqual('Apothic Red')
  }, 150000)

  test('Clicks add wine button and successfully adds a wine', async () => {
    await page.goto(APP)
    await page.waitFor('#addWineButton')
    await page.click('#addWineButton')
    await page.waitFor('#addWineNameField')
    await page.click('#addWineNameField')
    await page.type('#addWineNameField', 'Riesling')
    await page.click('#submitWine')
    await page.waitForSelector('.ant-message')
    const wineAddedSuccess = await page.$eval('.ant-message-success', e => e.textContent)
    expect(wineAddedSuccess).toEqual('Wine added!')
  }, 150000)

  test('Clicks a wine from list and successfully deletes a wine', async () => {
    await page.goto(APP)
    await page.waitFor('#ApothicRed')
    await page.click('#ApothicRed')
    await page.waitFor('#deleteWineButton')
    await page.click('#deleteWineButton')
    await page.waitForSelector('.ant-message')
    const wineAddedSuccess = await page.$eval('.ant-message-success', e => e.textContent)
    expect(wineAddedSuccess).toEqual('Wine deleted!')
  }, 150000)

})

afterAll(() => {
  browser.close()
})
