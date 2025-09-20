import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Avatar,
  Tooltip,
  Card,
  CardContent
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  CheckCircle as ResolvedIcon,
  WatchLater as InReviewIcon,
  NewReleases as NewIcon
} from '@mui/icons-material';
import { api } from '../../utils';

const STORAGE_KEY = 'contact_submissions';

const statusOptions = [
  { value: 'New', label: 'New', color: 'primary', icon: <NewIcon /> },
  { value: 'In Review', label: 'In Review', color: 'warning', icon: <InReviewIcon /> },
  { value: 'Resolved', label: 'Resolved', color: 'success', icon: <ResolvedIcon /> }
];

const statusMap = {
  'New': { color: 'primary', icon: <NewIcon /> },
  'In Review': { color: 'warning', icon: <InReviewIcon /> },
  'Resolved': { color: 'success', icon: <ResolvedIcon /> }
};

const ContactsManager = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedContact, setSelectedContact] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get('/contacts');
        console.log(response, "ffvn")
        if (response.status === 200) {
          setContacts(response.data)
        }

      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchContacts();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/contact/${id}`, { status })
      console.log(res, "res")
      if (res.status == 200) {
        setContacts(res.data.data);
        setDetailOpen(false);
      }
    } catch (error) {
      console.log(error);
    }

  };

  const deleteContact = async (id) => {
    try {
      const res = await api.delete(`/contact/${id}`);
      console.log(res, "res")
      if (res.status == 200) {
        setContacts(res.data.data);
        setDeleteConfirmOpen(false);
        setContactToDelete(null);

      }
    } catch (error) {
      console.log(error);
    }


  };

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const matchesSearch = searchTerm === '' ||
        contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || contact.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [contacts, searchTerm, statusFilter]);

  const statusCounts = useMemo(() => {
    const counts = { 'All': contacts.length };
    statusOptions.forEach(status => {
      counts[status.value] = contacts.filter(c => c.status === status.value).length;
    });
    return counts;
  }, [contacts]);

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setDetailOpen(true);
  };

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setDeleteConfirmOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getInitials = (name) => {
    return name.split(' ')[0][0].toUpperCase();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Contact Submissions</h1>
          <p className="text-gray-600">Manage and track all customer inquiries and messages</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white shadow">
            <CardContent className="flex items-center">
              <Avatar className="bg-blue-100 text-blue-600 mr-4">
                <NewIcon />
              </Avatar>
              <div>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  New
                </Typography>
                <Typography variant="h5" component="div">
                  {statusCounts['New'] || 0}
                </Typography>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow">
            <CardContent className="flex items-center">
              <Avatar className="bg-amber-100 text-amber-600 mr-4">
                <InReviewIcon />
              </Avatar>
              <div>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  In Review
                </Typography>
                <Typography variant="h5" component="div">
                  {statusCounts['In Review'] || 0}
                </Typography>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow">
            <CardContent className="flex items-center">
              <Avatar className="bg-green-100 text-green-600 mr-4">
                <ResolvedIcon />
              </Avatar>
              <div>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Resolved
                </Typography>
                <Typography variant="h5" component="div">
                  {statusCounts['Resolved'] || 0}
                </Typography>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow">
            <CardContent className="flex items-center">
              <Avatar className="bg-gray-100 text-gray-600 mr-4">
                <PersonIcon />
              </Avatar>
              <div>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Total
                </Typography>
                <Typography variant="h5" component="div">
                  {statusCounts['All'] || 0}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Paper className="p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
          <TextField
            size="small"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
            sx={{ minWidth: 250 }}
          />

          <TextField
            size="small"
            select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="All">All Statuses ({statusCounts['All']})</MenuItem>
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label} ({statusCounts[option.value]})
              </MenuItem>
            ))}
          </TextField>

          <div className="flex-grow"></div>

          <Typography variant="body2" color="textSecondary">
            Showing {filteredContacts.length} of {contacts.length} contacts
          </Typography>
        </Paper>

        {/* Contacts Table */}
        <TableContainer component={Paper} className="shadow">
          <Table>
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell>Contact</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Message Preview</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id} hover>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="bg-blue-500 text-white mr-3" sx={{ width: 32, height: 32 }}>
                        {getInitials(contact.fullname)}
                      </Avatar>
                      <div>
                        <div className="font-medium">{contact.fullName}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <EmailIcon sx={{ fontSize: 14, mr: 0.5 }} />
                          {contact.email}
                        </div>
                        {contact.phone && (
                          <div className="text-sm text-gray-500 flex items-center">
                            <PhoneIcon sx={{ fontSize: 14, mr: 0.5 }} />
                            {contact.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{contact.fullname}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{contact.subject}</div>
                  </TableCell>

                  <TableCell>
                    <div className="text-sm text-gray-600 line-clamp-2">
                      {contact.message.length > 100
                        ? `${contact.message.substring(0, 100)}...`
                        : contact.message}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-500">
                      {formatDate(contact.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={contact.status}
                      color={statusMap[contact.status]?.color || 'default'}
                      icon={statusMap[contact.status]?.icon}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleViewDetails(contact)}
                      >
                        <ViewIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteClick(contact)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {filteredContacts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" className="p-8">
                    <div className="text-gray-500">
                      {contacts.length === 0
                        ? 'No contact submissions yet.'
                        : 'No contacts match your search criteria.'}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Contact Detail Dialog */}
        <Dialog open={detailOpen} onClose={() => setDetailOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            Contact Details
            {selectedContact && (
              <Chip
                label={selectedContact.status}
                color={statusMap[selectedContact.status]?.color || 'default'}
                icon={statusMap[selectedContact.status]?.icon}
                className="ml-3"
                size="small"
              />
            )}
          </DialogTitle>
          <DialogContent dividers>
            {selectedContact && (
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <Avatar className="bg-blue-500 text-white mr-3" sx={{ width: 40, height: 40 }}>
                    {getInitials(selectedContact.fullname)}
                  </Avatar>
                  <div>
                    <Typography variant="h6">{selectedContact.fullName}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Submitted on {formatDate(selectedContact.createdAt)}
                    </Typography>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Typography variant="subtitle2" color="textSecondary">Name</Typography>
                    <Typography className="flex items-center">
                      <EmailIcon sx={{ fontSize: 16, mr: 1 }} />
                      {selectedContact.fullname}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2" color="textSecondary">Email</Typography>
                    <Typography className="flex items-center">
                      <EmailIcon sx={{ fontSize: 16, mr: 1 }} />
                      {selectedContact.email}
                    </Typography>
                  </div>
                  {selectedContact.phone && (
                    <div>
                      <Typography variant="subtitle2" color="textSecondary">Phone</Typography>
                      <Typography className="flex items-center">
                        <PhoneIcon sx={{ fontSize: 16, mr: 1 }} />
                        {selectedContact.phone}
                      </Typography>
                    </div>
                  )}
                </div>

                <div>
                  <Typography variant="subtitle2" color="textSecondary">Subject</Typography>
                  <Typography>{selectedContact.subject}</Typography>
                </div>

                <div>
                  <Typography variant="subtitle2" color="textSecondary">Message</Typography>
                  <Typography className="whitespace-pre-wrap bg-gray-50 p-3 rounded">
                    {selectedContact.message}
                  </Typography>
                </div>

                <div>
                  <Typography variant="subtitle2" color="textSecondary">Update Status</Typography>
                  <Box className="flex gap-2 mt-1">
                    {statusOptions.map((status) => (
                      <Chip
                        key={status.value}
                        label={status.label}
                        color={selectedContact.status === status.value ? status.color : 'default'}
                        variant={selectedContact.status === status.value ? 'filled' : 'outlined'}
                        onClick={() => updateStatus(selectedContact._id, status.value)}
                        clickable
                      />
                    ))}
                  </Box>
                </div>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDetailOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
          <DialogTitle>Delete Contact</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the contact from {contactToDelete?.fullName}?
              This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
            <Button
              onClick={() => deleteContact(contactToDelete?._id)}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ContactsManager;