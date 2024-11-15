export interface YearData {
  year: number;
  value: number;
}

export interface ResultData {
  prefectureCode: string;
  prefectureName: string;
  type: string;
  years: YearData[];
}

export interface DataItem {
  year: number;
  prefectureCode: number;
  type: number;
  data: {
    result: ResultData;
  };
}
