const {} = require('mocha')
const puppeteer = require("puppeteer");
const {spawn} = require('node:child_process')
const assert = require("assert");
const {watchParallelRun} = require("mocha/lib/cli/watch-run");

describe('Test the GUI components', function () {
    let browser, page, server;
    const BASE_URL = 'http://localhost:8080/';

    this.timeout(20000);

    before(async function () {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        page.on('error', (e) => {
            console.log('Error : ', e);
        })
        page.on('pageerror', (e) => {
            console.log('Page error : ', e);
        })
        page.on('load', () => {
            console.log('Page loaded');
        })

        server = spawn('node', ['index.js']);
    });

    it('The home page should load', async function () {
        // assert.doesNotThrow(async function () {
        //     page.goto(BASE_URL, {waitUntil: 'networkidle0'}).then(done);
        // });
        let success = false;
        for (let i = 0; i < 10; i++) {
            try {
                await page.goto(BASE_URL, {waitUntil: 'networkidle0'});
                success = true;
                break;
            } catch ({message}) {
                if (!message.includes('net::ERR_CONNECTION_REFUSED')) {
                    break;
                }
                // Else, retry after a while
                await new Promise((resolve) => setTimeout(resolve, 500));
            }
        }
        assert.ok(success);
    })

    const aboutLinkButtonSelector = 'body > div > div:nth-of-type(2) > button:nth-of-type(1)';
    const homeLinkButtonSelector = 'body > div > div:nth-of-type(2) > button:nth-of-type(1)';

    it('The home page display the about button which leads to the about page', async function () {
        await page.waitForSelector(aboutLinkButtonSelector, {timeout: 5000});
        const button = await page.evaluate((buttonSelector) => {
            const {title, classList} = document.querySelector(buttonSelector);
            return {title, classList};
        }, aboutLinkButtonSelector);
        assert.strictEqual(button.title, 'About');
        assert.deepStrictEqual(Object.values(button.classList), ['btn', 'btn-primary', 'm1']);
    })

    it('The about link leads to the about page', async function() {
        await page.click(aboutLinkButtonSelector);
        assert.equal(await page.evaluate(() => window.location.search), `?page=about`);
    })

    after(async function () {
        await browser.close();
        server.kill();
    })
})