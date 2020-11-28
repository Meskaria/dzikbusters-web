import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box, Card, makeStyles
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, sightings, ...rest }) => {
  const classes = useStyles();

  const columns = [
    { field: 'NR ADNS', headerName: 'NR ADNS' },
    {
      field: 'Nr przypadku w województwie',
      headerName: 'Nr przypadku w woj.',
      width: 180
    },
    { field: 'Województwo', headerName: 'Województwo', width: 125 },
    { field: 'Kod jednostki TRACES', headerName: 'Kod TRACES', width: 130 },
    { field: 'Powiat wg kodu TERYT', headerName: 'Powiat (TERYT)', width: 150 },
    { field: 'Gmina', headerName: 'Gmina' },
    {
      field:
        'Miejscowość (najbliższa lub Nr obwodu łowieckiego) - jeśli możliwe',
      headerName: 'Miejscowość (najbliższa lub Nr obwodu łowieckiego) - jeśli możliwe',
      width: 130
    },
    {
      field: 'Nazwa obszaru z DWK 2014/709',
      headerName: 'Nazwa obszaru z DWK 2014/709',
      width: 130
    },
    {
      field: 'Szerokość', headerName: 'Szerokość', width: 130, hidden: true
    },
    {
      field: 'Długość', headerName: 'Długość', width: 130, hidden: true
    },
    {
      field: 'Sposób unieszkodliwienia zwłok',
      headerName: 'Sposób unieszkodliwienia zwłok',
      width: 130
    },
    { field: 'Data zgłoszenia', headerName: 'Data zgłoszenia', width: 130 },
    {
      field: 'Data wysłania próbek',
      headerName: 'Data wysłania próbek',
      width: 130
    },
    {
      field: 'Data potwierdzenia',
      headerName: 'Data potwierdzenia',
      width: 130
    },
    {
      field: 'Nr sprawozdania z badań (ostatecznego)',
      headerName: 'Nr sprawozdania z badań (ostatecznego)',
      width: 130
    },
    { field: 'Rodzaj badania', headerName: 'Rodzaj badania', width: 130 },
    {
      field: 'Liczba dzików dodatnich',
      headerName: 'Liczba dzików dodatnich',
      width: 130
    },
    {
      field: 'Przyczyna podejrzenia',
      headerName: 'Przyczyna podejrzenia',
      width: 130
    },
    {
      field: 'Płeć - wiek (w miesiącach) - waga',
      headerName: 'Płeć - wiek (w miesiącach) - waga',
      width: 250,
      resizable: true
    },
    { field: '+', headerName: '+', width: 40 },
    { field: '++', headerName: '++', width: 50 },
    { field: '+++', headerName: '+++', width: 60 },
    { field: 'Kości', headerName: 'Kości', width: 70 }
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
              id: s['NR ADNS']
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
