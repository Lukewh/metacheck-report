export interface IRawPage {
  id: number;
  site: string;
  status: number;
  url: string;
  metadata: any;
}

export interface IRawData {
  page_count: number;
  site: string;
  pages: IRawPage[];
}
