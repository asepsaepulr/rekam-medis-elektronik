import { LoadingDots } from '@/components/base/LoadingDots';
import clsx from 'clsx';
import { forwardRef } from 'react';
import styles from './Button.module.css';

export const Button = forwardRef(function Button(
  {
    children,
    type,
    className,
    onClick,
    size,
    variant = 'invert',
    loading,
    disabled,
  },
  ref
) {
  return (
    <button
      className={clsx(
        styles.button,
        type && styles[type],
        size && styles[size],
        styles[variant],
        className
      )}
      ref={ref}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading && <LoadingDots className={styles.loading} />}
      <span>{children}</span>
    </button>
  );
});

export const ButtonLink = forwardRef(function Button(
  { children, type, className, href, onClick, size, variant = 'invert' },
  ref
) {
  return (
      <span>{children}</span>
  );
});
