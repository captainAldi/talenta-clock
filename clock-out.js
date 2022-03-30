const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(process.env.URL_HOME);

  //  Login
  await page.type('#user_email', process.env.EMAIL);
  await page.type('#user_password', process.env.PASSWORD);
  await page.click('#new-signin-button');
  await page.waitForTimeout(5000);

  // grant permission
  const context = browser.defaultBrowserContext()
  await context.overridePermissions(process.env.URL_LIVE_ATTENDANCE, ['geolocation'])

  // Set Location
  await page.setGeolocation({ latitude: parseFloat(process.env.LATITUDE), longitude: parseFloat(process.env.LONGITUDE) });

  // Go to Live Attendance
  await page.goto(process.env.URL_LIVE_ATTENDANCE);
  await page.waitForTimeout(5000);

  // Click Clock Out
  await page.click('#tl-live-attendance-index > div > div.tl-content-max__600.my-3.my-md-5.mx-auto.px-3.px-md-0 > div.tl-card.hide-box-shadow-on-mobile.hide-border-on-mobile.text-center.p-0 > div.d-block.p-4.px-0-on-mobile > div > div:nth-child(2) > button')
  await page.waitForTimeout(5000);

  await browser.close();

})();