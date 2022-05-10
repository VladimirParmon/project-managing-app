import {
  DialogDataLabels,
  DialogDataOperations,
  DialogDataTitles,
} from '../constants/dialog.constants';

export type DialogData = {
  label: DialogDataLabels;
  title: DialogDataTitles;
  operation: DialogDataOperations;
  boardId: string;
};
