type SelectorSet = {
  title: string,
  selectorSpecifications: SelectorSpecification[],
}

type SelectorSpecification = {
  selector: string,
  showMethod: "textContent" | "innerHTML" | "outerHTML",
}

type SelectorResultParam = SelectorSpecification & {
  results: string[],
}

export type {
  SelectorSet,
  SelectorSpecification,
  SelectorResultParam,
}