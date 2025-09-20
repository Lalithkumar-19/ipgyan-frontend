import React, { useEffect, useMemo, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Send as SendIcon,
  Edit as EditIcon,
  ContentCopy as CopyIcon,
  Api
} from '@mui/icons-material';
import { api } from '../../utils';
import CircularProgress from '@mui/material/CircularProgress';


const STORAGE_KEY = 'newsletter_subscribers';

const NewsletterManager = () => {
  const [tab, setTab] = useState(0);
  const [subscribers, setSubscribers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Newsletter state
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    async function Loadsubs() {
      try {
        const res = await api.get("/news-letter-req");
        if (res.status === 200) {
          setSubscribers(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    Loadsubs();
    // setSubscribers(data);
  }, []);

  useEffect(() => {
    // Load Quill dynamically
    const loadQuill = async () => {
      if (window.Quill) {
        initializeQuill();
        return;
      }

      // Load Quill CSS
      const link = document.createElement('link');
      link.href = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      // Load Quill JS
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js';
      script.async = true;
      script.onload = () => {
        initializeQuill();
      };
      document.body.appendChild(script);
    };

    const initializeQuill = () => {
      if (!editorRef.current || !window.Quill) return;

      const quill = new window.Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'blockquote', 'code-block', 'image'],
            [{ align: [] }],
            ['clean'],
          ]
        },
        placeholder: 'Compose your newsletter content here...',
      });

      quill.on('text-change', () => {
        setBody(quill.root.innerHTML);
      });

      quillRef.current = quill;
    };

    if (tab === 1) {
      loadQuill();
    }

    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, [tab]);

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return subscribers.filter(x =>
      x.email.toLowerCase().includes(s)
    );
  }, [subscribers, search]);



  const handleDeleteSubscriber = async (id) => {
    try {

      const res = await api.delete(`/news-letter-req/${id}`);
      if (res.status === 200) {
        setSubscribers(subscribers.filter(x => x._id !== id));
        setSnackbar({ open: true, message: "Subscriber deleted successfully", severity: "success" })
      }
    } catch (error) {
      console.log(error);

    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };




  const sendNewsletter = async () => {
    if (!subject) {
      setSnackbar({ open: true, message: 'Please enter a subject', severity: 'error' });
      return;
    }

    if (!body || body === '<p><br></p>') {
      setSnackbar({ open: true, message: 'Please enter newsletter content', severity: 'error' });
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/send-email", {
        subject,
        html: quillRef.current?.root?.innerHTML || body,
        text: body.replace(/<[^>]*>?/gm, '') // Add plain text version
      });

      if (res.status === 200) {
        // Get the count of active subscribers
        const activeSubscribers = subscribers.filter(s => !s.unsubscribed);
        const emailCount = activeSubscribers.length;

        setSnackbar({
          open: true,
          message: `Newsletter sent to ${emailCount} subscriber${emailCount !== 1 ? 's' : ''}`,
          severity: 'success'
        });

        // Reset form
        setSubject('');
        setBody('');
        if (quillRef.current) {
          quillRef.current.root.innerHTML = '';
        }
      }
    } catch (error) {
      console.error('Error sending newsletter:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to send newsletter. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };



  const exportSubscribers = () => {
    const csvContent = subscribers.map(s => `${s.email},${s.name || ''}`).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Newsletter Manager</h1>
          <p className="text-gray-600">Manage your subscribers and send newsletters</p>
        </div>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={(e, v) => setTab(v)}>
            <Tab label="Subscribers" />
            <Tab label="Compose Newsletter" />
          </Tabs>
        </Box>

        {tab === 0 && (
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <TextField
                size="small"
                label="Search subscribers"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                }}
                sx={{ minWidth: 250 }}
              />

              <div className="flex gap-2 flex-wrap">
                {/* <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddSubscriber}
                >
                  Add Subscriber
                </Button> */}

                {/* <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CopyIcon />}
                >
                  Import CSV
                  <input
                    type="file"
                    accept=".csv"
                    hidden
                    onChange={handleImportSubscribers}
                  />
                </Button> */}

                <Button
                  variant="outlined"
                  onClick={exportSubscribers}
                >
                  Export CSV
                </Button>
              </div>
            </div>

            <TableContainer component={Paper} elevation={2}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'grey.100' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                    {/* <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell> */}
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow key={row._id} hover>
                      <TableCell>{row.email}</TableCell>
                      {/* <TableCell>{row.name || '-'}</TableCell> */}
                      <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                        {/* <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleEditSubscriber(row)}
                          sx={{ mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton> */}
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteSubscriber(row._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                        {search ? 'No subscribers found' : 'No subscribers yet'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={filtered.length}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </TableContainer>
          </div>
        )}

        {tab === 1 && (
          <div className="p-6">
            <div className="grid gap-6">
              <TextField
                label="Newsletter Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                fullWidth
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Newsletter Content</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <div ref={editorRef} className="h-96"></div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={sendNewsletter}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                >
                  {loading ? 'Sending...' : 'Send Newsletter'}
                </Button>

                {/* <div className="text-sm text-gray-600">
                  Preview your newsletter before sending
                </div> */}
              </div>
            </div>
          </div>
        )}




        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default NewsletterManager;