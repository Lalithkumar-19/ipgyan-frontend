import React, { useEffect, useMemo, useState } from 'react';
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

const STORAGE_KEY = 'newsletter_subscribers';

const NewsletterManager = () => {
  const [tab, setTab] = useState(0);
  const [subscribers, setSubscribers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    setSubscribers(data);
  }, []);

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return subscribers.filter(x =>
      x.email.toLowerCase().includes(s) || (x.name || '').toLowerCase().includes(s)
    );
  }, [subscribers, search]);

  // Compose state
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const sendNewsletter = () => {
    alert(`Newsletter sent to ${subscribers.length} subscribers\nSubject: ${subject}`);
    setSubject('');
    setBody('');
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="Subscribers" />
          <Tab label="Compose & Send" />
        </Tabs>
      </Box>

      {tab === 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <TextField size="small" label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button
              onClick={() => {
                const email = prompt('Enter subscriber email');
                if (!email) return;
                const name = prompt('Enter subscriber name (optional)') || '';
                const next = [...subscribers, { id: Date.now(), email, name }];
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
                setSubscribers(next);
              }}
              className="px-3 py-2 rounded bg-amber-500 text-white"
            >
              Add Subscriber
            </button>
          </div>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">
                      <button onClick={() => {
                        const next = subscribers.filter(x => x.id !== row.id);
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
                        setSubscribers(next);
                      }} className="px-2 py-1 rounded bg-red-100 text-red-700">Delete</button>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3}>No subscribers found.</TableCell>
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
        <div className="grid gap-3">
          <TextField label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          <TextField label="Body" value={body} onChange={(e) => setBody(e.target.value)} multiline minRows={6} />
          <button onClick={sendNewsletter} className="self-start px-4 py-2 rounded bg-amber-500 text-white">Send Newsletter</button>
        </div>
      )}
    </div>
  );
};

export default NewsletterManager;
