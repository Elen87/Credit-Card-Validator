import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000);

describe('Credit Card Validator', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: true,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('should validate correct Visa card', async () => {
    await page.goto(baseUrl);
    
    await page.type('#card-number', '4111111111111111');
    await page.click('#validate-btn');
    
    await page.waitForSelector('.result.success');
    const resultText = await page.$eval('.result', el => el.textContent);
    
    expect(resultText).toContain('действительна');
  });

  test('should reject invalid card', async () => {
    await page.goto(baseUrl);
    
    await page.type('#card-number', '1234567890123456');
    await page.click('#validate-btn');
    
    await page.waitForSelector('.result.error');
    const resultText = await page.$eval('.result', el => el.textContent);
    
    expect(resultText).toContain('Неверный');
  });

  test('should highlight card type on input', async () => {
    await page.goto(baseUrl);
    
    await page.type('#card-number', '4111');
    
    const isActive = await page.$eval('#card-visa', el => el.classList.contains('active'));
    expect(isActive).toBe(true);
  });
})
