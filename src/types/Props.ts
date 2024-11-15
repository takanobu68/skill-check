// SelectionPanelコンポーネント用のプロップ型
export interface SelectionPanelProps {
  onSelectionSubmit: (location: string, year: number, type: string) => void;
}
