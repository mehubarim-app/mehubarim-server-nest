import { ValidateIf } from 'class-validator';

/**
 * Validates the string property only if it's not empty and not undefined
 */
export function ValidateIfNotEmptyString() {
  return ValidateIf((object, value) => value !== undefined && value !== '');
}

/**
 * Validates the array property only if it's not empty and not undefined
 */
export function ValidateIfNotEmptyArray() {
  return ValidateIf((object, value) => {
    if (value === undefined) return false;
    return Array.isArray(value) && value.length > 0;
  });
}
