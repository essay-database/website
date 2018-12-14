import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import MUIDataTable from "mui-datatables";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import uuidv1 from "uuid/v1";
import isEqual from "lodash/isEqual";
import getData, { columns, years, statuses, countries, states } from "./data";
import { getEssays, createEssay, editEssay, deleteEssay } from "./api";
import "./index.css";

function logState(action, state) {
  console.log(action, state);
}

function isString(value) {
  return typeof value === "string" || value instanceof String;
}

function isNumber(value) {
  return typeof value === "number" && isFinite(value);
}

function isBoolean(value) {
  return typeof value === "boolean";
}

const isValid = value =>
  (isString(value) && value.length > 0) ||
  (isNumber(value) && value > -1) ||
  isBoolean(value);

const format = value => (isString(value) ? value.trim() : value);

const deepClone = value => JSON.parse(JSON.stringify(value));

class App extends PureComponent {
  static async getInitialProps({ req }) {
    return {
      env: "dev"
    };
  }
  state = {
    open: false,
    data: [],
    dataIndex: -1,
    row: []
  };

  validateRow = row => isValid(row[1]);

  formatRow = row => row.map(value => format(value));

  createRow = () => {
    const row = [
      uuidv1(),
      "",
      "",
      "",
      new Date().getFullYear(),
      "",
      "",
      "",
      "",
      "",
      false.toString(),
      -1,
      new Date().toDateString(),
      "",
      "",
      0
    ];
    return row;
  };

  handleConfirm = msg => window.confirm(msg);

  handleRowClick = (_, { dataIndex }) => {
    this.setState(({ data }) => {
      logState("click", this.state);
      return {
        open: true,
        dataIndex,
        row: [...data[dataIndex]]
      };
    });
  };

  handleDelete = () => {
    let sync = false;
    this.setState(
      ({ data, dataIndex }) => {
        logState("delete", this.state);
        if (this.handleConfirm("are you sure?")) {
          const newData = data.filter((_, idx) => idx !== dataIndex);
          sync = true;
          return {
            data: deepClone(newData),
            open: false
          };
        }
      },
      async () => {
        if (sync) await deleteEssay(this.state.row[0]);
      }
    );
  };

  handleAdd = () => {
    this.setState(({ data }) => {
      logState("add", this.state);
      return {
        row: this.createRow(),
        open: true,
        dataIndex: data.length
      };
    });
  };

  handleClose = () => {
    this.setState(({ data, dataIndex, row }) => {
      logState("close", this.state);
      if (dataIndex < data.length) {
        if (!isEqual(row, data[dataIndex])) {
          if (this.handleConfirm("abandon changes?")) return { open: false };
        } else {
          return { open: false };
        }
      } else {
        if (this.handleConfirm("abandon changes?")) return { open: false };
      }
    });
  };

  handleSave = () => {
    let isCreate,
      sync = false;
    this.setState(
      ({ dataIndex, data, row }) => {
        logState("save", this.state);
        let update = false;
        if (dataIndex < data.length) {
          if (this.validateRow(this.formatRow(row))) {
            data[dataIndex] = row;
            update = sync = true;
          }
        } else {
          if (this.validateRow(this.formatRow(row))) {
            data.push(row);
            update = isCreate = sync = true;
          }
        }
        return update ? { data: deepClone(data), open: false } : null;
      },
      async () => {
        const { row } = this.state;
        if (sync) {
          if (isCreate) await createEssay(row);
          else await editEssay(row);
        }
      }
    );
  };

