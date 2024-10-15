export interface DescriptionProps {
  label: string;
  value: string;
  layout?: 'horizontal' | 'vertical';
  loading?: boolean;
  className?: string;
  size?: 'medium' | 'large';
  sameColorLabel?: boolean;
  showColon?: boolean;
}
