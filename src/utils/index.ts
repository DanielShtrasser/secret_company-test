import { IData } from "../model/types";

export function getStateDiff(tableState: IData, source: IData) {
  const result: [string, string][] = [];
  const arr1: [string, string][] = Object.entries(tableState);

  arr1.forEach(([key, value]) => {
    if (source[key as keyof IData] !== value) result.push([key, value]);
  });

  return result;
}

export function validateInput(a: string, b: string) {
  if (a === "master") {
    // только русские буквы и точки
    return /^[а-яА-ЯёЁ.:\s]+$/.test(b);
  } else if (a === "someNumber") {
    // только числа
    return /^[0-9]+$/.test(b);
  } else if (a === "percentage") {
    // только числа и точки
    return /^[0-9.]+$/.test(b);
  } else {
    return true;
  }
}
