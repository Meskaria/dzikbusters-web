import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box, Card, makeStyles
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { CONFIRMED_CASES_KEYS } from '../../../const';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, sightings, ...rest }) => {
  const classes = useStyles();

  const columns = [
    { field: CONFIRMED_CASES_KEYS.adns, headerName: 'NR ADNS' },
    {
      field: CONFIRMED_CASES_KEYS.voivodeship_case_number,
      headerName: 'Nr przypadku w woj.',
      width: 180
    },
    { field: CONFIRMED_CASES_KEYS.voivodeship, headerName: 'Województwo', width: 125 },
    { field: CONFIRMED_CASES_KEYS.TRACES, headerName: 'Kod TRACES', width: 130 },
    { field: CONFIRMED_CASES_KEYS.TERYT_district, headerName: 'Powiat (TERYT)', width: 150 },
    { field: CONFIRMED_CASES_KEYS.borough, headerName: 'Gmina' },
    {
      field:
      CONFIRMED_CASES_KEYS.city,
      headerName: 'Miejscowość (najbliższa lub Nr obwodu łowieckiego) - jeśli możliwe',
      width: 130
    },
    {
      field: CONFIRMED_CASES_KEYS.DWK,
      headerName: 'Nazwa obszaru z DWK 2014/709',
      width: 130
    },
    {
      field: CONFIRMED_CASES_KEYS.latitude, headerName: 'Szerokość', width: 130, hidden: true
    },
    {
      field: CONFIRMED_CASES_KEYS.longitude, headerName: 'Długość', width: 130, hidden: true
    },
    {
      field: CONFIRMED_CASES_KEYS.method_of_neutralization,
      headerName: 'Sposób unieszkodliwienia zwłok',
      width: 130
    },
    { field: CONFIRMED_CASES_KEYS.date_of_filling, headerName: 'Data zgłoszenia', width: 130 },
    {
      field: CONFIRMED_CASES_KEYS.date_of_sample_dispatch,
      headerName: 'Data wysłania próbek',
      width: 130
    },
    {
      field: CONFIRMED_CASES_KEYS.date_of_confirmation,
      headerName: 'Data potwierdzenia',
      width: 130
    },
    {
      field: CONFIRMED_CASES_KEYS.test_id,
      headerName: 'Nr sprawozdania z badań (ostatecznego)',
      width: 130
    },
    { field: CONFIRMED_CASES_KEYS.type_of_test, headerName: 'Rodzaj badania', width: 130 },
    {
      field: CONFIRMED_CASES_KEYS.number_of_sick_boar,
      headerName: 'Liczba dzików dodatnich',
      width: 130
    },
    {
      field: CONFIRMED_CASES_KEYS.cause_of_suspicion,
      headerName: 'Przyczyna podejrzenia',
      width: 130
    },
    {
      field: CONFIRMED_CASES_KEYS.gender_age_weight,
      headerName: 'Płeć - wiek (w miesiącach) - waga',
      width: 250,
      resizable: true
    },
    { field: CONFIRMED_CASES_KEYS.corpse_state_one, headerName: '+', width: 40 },
    { field: CONFIRMED_CASES_KEYS.corpse_state_two, headerName: '++', width: 50 },
    { field: CONFIRMED_CASES_KEYS.corpse_state_three, headerName: '+++', width: 60 },
    { field: CONFIRMED_CASES_KEYS.corpse_state_bones, headerName: 'Kości', width: 70 }
  ];
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050} minHeight={700} height={700}>
          <DataGrid
            pagination
            columns={columns}
            rows={sightings.map((s) => ({
              ...s,
              id: s.adns
            }))}
            pageSize={20}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  sightings: PropTypes.array.isRequired
};

export default Results;
