import React, { useState } from "react";
import { Box, AppBar, Toolbar, Typography, Switch } from "@mui/material";
import FormBuilder from "../Components/Layout/FormBuilder";
import FormPreview from "../Components/Preview/FormPreview";


export default function App() {
  const [mode, setMode] = useState<"builder" | "preview">("builder");

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dynamic Form Layout Builder
          </Typography>

          <Typography variant="body2" sx={{ mr: 1 }}>
            Preview
          </Typography>
          <Switch
            checked={mode === "preview"}
            onChange={() => setMode((m) => (m === "builder" ? "preview" : "builder"))}
            inputProps={{ "aria-label": "toggle preview" }}
          />
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ p: 3 }}>
        {mode === "builder" ? <FormBuilder /> : <FormPreview />}
      </Box>
    </Box>
  );
}
