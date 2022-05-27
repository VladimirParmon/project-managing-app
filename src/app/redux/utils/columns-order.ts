import { IColumn } from 'src/app/shared/models/board.model';
import { TColumns } from '../models/store.model';

export function findAscendingOrderIndexColumns(columns: TColumns, currentColumnId: string) {
  const currentColumn = columns.find(({ id }) => id === currentColumnId) as IColumn;

  return columns.filter(({ order }) => order > currentColumn.order);
}
