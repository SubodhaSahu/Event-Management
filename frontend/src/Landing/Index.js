import React from 'react';
import EventTable from './EventTable';
import SideBarHoc from './SideBarHoc';

function Index() {
  return <EventTable />;
}

export default SideBarHoc(Index);
