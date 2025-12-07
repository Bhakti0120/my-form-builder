// src/pages/FormResponsesPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { loadResponses, loadTemplates, deleteResponse } from '../utils/storage';

export default function FormResponsesPage() {
  const { id: formId } = useParams();
  const navigate = useNavigate();

  if (!formId) {
    return <Typography>Invalid form ID.</Typography>;
  }

  const templates = loadTemplates();
  const template = templates[formId];
  const responses = loadResponses()[formId] || [];

  if (!template) return <Typography>Form not found.</Typography>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">{template.title} – Responses</Typography>
        <Button onClick={() => navigate('/forms')}>Back</Button>
      </Box>

      {responses.length === 0 && <Typography>No responses yet.</Typography>}

      {responses.map((r) => (
        <Card key={r.responseId} sx={{ mb: 2 }}>
          <CardContent
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Box>
              <Typography>Response {r.responseId}</Typography>
              <Typography variant="caption">
                {new Date(r.createdAt).toLocaleString()}
              </Typography>
            </Box>

            <Box display="flex" gap={1}>
              <Button
                size="small"
                onClick={() =>
                  navigate(
                    `/fill?formId=${formId}&mode=view&responseId=${r.responseId}`
                  )
                }
              >
                View
              </Button>

              <Button
                size="small"
                onClick={() =>
                  navigate(
                    `/fill?formId=${formId}&mode=edit&responseId=${r.responseId}`
                  )
                }
              >
                Edit
              </Button>

              <Button
                color="error"
                size="small"
                onClick={() => {
                  deleteResponse(formId!, r.responseId);
                  window.location.reload();
                }}
              >
                Delete
              </Button>

              <Box mt={2}>
                {(r.pretty ? Object.entries(r.pretty) : []).map(
                  ([label, value]) => (
                    <Typography key={label}>
                      <strong>{label}:</strong> {String(value)}
                    </Typography>
                  )
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
