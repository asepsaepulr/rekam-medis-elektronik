import Button from '@/components/base/Button';
import Paper from '@/components/base/Paper';
import Typography from '@/components/base/Typography';
import IcArrowBack from '@/components/icons/IcArrowBack';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import noop from '../../../utils/noop';

import type { PageHeaderProps } from './index.types';

const PageHeader = (props: PageHeaderProps) => {
  const {
    className = '',
    title,
    crumbs = [],
    children,
    showBackBtn = false,
    onClickBackBtn = noop,
  } = props;

  return (
    <div className={className}>
      <Paper>
        {showBackBtn && (
          <Button
            rounded
            className="p-2.5 bg-n-1 drop-shadow-lg mb-2.5"
            onClick={onClickBackBtn}
          >
            <IcArrowBack />
          </Button>
        )}
        <div className="flex justify-between items-center">
          <div>
            <Typography
              variant="title"
              as="h1"
              className="font-bold"
              gutterBottom
              size="large"
              type="secondary"
            >
              {title}
            </Typography>
            {crumbs.length > 0 && <Breadcrumbs crumbs={crumbs} />}
          </div>
          {children}
        </div>
      </Paper>
    </div>
  );
};

export default PageHeader;
