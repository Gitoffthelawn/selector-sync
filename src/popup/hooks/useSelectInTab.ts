import { SelectorResultParam, SelectorSpecification } from 'common/types';
import { useState, useEffect } from 'react';

type ReadonlySelectorSpecification = Readonly<SelectorSpecification>;

export function useSelectInTab(specs: readonly ReadonlySelectorSpecification[]) {
  const [results, setResults] = useState<SelectorResultParam[]>([]);
  useEffect(() => {
    if (specs.length === 0) {
      return;
    }
    (async () => {
      const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tabs.length === 0) {
        throw "no active tab";
      }
      const tab = tabs[0];
      try {
        // @ts-ignore
        const results = await browser.scripting.executeScript({
          target: {
            tabId: tab.id,
          },
          func: executeSelectors,
          args: [specs],
        });
        console.log(results);
        setResults(results[0].result);
      } catch (err) {
        console.error(`failed to execute script: ${err}`);
      }
    })();
  }, [specs]);
  return results;
}

function executeSelectors(specs: readonly ReadonlySelectorSpecification[]) {
  return specs.map(({ selector, showMethod }) => {
    const elements = document.querySelectorAll(selector);
    const prop = getPropertyofShowMethod(showMethod) ?? "textContent";
    return {
      selector,
      showMethod,
      results: Array.from(elements).map( (elt) => elt[prop] ?? ''),
    };
  });

  function getPropertyofShowMethod(showMethod: string) {
    return ({
        "textContent": "textContent",
        "innerHTML": "innerHTML",
        "outerHTML": "outerHTML",
    } as const)[showMethod];
  }
}