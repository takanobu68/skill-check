import { DataItem } from '../types/EstateData';

const typeMapping: Record<string, number> = {
  住宅地: 1,
  商業地: 2,
};

/**
 * 選択された都道府県名に対応する都道府県コードを取得
 * @param typedData - データ項目の配列
 * @param location - 選択された都道府県名
 * @returns 都道府県コード (数値) または null
 */
export const getPrefectureCode = (
  typedData: DataItem[],
  location: string
): number | null => {
  const locationItem = typedData.find(
    (item) => item.data.result.prefectureName === location
  );
  return locationItem
    ? parseInt(locationItem.data.result.prefectureCode, 10)
    : null;
};

/**
 * 選択された`場所（prefectureCode）`と`年度（year）`と`種類`に対応する値を取得
 * @param typedData - データ項目の配列
 * @param prefectureCode - 都道府県コード
 * @param year - 選択された年度
 * @param type - 選択された種類（例: '住宅地', '商業地'）
 * @returns 対応する値または0
 */
export const getSelectedValue = (
  typedData: DataItem[],
  prefectureCode: number | null,
  year: number,
  type: string
): number => {
  if (!prefectureCode) return 0;
  const numericType = typeMapping[type] || 1;
  const dataItem = typedData.find(
    (item) =>
      parseInt(item.data.result.prefectureCode, 10) === prefectureCode &&
      item.year === year &&
      parseInt(item.data.result.type, 10) === numericType
  );
  return dataItem && dataItem.data.result.years.length > 0
    ? dataItem.data.result.years[0].value
    : 0;
};

/**
 * 選択された`年度`と`種類`に対応する都道府県すべての平均値を計算
 * @param typedData - データ項目の配列
 * @param year - 選択された年度
 * @param type - 選択された種類（例: '住宅地', '商業地'）
 * @returns 計算された平均値または0
 */
export const getAverageValue = (
  typedData: DataItem[],
  year: number,
  type: string
): number => {
  const numericType = typeMapping[type] || 1;
  const itemsForYearAndType = typedData.filter(
    (item) =>
      item.year === year &&
      parseInt(item.data.result.type, 10) === numericType &&
      item.data.result.years.length > 0
  );

  if (itemsForYearAndType.length === 0) {
    return 0;
  }

  const sum = itemsForYearAndType.reduce(
    (acc, curr) => acc + curr.data.result.years[0].value,
    0
  );
  const avg = sum / itemsForYearAndType.length;
  return Math.floor(avg);
};
