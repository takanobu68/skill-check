import { DataItem } from '../types/EstateData';

/**
 * 都道府県データを `prefectureCode` 順にソートして取得
 * @param typedData - データ項目の配列
 * @returns 重複を除外してソートされた都道府県オブジェクトの配列
 */
export const getDistinctLocations = (typedData: DataItem[]) => {
  const distinctLocations = Array.from(
    new Map(
      typedData.map((item) => [
        item.data.result.prefectureCode,
        item.data.result.prefectureName,
      ])
    )
  )
    .sort((a, b) => parseInt(a[0], 10) - parseInt(b[0], 10))
    .map(([code, name]) => ({ code, name }));
  return distinctLocations;
};

/**
 * 年度データを重複排除して昇順にソート
 * @param typedData - データ項目の配列
 * @returns ソートされた年度の配列
 */
export const getDistinctYears = (typedData: DataItem[]) => {
  const distinctYears = Array.from(
    new Set(typedData.map((item) => item.year))
  ).sort((a, b) => a - b);
  return distinctYears;
};
