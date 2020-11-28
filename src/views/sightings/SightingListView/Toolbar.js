import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,

  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, children, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        {children}
        <Button className={classes.exportButton}>Export</Button>
        <Button color="primary" variant="contained">
          Dodaj obserwacje
        </Button>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Toolbar;
