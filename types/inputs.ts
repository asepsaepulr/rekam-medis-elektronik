export interface SelectItem {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export type RadioOption = SelectItem;

export type FilterOption = {
  key: string | RangeTuple;
  label: string;
  placeholder?: string;
  type?: 'text' | 'rangedate';
  options?: SelectItem[];
};

export type RangeTuple = [start: string, end: string];

export type RangeType = 'thisMonth' | 'thisWeek' | 'today' | 'range';

export interface DateRangeMap {
  [key: string]: Record<string, string | Date>
}
