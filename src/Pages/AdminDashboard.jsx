import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import {
  AdminPanelSettings as AdminIcon,
  ExitToApp as LogoutIcon,
  Article as BlogIcon,
  Email as NewsletterIcon,
  Contacts as ContactsIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import BlogsManager from '../Components/admin/BlogsManager';
import NewsletterManager from '../Components/admin/NewsletterManager';
import ContactsManager from '../Components/admin/ContactsManager';

// Custom styled components
const DashboardHeader = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  color: 'white',
  borderRadius: '12px',
  marginBottom: theme.spacing(3),
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: '#f59e0b',
    height: 3,
    borderRadius: '2px',
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.95rem',
  minWidth: 'auto',
  minHeight: '48px',
  '&.Mui-selected': {
    color: '#f59e0b',
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AdminDashboard = () => {
  const { adminUser, logout } = useAuth();
  const [tab, setTab] = useState(0);

  // Mock data for dashboard stats
  const dashboardStats = [
    { title: 'Total Blog Posts', value: '24', icon: <BlogIcon />, color: '#10b981' },
    { title: 'Newsletter Subscribers', value: '1,243', icon: <NewsletterIcon />, color: '#3b82f6' },
    { title: 'Contact Messages', value: '56', icon: <ContactsIcon />, color: '#8b5cf6' },
    { title: 'Unread Messages', value: '12', icon: <ContactsIcon />, color: '#f59e0b' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader>
          <CardContent className="flex flex-col md:flex-row items-center justify-between p-6">
            <div className="flex items-center mb-4 md:mb-0">
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: 'white',
                  color: '#f59e0b',
                  mr: 3,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              >
                <AdminIcon fontSize="large" />
              </Avatar>
              <div>
                <Typography
                  variant="h4"
                  component="h1"
                  className="font-bold font-inria"
                  sx={{
                    fontWeight: 700,
                    fontFamily: "'Inria Sans', sans-serif"
                  }}
                >
                  Admin Dashboard
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, mt: 0.5 }}>
                  Welcome back, {adminUser?.name || adminUser?.email}
                </Typography>
              </div>
            </div>

            <Tooltip title="Logout">
              <IconButton
                onClick={logout}
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' }
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </CardContent>
        </DashboardHeader>

        {/* Stats Overview */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 600,
              fontFamily: "'Inria Sans', sans-serif",
              color: 'text.secondary'
            }}
          >
            Overview
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardStats.map((stat, index) => (
              <StatCard key={index}>
                <CardContent className="flex items-center p-4">
                  <Avatar
                    sx={{
                      bgcolor: stat.color,
                      width: 48,
                      height: 48,
                      mr: 2,
                      boxShadow: `0 4px 6px -1px ${stat.color}40, 0 2px 4px -1px ${stat.color}20`
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <div>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        fontWeight: 700,
                        fontFamily: "'Inria Sans', sans-serif"
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontFamily: "'Inria Sans', sans-serif" }}
                    >
                      {stat.title}
                    </Typography>
                  </div>
                </CardContent>
              </StatCard>
            ))}
          </div>
        </Box>

        {/* Main Content */}
        <Card sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
            <StyledTabs value={tab} onChange={(e, v) => setTab(v)} aria-label="admin tabs" variant="scrollable">
              <StyledTab
                icon={<BlogIcon sx={{ fontSize: 20 }} />}
                iconPosition="start"
                label="Blog Management"
                sx={{ fontFamily: "'Inria Sans', sans-serif" }}
              />
              <StyledTab
                icon={<NewsletterIcon sx={{ fontSize: 20 }} />}
                iconPosition="start"
                label="Newsletter"
                sx={{ fontFamily: "'Inria Sans', sans-serif" }}
              />
              <StyledTab
                icon={<ContactsIcon sx={{ fontSize: 20 }} />}
                iconPosition="start"
                label="Contact Messages"
                sx={{ fontFamily: "'Inria Sans', sans-serif" }}
              />
            </StyledTabs>
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
        </Card>

        {/* Footer */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 4, fontFamily: "'Inria Sans', sans-serif" }}
        >
          Admin Dashboard v1.0 • {new Date().getFullYear()}
        </Typography>
      </div>

      {/* Add Inria Sans font to the head */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
        body {
          font-family: 'Inria Sans', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;