import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles
} from '@material-ui/core';
import { Formik } from 'formik';
import FormControl from '@material-ui/core/FormControl';
import { FilterList } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SELECT_KEYS } from '../../../const';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Filters = ({
  data, setData, selectData, className
}) => {
  const classes = useStyles();
  const filterSelectData = {
    ...selectData,
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={className}>
      <Button onClick={handleClickOpen} startIcon={<FilterList />}>Filtruj</Button>
      <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Wybierz filtry które chcesz zastosować</DialogTitle>
        <Formik
          initialValues={SELECT_KEYS.map((key) => {
            return {
              [key]: ''
            };
          })}
          onSubmit={(val) => console.log(val)}
        >
          {({
            values,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <>
              <DialogContent>
                <form onSubmit={handleSubmit} className={classes.container}>
                  {
                        Object.entries(SELECT_KEYS).map(([key, value]) => {
                          const filter = filterSelectData[key];
                          return (
                            <FormControl fullWidth className={classes.formControl}>
                              <Autocomplete
                                options={filter}
                                style={{ width: 400 }}
                                value={values[key]}
                                name={key}
                                id={key}
                                onChange={(_, val) => {
                                  setFieldValue(key, val);
                                }}
                                onBlur={handleBlur}
                                renderInput={(params) => (
                                  <TextField
                                    fullWidth
                                    {...params}
                                    label={value}
                                    variant="outlined"
                                  />
                                )}
                              />
                            </FormControl>
                          );
                        })
                      }
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="secondary" variant="outlined">
                  Cancel
                </Button>
                <Button onClick={() => { handleClose(); }} disabled={isSubmitting} color="primary" variant="contained">
                  Submit
                </Button>
              </DialogActions>
            </>
          )}
        </Formik>

      </Dialog>
    </div>
  );
};
Filters.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  setData: PropTypes.func,
  selectData: PropTypes.any
};

export default Filters;
