import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="w-100 h-100 layout">
      {children}
    </div>
  )
}

export default Layout;