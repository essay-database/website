export function logState(action, state) {
  console.log(action, state);
}

function isString(value) {
  return typeof value === "string" || value instanceof String;
}

function isNumber(value) {
  return typeof value === "number" && isFinite(value);
}

function isBoolean(value) {
  return typeof value === "boolean";
}

export const isValid = value =>
  (isString(value) && value.length > 0) ||
  (isNumber(value) && value > -1) ||
  isBoolean(value);

export const format = value => (isString(value) ? value.trim() : value);

export const deepClone = value => JSON.parse(JSON.stringify(value));
