import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { defaultConfig, useFormBuilder } from '../context/FormBuilderContext';

export default function FormLibraryPage() {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem('published-forms') || '{}');
  const ids = Object.keys(stored);
  const { updateForm } = useFormBuilder();

  return (
    <Box p={3}>
      <Button
        variant="outlined"
        onClick={() => {
          updateForm(defaultConfig);
          navigate('/');
        }}
      >
        Back
      </Button>
      <Typography variant="h4" mb={2}>
        Published Forms
      </Typography>

      {ids.length === 0 ? (
        <Typography>No forms published yet.</Typography>
      ) : (
        <List disablePadding>
          {ids.map((id) => {
            const tpl = stored[id];

            return (
              <ListItem
                key={id}
                sx={{ borderBottom: '1px solid #ddd' }}
                secondaryAction={
                  <Box display="flex" gap={1}>
                    {/* Fill Form */}
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => navigate(`/fill?formId=${id}&mode=create`)}
                    >
                      Fill
                    </Button>

                    {/* Edit Layout */}
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => navigate(`/?edit=${id}`)}
                    >
                      Edit Layout
                    </Button>

                    {/* Responses */}
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => navigate(`/forms/${id}/responses`)}
                    >
                      Responses
                    </Button>
                  </Box>
                }
              >
                <ListItemText
                  primary={tpl.title}
                  secondary={`Form ID: ${id}`}
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
}
