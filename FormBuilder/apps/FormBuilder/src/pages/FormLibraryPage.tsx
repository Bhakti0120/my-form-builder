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
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DesignServicesRounded from '@mui/icons-material/DesignServicesRounded';
import DeleteRounded from '@mui/icons-material/DeleteRounded';

import { defaultConfig, useFormBuilder } from '../context/FormBuilderContext';
import { loadResponses, loadTemplates } from '../utils/storage';

export default function FormLibraryPage() {
  const navigate = useNavigate();
  const { updateForm } = useFormBuilder();

  // Load from localStorage only once
  const [templates, setTemplates] = React.useState(loadTemplates());

  // For dropdown menu actions
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [selectedFormId, setSelectedFormId] = React.useState<string | null>(
    null
  );

  const openMenu = Boolean(menuAnchor);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    formId: string
  ) => {
    setSelectedFormId(formId);
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedFormId(null);
  };

  // 2. Delete form + responses properly
  const handleDeleteForm = (formId: string, title: string) => {
    const confirmDelete = window.confirm(
      `Delete form "${title}"?\n\nThis will also DELETE all saved responses.\nThis action cannot be undone.`
    );
    if (!confirmDelete) return;

    // Delete templates
    const updatedTemplates = { ...templates };
    delete updatedTemplates[formId];
    localStorage.setItem('published-forms', JSON.stringify(updatedTemplates));

    // Delete responses
    const allResponses = loadResponses();
    delete allResponses[formId];
    localStorage.setItem('form-responses', JSON.stringify(allResponses));

    // Update UI without reload
    setTemplates(updatedTemplates);

    alert(`Form "${title}" and all responses deleted.`);
  };

  const ids = Object.keys(templates);

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
                const tpl = templates[id];

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
                            onClick={() => handleDeleteForm(id, tpl.title)}
                          >
                            <DeleteRounded fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        {/* MENU BUTTON */}
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, id)}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/*  Dropdown menu */}
      <Menu anchorEl={menuAnchor} open={openMenu} onClose={handleMenuClose}>
        <MenuItem
          onClick={() => {
            navigate(`/fill?formId=${selectedFormId}&mode=create`);
            handleMenuClose();
          }}
        >
          Fill Form
        </MenuItem>

        <MenuItem
          onClick={() => {
            navigate(`/forms/${selectedFormId}/responses`);
            handleMenuClose();
          }}
        >
          View Responses
        </MenuItem>
      </Menu>
    </Box>
  );
}
