import { Field } from "../../types/drupal";

export const capitalize = (str: string) => {
  if (!str) return;

  return str[0].toUpperCase() + str.slice(1);
}

export const generateFieldKey = (field: Field, index: number) => {
  return `${index}_${field.value.slice(0, 10)}`
}