import React from 'react';
import EventTable from './EventTable';
import LandingPageHoc from './LanndingPageHoc';

function Index() {
  return <EventTable />;
}

export default LandingPageHoc(Index);
