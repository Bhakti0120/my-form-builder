import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SizeSelector from './SizeSelector';
import { useFormBuilder } from '../../context/FormBuilderContext';

const fieldTypes = ['text', 'number', 'email', 'date', 'select'];

interface Props {
  row: any[]; // FieldConfig[]
  sectionId: string;
}

export default function FieldEditor({ row }: Props) {
  const { formConfig, updateForm } = useFormBuilder();

  const update = () => updateForm({ sections: [...formConfig.sections] });

  const addField = () => {
    row.push({
      id: crypto.randomUUID(),
      label: '',
      type: 'text',
      size: 'sm',
      required: false,
    });
    update();
  };

  const deleteField = (id: string) => {
    const idx = row.findIndex((f) => f.id === id);
    if (idx >= 0) {
      row.splice(idx, 1);
      update();
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {row.map((field, i) => (
          <Grid
            key={field.id}
            // Use flex or width instead of item/xs/md  to allow custom sizing
            style={{
              flex:
                field.size === 'xl'
                  ? '0 0 100%'
                  : field.size === 'lg'
                  ? '0 0 66.66%'
                  : field.size === 'md'
                  ? '0 0 50%'
                  : '0 0 33.33%',
            }}
          >
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="subtitle2">Field {i + 1}</Typography>
                  <TextField
                    label="Label"
                    value={field.label}
                    onChange={(e) => {
                      field.label = e.target.value;
                      update();
                    }}
                    fullWidth
                    size="small"
                  />

                  <TextField
                    label="Type"
                    select
                    value={field.type}
                    onChange={(e) => {
                      field.type = e.target.value;
                      update();
                    }}
                    fullWidth
                    size="small"
                  >
                    {fieldTypes.map((t) => (
                      <MenuItem key={t} value={t}>
                        {t}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Box display="flex" gap={1} alignItems="center">
                    <SizeSelector
                      size={field.size}
                      onChange={(v) => {
                        field.size = v;
                        update();
                      }}
                    />
                    <TextField
                      label="Required"
                      select
                      size="small"
                      value={field.required ? 'yes' : 'no'}
                      onChange={(e) => {
                        field.required = e.target.value === 'yes';
                        update();
                      }}
                      sx={{ width: 110 }}
                    >
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </TextField>
                  </Box>
                </Stack>
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                  size="small"
                  onClick={() => deleteField(field.id)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {/* Add field card */}
        <Grid style={{ flex: '0 0 100%' }}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={addField}
            >
              Add Field
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>

    // <Box>
    //   <Grid container spacing={2}>
    //     {row.map((field, i) => (
    //       <Grid
    //         item
    //         xs={12}
    //         md={Math.round(
    //           field.size === 'xl'
    //             ? 12
    //             : field.size === 'lg'
    //             ? 8
    //             : field.size === 'md'
    //             ? 6
    //             : 4
    //         )}
    //         key={field.id}
    //       >
    //         <Card variant="outlined">
    //           <CardContent>
    //             <Stack spacing={2}>
    //               <Typography variant="subtitle2">Field {i + 1}</Typography>
    //               <TextField
    //                 label="Label"
    //                 value={field.label}
    //                 onChange={(e) => {
    //                   field.label = e.target.value;
    //                   update();
    //                 }}
    //                 fullWidth
    //                 size="small"
    //               />

    //               <TextField
    //                 label="Type"
    //                 select
    //                 value={field.type}
    //                 onChange={(e) => {
    //                   field.type = e.target.value;
    //                   update();
    //                 }}
    //                 fullWidth
    //                 size="small"
    //               >
    //                 {fieldTypes.map((t) => (
    //                   <MenuItem key={t} value={t}>
    //                     {t}
    //                   </MenuItem>
    //                 ))}
    //               </TextField>

    //               <Box display="flex" gap={1} alignItems="center">
    //                 <SizeSelector
    //                   size={field.size}
    //                   onChange={(v) => {
    //                     field.size = v;
    //                     update();
    //                   }}
    //                 />
    //                 <TextField
    //                   label="Required"
    //                   select
    //                   size="small"
    //                   value={field.required ? 'yes' : 'no'}
    //                   onChange={(e) => {
    //                     field.required = e.target.value === 'yes';
    //                     update();
    //                   }}
    //                   sx={{ width: 110 }}
    //                 >
    //                   <MenuItem value="yes">Yes</MenuItem>
    //                   <MenuItem value="no">No</MenuItem>
    //                 </TextField>
    //               </Box>
    //             </Stack>
    //           </CardContent>

    //           <CardActions sx={{ justifyContent: 'space-between' }}>
    //             <Button
    //               size="small"
    //               onClick={() => deleteField(field.id)}
    //               startIcon={<DeleteIcon />}
    //             >
    //               Delete
    //             </Button>
    //             {/* placeholder for drag handle or additional actions */}
    //           </CardActions>
    //         </Card>
    //       </Grid>
    //     ))}

    //     {/* Add field card */}
    //     <Grid item xs={12}>
    //       <Box display="flex" justifyContent="flex-end">
    //         <Button
    //           variant="contained"
    //           startIcon={<AddIcon />}
    //           onClick={addField}
    //         >
    //           Add Field
    //         </Button>
    //       </Box>
    //     </Grid>
    //   </Grid>
    // </Box>
  );
}

// import React from 'react';
// import {
//   Box,
//   TextField,
//   MenuItem,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Typography,
//   Stack,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import SizeSelector from './SizeSelector';
// import { useFormBuilder } from '../../context/FormBuilderContext';

// const fieldTypes = ['text', 'number', 'email', 'date', 'select'];

// interface Props {
//   row: any[];
//   sectionId: string;
// }

// export default function FieldEditor({ row }: Props) {
//   const { formConfig, updateForm } = useFormBuilder();

//   const update = () => updateForm({ sections: [...formConfig.sections] });

//   const sizeToFlex = (size: string) => {
//     switch (size) {
//       case 'xl':
//         return '100%';
//       case 'lg':
//         return '66.66%';
//       case 'md':
//         return '50%';
//       default:
//         return '33.33%'; // sm
//     }
//   };

//   const addField = () => {
//     row.push({
//       id: crypto.randomUUID(),
//       label: '',
//       type: 'text',
//       size: 'sm',
//       required: false,
//     });
//     update();
//   };

//   const deleteField = (id: string) => {
//     const idx = row.findIndex((f) => f.id === id);
//     if (idx >= 0) {
//       row.splice(idx, 1);
//       update();
//     }
//   };

//   return (
//     <Stack spacing={2}>
//       {/* Fields in horizontal wrapping layout */}
//       <Stack direction="row" spacing={2} flexWrap="wrap">
//         {row.map((field, i) => (
//           <Box
//             key={field.id}
//             sx={{ flex: `0 0 ${sizeToFlex(field.size)}`, mb: 2 }}
//           >
//             <Card variant="outlined">
//               <CardContent>
//                 <Stack spacing={2}>
//                   <Typography variant="subtitle2">Field {i + 1}</Typography>

//                   {/* Label */}
//                   <TextField
//                     label="Label"
//                     value={field.label}
//                     onChange={(e) => {
//                       field.label = e.target.value;
//                       update();
//                     }}
//                     fullWidth
//                     size="small"
//                   />

//                   {/* Type Selector */}
//                   <TextField
//                     label="Type"
//                     select
//                     value={field.type}
//                     onChange={(e) => {
//                       field.type = e.target.value;
//                       update();
//                     }}
//                     fullWidth
//                     size="small"
//                   >
//                     {fieldTypes.map((t) => (
//                       <MenuItem key={t} value={t}>
//                         {t}
//                       </MenuItem>
//                     ))}
//                   </TextField>

//                   {/* Size + Required */}
//                   <Box display="flex" gap={1} alignItems="center">
//                     <SizeSelector
//                       size={field.size}
//                       onChange={(v) => {
//                         field.size = v;
//                         update();
//                       }}
//                     />
//                     <TextField
//                       label="Required"
//                       select
//                       size="small"
//                       value={field.required ? 'yes' : 'no'}
//                       onChange={(e) => {
//                         field.required = e.target.value === 'yes';
//                         update();
//                       }}
//                       sx={{ width: 110 }}
//                     >
//                       <MenuItem value="yes">Yes</MenuItem>
//                       <MenuItem value="no">No</MenuItem>
//                     </TextField>
//                   </Box>
//                 </Stack>
//               </CardContent>

//               <CardActions sx={{ justifyContent: 'space-between' }}>
//                 <Button
//                   size="small"
//                   color="error"
//                   startIcon={<DeleteIcon />}
//                   onClick={() => deleteField(field.id)}
//                 >
//                   Delete
//                 </Button>
//               </CardActions>
//             </Card>
//           </Box>
//         ))}
//       </Stack>

//       {/* Add Field Button */}
//       <Box display="flex" justifyContent="flex-end">
//         <Button variant="contained" startIcon={<AddIcon />} onClick={addField}>
//           Add Field
//         </Button>
//       </Box>
//     </Stack>
//   );
// }
