import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import NewsPageWrapper from '../pages/NewsPageWrapper';
import NewsDetailsPageWrapper from '../pages/NewsDetailsPageWrapper';
function Layout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Navigate to={'/news'} /> } />
        <Route path='/news' element={ <NewsPageWrapper /> } />
        <Route path='/news/:id' element={ <NewsDetailsPageWrapper /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default Layout;
