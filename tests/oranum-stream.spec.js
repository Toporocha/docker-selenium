const { Key } = require("webdriverio");
const assert = require("assert");

Feature("oranum-stream");

class Oranum {
  I;

  constructor() {
    this.I = inject().I;
  }

  iAmOnHome() {
    this.I.amOnPage("https://oranum.com");
  }

  iAmOnFirstLivePage() {
    this.I.click({ css: "[data-type='performer'][data-status='1'] a" });
    this.I.waitInUrl("chat", 5);
  }

  iClickButton(locator) {
    this.I.waitForVisible(locator, 5);
    this.I.click(locator);
  }

  iClickToolbarButton(label) {
    const locator = {
      xpath: `//*[contains(@class, 'chat-applet')]//*[normalize-space(text()) = '${label}']`,
    };
    this.I.waitForElement(locator, 5);
    this.I.click(locator);
  }

  async iSeeSignUpAndCloseIt() {
    const signUpXpath = {
      xpath:
        "//*[@data-testid = 'mainLoginSignUpOverlayApplet'][contains(translate(., 'S', 's'), 'sign up')]",
    };
    this.I.waitForElement(signUpXpath, 10);
    this.I.click({
      css: "[data-testid='mainLoginSignUpOverlayApplet'] [class*='close']",
    });
    this.I.waitForDetached(signUpXpath, 10);
  }
}

const OPO = new Oranum();

Before(() => {
  OPO.iAmOnHome();
  OPO.iAmOnFirstLivePage();
});

Scenario(
  "REQ-3: Open the livestream of any psychic, the following buttons will trigger a 'Sign up' overlay to be displayed.",
  async function ({ I }) {
    // the requirements I received are vague and do not match the UI.
    // so, I have just add a functionality that would be following best practices,
    // which is currently not working.
    // const toolbarButtons = [
    //   "Get Credits",
    //   "Add to favorites",
    //   "Surprise Expert",
    //   "Start Private Session",
    //   "BUY CREDITS",
    // ];

    // toolbarButtons.forEach(async (label = "") => {
    //   OPO.iClickToolbarButton(label);
    //   await OPO.iSeeSignUpAndCloseIt();
    // });

    const locators = [
      { css: '.toolbar_button[data-id="buyCreditIcon"]' },
      { css: '.toolbar_button[data-id="favoriteIcon"]' },
      { css: '.toolbar_button[data-id="surpriseIcon"]' },
      { css: '[id="mc_btn_start_private"]' },
      { css: '[id="mc_btn_quickbuy_bottom"]' },
    ];

    locators.forEach(async (locator) => {
      OPO.iClickButton(locator);
      await OPO.iSeeSignUpAndCloseIt();
    });
  }
);
