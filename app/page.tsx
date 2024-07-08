'use client';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { Suspense, useState } from 'react';
import { ProfileContextProvider } from '../contexts/ProfileContextProvider';
import Dashboard from './components/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';

enum TabValue {
  DASHBOARD = 'DASHBOARD',
  SETTINGS = 'SETTINGS'
}

const tabPanelStyle = { margin: 0, padding: 0 };

export default function Home() {
  const [value, setValue] = useState<TabValue>(TabValue.DASHBOARD);

  const handleChange = (_: React.SyntheticEvent, newValue: TabValue) => {
    setValue(newValue);
  };

  const tabStyle = {
    color: (tabValue: TabValue) =>
      value === tabValue ? { color: "'primary.main'" } : { color: 'inherit' }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileContextProvider>
        <TabContext value={value}>
          <TabList onChange={handleChange} sx={{ backgroundColor: 'navy' }}>
            <Tab
              label="Dashboard"
              value={TabValue.DASHBOARD}
              sx={tabStyle.color(TabValue.DASHBOARD)}
            />
            <Tab
              label="Settings"
              value={TabValue.SETTINGS}
              sx={tabStyle.color(TabValue.SETTINGS)}
            />
          </TabList>
          <TabPanel sx={tabPanelStyle} value={TabValue.DASHBOARD}>
            <Dashboard />
          </TabPanel>
          <TabPanel sx={tabPanelStyle} value={TabValue.SETTINGS}>
            <Settings />
          </TabPanel>
        </TabContext>
      </ProfileContextProvider>
    </Suspense>
  );
}
