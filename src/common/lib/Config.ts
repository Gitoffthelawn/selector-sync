const DEFAULT_SELECTOR_SETS =
`[
  {
    "title": "Default Rule",
    "selectorSpecifications": [
      {
        "selector": "title",
        "showMethod": "textContent"
      },
      {
        "selector": "meta",
        "showMethod": "outerHTML"
      }
    ]
  }
]
`;

// object of { key => default_value }
const Configurables = {
  selectorSets: DEFAULT_SELECTOR_SETS,
  selectedIndex: 0,
}

type ConfigurablesType = typeof Configurables;

async function loadConfigCommon<K extends keyof ConfigurablesType> (key: K): Promise<ConfigurablesType[K]> {
  return (await browser.storage.local.get(key))[key] as any || Configurables[key];
}

async function saveConfigCommon<K extends keyof ConfigurablesType>(key: K, value: ConfigurablesType[K]) {
  return browser.storage.local.set({
    [key]: value,
  });
}

async function loadSelectorSetsAsString() {
  return loadConfigCommon("selectorSets");
}

async function saveSelectorSetsAsString(value: string) {
  return saveConfigCommon("selectorSets", value);
}

async function loadSelectedIndex() {
  return loadConfigCommon("selectedIndex");
}

async function saveSelectedIndex(value: number) {
  return saveConfigCommon("selectedIndex", value);
}

export {
  loadSelectorSetsAsString,
  saveSelectorSetsAsString,
  loadSelectedIndex,
  saveSelectedIndex,
}