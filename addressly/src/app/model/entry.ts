export interface Entry {
  _id?: number,
  name: string,
  rating?: number,
  editMode?: boolean;
  group?:number;
  delete?:boolean;
  address?:string;
}
