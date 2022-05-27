import { IDescriptionProps } from 'src/app/shared/models/board.model';

export const parseJSON = (whatToParse: string): IDescriptionProps => JSON.parse(whatToParse);
