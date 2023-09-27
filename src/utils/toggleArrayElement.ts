import {
  withNumsArrayConcat,
  withNumsArrayFilter,
} from "./withNumsArrayRuntimeChecks";
/**
 * Will remove an element from an array if the array contains it, otherwise it will add the element to the array.
 * @param array - The array that will be modified.
 * @param element - The element that is used to modify the array.
 * @returns The modified array.
 */
const toggleArrayElement = <T extends number>(array: T[], element: T): T[] =>
  array.includes(element)
    ? withNumsArrayFilter(
        array.filter(arrayElement => arrayElement !== element)
      )
    : withNumsArrayConcat(array.concat(element));

export default toggleArrayElement;
