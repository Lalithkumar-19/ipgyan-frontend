import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import BlogsManager from '../components/admin/BlogsManager';
import NewsletterManager from '../components/admin/NewsletterManager';
import ContactsManager from '../components/admin/ContactsManager';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ py: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AdminDashboard = () => {
  const { adminUser, logout } = useAuth();
  const [tab, setTab] = useState(0);

  return (
    <div className="min-h-[70vh] bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-amber-500 font-inria">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Logged in as {adminUser?.email}</p>
          </div>
          <button onClick={logout} className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700">Logout</button>
        </div>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={(e, v) => setTab(v)} aria-label="admin tabs" variant="scrollable">
            <Tab label="Blogs" />
            <Tab label="Newsletter" />
            <Tab label="Contacts" />
          </Tabs>
        </Box>

        <TabPanel value={tab} index={0}>
          <BlogsManager />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <NewsletterManager />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <ContactsManager />
        </TabPanel>
      </div>
    </div>
  );
};

export default AdminDashboard;
