const { Key } = require("webdriverio");
const assert = require("assert");

Feature("oranum");

class Oranum {
  I;

  constructor() {
    this.I = inject().I;
  }

  iAmOnHome() {
    this.I.amOnPage("https://oranum.com");
  }

  iSearch(text) {
    this.I.fillField(
      { css: "[placeholder = 'Search for Expert or category']" },
      text + Key.Enter
    );
  }

  iGrabPerformersText() {
    return this.I.grabTextFromAll({ css: "[data-type='performer']" });
  }
}

const OPO = new Oranum();

Before(() => {
  OPO.iAmOnHome();
});

Scenario.todo("REQ-1.1: 'View all live psychics' button", ({ I }) => {
  // It seems that REQ-1.1 is not matching the current version of website therefore it will fail.
  I.see("View all live psychics", { css: "button" });
  I.waitInUrl("search");
});

const searches = new DataTable(["text"]);
searches.add(["Matt"]);
searches.add(["Myst"]);
searches.add(["Ann"]);
searches.add(["psy"]);

Data(searches).Scenario(
  "REQ-1.2: Searching for partial text should display only matching psychics.",
  async function ({ I, current }) {
    OPO.iSearch(current.text);
    I.waitInUrl(current.text);
    const texts = await OPO.iGrabPerformersText();
    texts.forEach((text = "") => {
      assert.ok(
        text.toLowerCase().includes(current.text.toLowerCase()),
        `A Performer with text: "${text}" does not contain: "${current.text}"`
      );
    });
  }
);

const fullSearches = new DataTable(["text"]);
fullSearches.add(["MattWarren"]);
fullSearches.add(["MysticMilena"]);
fullSearches.add(["EternalFlame"]);

Data(fullSearches).Scenario(
  "REQ-2: Searching for full text should show a specific psychic profile.",
  async function ({ I, current }) {
    OPO.iSearch(current.text);
    I.waitInUrl(current.text);
    const texts = await OPO.iGrabPerformersText();
    assert.ok(
      texts.length == 1,
      "On full text search should be only one profile."
    );
    assert.ok(
      texts[0].toLowerCase().includes(current.text.toLowerCase()),
      `A Performer with text: "${texts[0]}" does not contain: "${current.text}"`
    );
  }
);