  handleChange = index => ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState(({ row }) => {
      logState("change", this.state);
      row[index] = value;
      return { row: [...row] };
    });
  };

  async componentDidMount() {
    let data;
    if (this.props.env === "prod") data = await getEssays();
    else data = getData(69);
    this.setState({ data });
  }

  render() {
    const options = {
      responsive: "scroll",
      onRowClick: this.handleRowClick,
      rowsPerPage: 15,
      rowsPerPageOptions: [15, 25, 50, 100],
      selectableRows: false
    };
    const { data, row, open, dataIndex } = this.state;
    const [
      id,
      essay,
      prompt,
      college,
      year,
      status,
      name,
      email,
      country,
      state,
      featured,
      image,
      date,
      source,
      comments,
      views
    ] = row;
    const { classes } = this.props;
    const isEdit = dataIndex < data.length;
    return (
      <>
        <Head>
          <title>essaydb dashboard</title>
        </Head>
        <div className={classes.root}>
          <Fab
            className={classes.button}
            color="primary"
            onClick={this.handleAdd}
          >
            <AddIcon />
          </Fab>
          <MUIDataTable
            title="Essays Dashboard"
            data={data}
            columns={columns}
            options={options}
          />
          <Dialog
            open={open}
            onClose={this.handleClose}
            fullWidth
            maxWidth="lg"
          >
            <DialogTitle>{isEdit ? "Edit" : "Create"} Essay</DialogTitle>
            <DialogContent>
              <form>
                <fieldset>
                  <legend>Essay</legend>
                  <TextField
                    onChange={this.handleChange(1)}
                    label="essay"
                    type="text"
                    value={essay}
                    multiline
                    rows={10}
                    fullWidth
                    required
                    error={!isValid(essay)}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    onChange={this.handleChange(2)}
                    label="prompt"
                    type="text"
                    value={prompt}
                    multiline
                    rows={2}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  {/* TODO autocomplete or dropdown ? */}
                  <TextField
                    onChange={this.handleChange(3)}
                    label="college"
                    type="text"
                    value={college}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink>Year</InputLabel>
                    <Select value={year} onChange={this.handleChange(4)}>
                      {years.map((year, idx) => (
                        <MenuItem key={idx} value={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink>status</InputLabel>
                    <Select value={status} onChange={this.handleChange(5)}>
                      {statuses.map((status, idx) => (
                        <MenuItem key={idx} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </fieldset>
                <fieldset>
                  <legend>Author</legend>
                  <TextField
                    onChange={this.handleChange(6)}
                    label="name"
                    type="text"
                    value={name}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    onChange={this.handleChange(7)}
                    label="email"
                    type="email"
                    value={email}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <FormControl className={classes.formControl}>
                    <InputLabel shrink>country</InputLabel>
                    <Select value={country} onChange={this.handleChange(8)}>
                      {countries.map((country, idx) => (
                        <MenuItem key={idx} value={country}>
                          {country}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    hidden={country !== "United States"}
                  >
                    <InputLabel shrink>state</InputLabel>
                    <Select value={state} onChange={this.handleChange(9)}>
                      {states.map((state, idx) => (
                        <MenuItem key={idx} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </fieldset>
                <fieldset>
                  <legend>Meta</legend>
                  <TextField
                    label="id"
                    type="text"
                    value={id}
                    fullWidth
                    disabled
                    InputLabelProps={{ shrink: true }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={Boolean(featured)}
                        onChange={this.handleChange(10)}
                        color="primary"
                      />
                    }
                    label="featured"
                  />
                  <TextField
                    onChange={this.handleChange(11)}
                    label="image"
                    type="number"
                    value={image}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="date"
                    type="text"
                    value={date}
                    disabled
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    onChange={this.handleChange(13)}
                    label="source"
                    type="url"
                    value={source}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    onChange={this.handleChange(14)}
                    label="comments"
                    type="text"
                    value={comments}
                    fullWidth
                    multiline
                    rows={2}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="views"
                    type="number"
                    value={views}
                    fullWidth
                    disabled
                    InputLabelProps={{ shrink: true }}
                  />
                </fieldset>
              </form>
            </DialogContent>
            <DialogActions>
              <Grid container justify="space-between">
                <Grid item>
                  <Button
                    color="secondary"
                    onClick={this.handleDelete}
                    disabled={!isEdit}
                  >
                    delete
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleSave} color="primary">
                    save
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
  }
}

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  button: {
    margin: theme.spacing.unit,
    position: "absolute",
    bottom: 80,
    right: 20,
    zIndex: 1001
  },
  root: {
    position: "relative"
  }
});

App.propTypes = {
  classes: PropTypes.object.isRequired,
  env: PropTypes.string.isRequired
};

export default withStyles(styles)(App);
