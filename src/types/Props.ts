// SelectionPanelコンポーネント用のプロップ型
export interface SelectionPanelProps {
  onSelectionSubmit: (location: string, year: number, type: string) => void;
}

// GraphAreaコンポーネント用のプロップ型
export interface GraphAreaProps {
  location: string;
  year: number;
  type: string;
}
