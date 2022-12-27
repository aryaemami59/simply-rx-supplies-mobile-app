import type { EmptyArray } from "../types/missingTypes";

const difference = <T>(firstArray: T[], secondArray: T[]): T[] | EmptyArray =>
  firstArray.filter(e => !secondArray.includes(e));

// const a: {} & [] = ["MCK", "OI"];

// type a = typeof a[number];
// type B = {} & a[];
// const b: B = ["OI"];

// const c = a[0];

// type Props = []["length"];

export default difference;
