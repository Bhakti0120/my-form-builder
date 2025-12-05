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
  const names = Object.keys(stored);
  const { updateForm } = useFormBuilder();

  return (
    <Box p={3}>
      <Button variant="outlined" onClick={() => {
                    updateForm(defaultConfig); 
                    navigate('/'); 
                  }}>
        Back
      </Button>
      <Typography variant="h4" mb={2}>
        Published Forms
      </Typography>

      {names.length === 0 ? (
        <Typography>No forms published yet.</Typography>
      ) : (
        <List disablePadding>
          {names.map((name) => (
            <ListItem
              key={name}
              sx={{ borderBottom: '1px solid #ddd' }}
              secondaryAction={
                <Box display="flex" gap={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/form/${name}`)}
                  >
                    Open
                  </Button>

                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/?edit=${name}`)}
                  >
                    Edit
                  </Button>
                </Box>
              }
            >
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
