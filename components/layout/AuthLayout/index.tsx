import type { ReactNode } from 'react';

const AuthLayout = (props: { children: ReactNode }) => {
  const { children } = props;
  return (
    <section className="body-font font-sans overflow-hidden
      relative h-screen bg-n-1 w-full flex items-center justify-between"
    >
      <div
        className="bg-gradient-to-b from-primary-500 to-primary-800 w-3/5 h-full hidden md:block"
      >
      </div>
      <div className="flex justify-center items-center grow h-full">
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
