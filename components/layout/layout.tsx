import React, { FC } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* <MainNavigation /> */}
      <main>{children}</main>
    </>
  );
};

export default Layout;
