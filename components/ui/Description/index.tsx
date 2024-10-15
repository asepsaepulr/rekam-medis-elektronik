import Typography from '@/components/base/Typography';

import type { DescriptionProps } from './index.types';

const Description = (props: DescriptionProps) => {
  const {
    label,
    loading = false,
    size = 'medium',
    value,
    layout = 'horizontal',
    className,
    sameColorLabel = false,
    showColon = true,
  } = props;
  const isVertical = layout === 'vertical';
  return (
    <div className={`flex ${isVertical ? 'flex-col gap-2' : 'gap-2 [&>*]:w-1/2 justify-between'} ${className}`}>
      <div className="flex justify-between">
        <Typography
          loading={loading}
          className={`min-w-52 ${sameColorLabel ? 'text-n-13' : 'text-n-7'}`}
        >
          {label}
        </Typography>
      </div>
      <div>
        <Typography
          loading={loading}
          className={size === 'large' ? 'text-lg' : 'text-base'}
        >
          {(!isVertical && showColon) && <Typography as="span">: </Typography>}
          {value}
        </Typography>
      </div>
    </div>
  );
};

export default Description;
