const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(process.env.URL_HOME);

  let pageTitle = await page.title()
  console.log(`page title: ${pageTitle}`)

  console.log(`env-url-home: ${process.env.URL_HOME}`)

  await browser.close();

})();