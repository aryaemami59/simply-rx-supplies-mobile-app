import type { ItemNameAndKeywords } from "../../types/api";
import EMPTY_ARRAY from "../emptyArray";
import withEmptyArrayFallback from "../withEmptyArrayFallback";
import sortResults from "./sortResults";
import splitBySpace from "./splitBySpace";
import trimExcessWhiteSpace from "./trimExcessWhiteSpace";

const search = (value: string, itemNamesAndKeywords: ItemNameAndKeywords[]) => {
  const inputValue = trimExcessWhiteSpace(value);
  const inputWords = splitBySpace(inputValue);
  const looseSearchValue = inputWords.map(f => `(${f})`).join(".*");

  const searchRegexPattern = new RegExp(looseSearchValue, "gi");

  const searchResults = withEmptyArrayFallback(
    itemNamesAndKeywords.filter(
      ({ name, keywords }) =>
        name.match(searchRegexPattern) ??
        keywords.join(" ").match(searchRegexPattern) ??
        (keywords.some(
          keyword =>
            keyword.match(searchRegexPattern) && inputValue.includes(keyword)
        ) ||
          inputWords.every(inputWord => keywords.includes(inputWord)))
    )
  );

  return inputValue
    ? searchResults.sort(
        (a, b) =>
          sortResults(b, searchRegexPattern, inputValue) -
          sortResults(a, searchRegexPattern, inputValue)
      )
    : EMPTY_ARRAY;
};

export default search;
