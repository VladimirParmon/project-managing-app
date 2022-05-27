import { priorityOptionsValues, statusOptionsValues } from '../constants/operations';

export function getPriorityTranslation(code: string | undefined) {
  let result = '';
  let path = 'createTask.priorityOptions';
  switch (code) {
    case priorityOptionsValues.LOW:
      result = `${path}.low`;
      break;
    case priorityOptionsValues.MEDIUM:
      result = `${path}.medium`;
      break;
    case priorityOptionsValues.HIGH:
      result = `${path}.high`;
      break;
  }
  return result;
}

export function getStatusTranslation(code: string | undefined) {
  let result = '';
  let path = 'createTask.statusOptions';
  switch (code) {
    case statusOptionsValues.BUG:
      result = `${path}.bug`;
      break;
    case statusOptionsValues.DONE:
      result = `${path}.done`;
      break;
    case statusOptionsValues.ISSUES:
      result = `${path}.issues`;
      break;
    case statusOptionsValues.PENDING:
      result = `${path}.pending`;
      break;
    case statusOptionsValues.PROGRESS:
      result = `${path}.inProgress`;
      break;
    case statusOptionsValues.READY:
      result = `${path}.ready`;
      break;
    case statusOptionsValues.REFACTOR:
      result = `${path}.refactor`;
      break;
    case statusOptionsValues.TODO:
      result = `${path}.todo`;
  }
  return result;
}
