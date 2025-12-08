import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { defaultConfig, useFormBuilder } from '../context/FormBuilderContext';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DesignServicesRounded from '@mui/icons-material/DesignServicesRounded';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import React from 'react';

export default function FormLibraryPage() {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem('published-forms') || '{}');
  const ids = Object.keys(stored);
  const { updateForm } = useFormBuilder();

  return (
    <Box
      p={3}
      sx={{
        width: '90%',
        maxWidth: '80%',
        mx: 'auto',
        
      }}
    >
      <Button
        variant="outlined"
        onClick={() => {
          updateForm(defaultConfig);
          navigate('/');
        }}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Typography variant="h4" mb={3}>
        Published Forms
      </Typography>

      {ids.length === 0 ? (
        <Typography>No forms published yet.</Typography>
      ) : (
        <Paper sx={{ width: '100%', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Title</b>
                </TableCell>
                <TableCell>
                  <b>Form ID</b>
                </TableCell>
                <TableCell align="right">
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {ids.map((id) => {
                const tpl = stored[id];

                const [anchorEl, setAnchorEl] =React.useState<null | HTMLElement>(null);
                const open = Boolean(anchorEl);
                const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) =>setAnchorEl(e.currentTarget);
                const handleMenuClose = () => setAnchorEl(null);

                return (
                  <TableRow key={id}>
                    <TableCell>{tpl.title}</TableCell>
                    <TableCell>{id}</TableCell>

                    <TableCell align="right">
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 1,
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                        }}
                      >
                        {/* EDIT ICON */}
                        <Tooltip title="Edit Layout">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => navigate(`/?edit=${id}`)}
                          >
                            <DesignServicesRounded fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        {/* DELETE ICON */}
                        <Tooltip title="Delete Form">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Delete form "${tpl.title}"? This cannot be undone.`
                                )
                              ) {
                                const stored = JSON.parse(
                                  localStorage.getItem('published-forms') ||
                                    '{}'
                                );
                                delete stored[id];
                                localStorage.setItem(
                                  'published-forms',
                                  JSON.stringify(stored)
                                );
                                window.location.reload();
                              }
                            }}
                          >
                            <DeleteRounded fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        {/* MORE OPTIONS (Dropdown) */}
                        <IconButton size="small" onClick={handleMenuOpen}>
                          <MoreVertIcon fontSize="small" />
                        </IconButton>

                        <Menu
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleMenuClose}
                        >
                          <MenuItem
                            onClick={() => {
                              handleMenuClose();
                              navigate(`/fill?formId=${id}&mode=create`);
                            }}
                          >
                            Fill Form
                          </MenuItem>

                          <MenuItem
                            onClick={() => {
                              handleMenuClose();
                              navigate(`/forms/${id}/responses`);
                            }}
                          >
                            View Responses
                          </MenuItem>
                        </Menu>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}
