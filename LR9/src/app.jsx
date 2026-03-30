import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Paper,
  TextField,
  Select,
  MenuItem,
  Slider,
  InputAdornment,
  Button,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import {
  Menu as MenuIcon,
  Dashboard,
  Settings,
  ExpandLess,
  ExpandMore,
  Person,
  AccountCircle,
} from "@mui/icons-material";


// ================= TASK 1 =================
// Metric Card
const MetricCard = ({ title, value }) => (
  <Card>
    <CardContent>
      <Stack spacing={1} alignItems="center">
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </Stack>
    </CardContent>
  </Card>
);


// ================= TASK 2 =================
// Sidebar
const Sidebar = ({ open, toggleDrawer }) => {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <Drawer open={open} onClose={toggleDrawer}>
      <Box sx={{ width: 250 }}>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={() => setOpenSettings(!openSettings)}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
            {openSettings ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openSettings}>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  );
};


// ================= TASK 3 =================
// Form
const AssetForm = () => {
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState(5);

  return (
    <Paper elevation={4} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Asset Registration
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Asset Name"
          variant="outlined"
          fullWidth
        />

        <TextField
          label="Description"
          variant="filled"
          fullWidth
        />

        <TextField
          label="Price"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">$</InputAdornment>
            ),
          }}
        />

        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="">Select Category</MenuItem>
          <MenuItem value="hardware">Hardware</MenuItem>
          <MenuItem value="software">Software</MenuItem>
        </Select>

        <Typography gutterBottom>Priority Level</Typography>
        <Slider
          value={priority}
          onChange={(e, val) => setPriority(val)}
          step={1}
          marks
          min={1}
          max={10}
          valueLabelDisplay="auto"
        />

        <Button variant="contained">Submit</Button>
      </Stack>
    </Paper>
  );
};


// ================= MAIN APP =================
export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Sidebar open={open} toggleDrawer={() => setOpen(false)} />

      <Box sx={{ p: 3 }}>
        {/* TASK 1: Responsive Grid */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard title="Users" value="1200" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard title="Sessions" value="300" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard title="Revenue" value="$12K" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard title="Errors" value="5" />
          </Grid>
        </Grid>

        {/* TASK 3: Form */}
        <Box sx={{ mt: 4 }}>
          <AssetForm />
        </Box>
      </Box>
    </Box>
  );
}