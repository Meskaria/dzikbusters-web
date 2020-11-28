import React, { useState } from 'react';
import { capitalize } from 'lodash';
import data from 'src/res.json';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import Filters from './Filters';
import { SELECT_KEYS } from '../../../const';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SightingListView = () => {
  const classes = useStyles();
  const [sightings, setSightings] = useState(data);
  // TODO useCallback
  const selectData = Object.entries(SELECT_KEYS).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: [...new Set(sightings.map((s) => {
        return capitalize(s[value]);
      }))]
    };
  }, {});

  return (
    <Page className={classes.root} title="sightings">
      <Container maxWidth={false}>
        <Toolbar>
          <Filters data={sightings} setData={setSightings} selectData={selectData} />
        </Toolbar>
        <Box mt={3}>
          <Results sightings={sightings} />
        </Box>
      </Container>
    </Page>
  );
};

export default SightingListView;
