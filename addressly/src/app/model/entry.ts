export interface Entry {
  id?: number;
  title: string;
  location?: string;
  organizer: string;
  start: string;
  end: string;
  status: string;
  allday: boolean;
  webpage?: string;
  imageurl?: string;
  categories?: any[];
  extra?: any;
}
