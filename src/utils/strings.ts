import { stringify } from "querystring";

export const EstandaritzedArticles = (article: any, apartado: any, opcion: any,) => {

  let str = article;
  if (apartado) {
    str += `.${apartado}`
  }
  if (opcion) {
    str += `.${opcion}`
  }
  return str

}

//Tranforma texto en mayúsculas i sin acentos
export const standaritzedText = (str = "") => {
  str = str.toString();

  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
};

export const stringToArrayWords = (valueSearch = "", wordLength = 3) => {
  return valueSearch
    ?.split(" ")
    .filter((word: string | any[]) => word?.length >= wordLength) as unknown as string[]
}

export const addDaysToDate = (date: Date, days: number) => {
  let res = new Date(date);
  res.setDate(res.getDate() + days);
  return res;
}

