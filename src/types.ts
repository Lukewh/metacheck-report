export interface IRawPage {
  id: number;
  site: string;
  status: number;
  url: string;
  metadata: any;
}

export interface IPage extends IRawPage {
  display: string;
  encodedURL: string;
  metadataAnalysis: IAnalysedMetadata;
}

export interface IRawData {
  page_count: number;
  site: string;
  pages: IPage[];
}

export interface IAnalysedMetadatum {
  score: number;
  missing: string[];
}

export interface IAnalysedMetadata {
  base: IAnalysedMetadatum;
  simple: IAnalysedMetadatum;
  og: IAnalysedMetadatum;
  twitter: IAnalysedMetadatum;
  overall: {
    score: number;
    missing: number;
  };
}
