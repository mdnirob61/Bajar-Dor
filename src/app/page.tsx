import AllProducts from '@/components/All-Products';
import Banner from '@/components/Banner';
import FallingValue from '@/components/FallingValue';
import RisingValue from '@/components/RisingValue';
import React from 'react';

const HomePage = () => {
  return (
    <div className='bg-slate-100'>
      <Banner></Banner>
      <RisingValue></RisingValue>
      <FallingValue></FallingValue>
      <AllProducts></AllProducts>
    </div>
  );
};

export default HomePage;