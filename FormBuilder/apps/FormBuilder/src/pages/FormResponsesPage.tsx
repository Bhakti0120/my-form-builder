// apps/FormBuilder/src/pages/FormResponsesPage.tsx

import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';

import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { loadResponses, loadTemplates, deleteResponse } from '../utils/storage';

export default function FormResponsesPage() {
  const { id: formId } = useParams();
  const navigate = useNavigate();

  if (!formId) return <Typography>Invalid form ID.</Typography>;

  const template = loadTemplates()[formId];
  const responses = loadResponses()[formId] || [];

  if (!template) return <Typography>Form not found.</Typography>;

  // ⭐ Smart function to extract a "name-like" field
  const extractDisplayName = (data: Record<string, any>) => {
    if (!data) return null;

    // Most common name-like field IDs
    const keysByPriority = ['name', 'fullName', 'studentName', 'firstName'];

    for (const key of keysByPriority) {
      if (data[key]) return data[key];
    }

    // fallback: first non-empty text field
    const firstFieldValue = Object.values(data)[0];
    return firstFieldValue || null;
  };

  return (
    <Box p={2}>
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">{template.title} – Responses</Typography>

        <Button onClick={() => navigate('/forms')}>Back</Button>
      </Box>

      {/* NO RESPONSES */}
      {responses.length === 0 && <Typography>No responses yet.</Typography>}

      {/* RESPONSE LIST TABLE */}
      {responses.length > 0 && (
        <Paper sx={{ width: '100%', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Respondent</b>
                </TableCell>
                <TableCell>
                  <b>Submitted At</b>
                </TableCell>
                <TableCell align="right">
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {responses.map((r) => {
                const displayName = extractDisplayName(r.data) || r.responseId;

                return (
                  <TableRow key={r.responseId}>
                    {/* Name or fallback */}
                    <TableCell>{displayName}</TableCell>

                    {/* Date */}
                    <TableCell>
                      {new Date(r.createdAt).toLocaleString()}
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="right">
                      <Box display="flex" gap={1} justifyContent="flex-end">
                        {/* VIEW */}
                        <Tooltip title="View Response">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() =>
                              navigate(
                                `/fill?formId=${formId}&mode=view&responseId=${r.responseId}`
                              )
                            }
                          >
                            <VisibilityRoundedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        {/* EDIT */}
                        <Tooltip title="Edit Response">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() =>
                              navigate(
                                `/fill?formId=${formId}&mode=edit&responseId=${r.responseId}`
                              )
                            }
                          >
                            <EditRoundedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        {/* DELETE */}
                        <Tooltip title="Delete Response">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => {
                              if (window.confirm('Delete this response?')) {
                                deleteResponse(formId, r.responseId);
                                window.location.reload();
                              }
                            }}
                          >
                            <DeleteRoundedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
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
