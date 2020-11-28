import React, { useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import cx from 'classnames';
import useSupercluster from 'use-supercluster';
import pointerDeadImg from 'src/icons/padly.png';
import pointerAccImg from 'src/icons/accident.png';
import pointerShotImg from 'src/icons/red-crosshairs-png-7.png';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import data from '../../../res.json';
import { KEYS } from '../../../const';

const pointers = {
  odstrzelony: pointerShotImg,
  'odstrzelony z objawami': pointerShotImg,
  'padły/padłe': pointerDeadImg,
  padły: pointerDeadImg,
  'zabity w wypadku': pointerAccImg,
};
const getSize = (count) => {
  if (count <= 10) {
    return '20px';
  }

  if (count <= 50 && count > 10) {
    return '30px';
  }

  if (count <= 150 && count > 50) {
    return '45px';
  }
  return '50px';
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  },
  clusterMarker: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex',
    borderRadius: '100px',
  },
  clusterWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex',
    borderRadius: '100px',
    boxShadow: '1px 1px 4px 3px #dc5353',
    backgroundColor: '#dc5353',
  },
  boarMarker: {
    border: 'none',
    background: 'transparent',
  },
  boarMarkerImg: {
    height: '30px',
    width: '30px',
  },
  boarMarkerConfirmed: {
    background: '#dc53537d',
    boxShadow: '0 0 3px 3px #dc53537d',
    borderRadius: '100px',
    textAlign: 'center',
    display: 'flex',
    alignOtems: 'center',
    justifyContent: 'center',
  }
}));

// eslint-disable-next-line react/prop-types,max-len
const Marker = ({ children, className, style }) => <div style={style} className={className}>{children}</div>;
const ProductList = () => {
  const classes = useStyles();
  const mapRef = useRef();
  const [sightings] = useState(data);
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);
  const errorIds = [];

  const points = sightings.map((d) => ({
    type: 'Feature',
    properties: {
      cluster: false, id: d[KEYS.id], category: d[KEYS.cause], type: 'confirmed'
    },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(d[KEYS.lng]),
        parseFloat(d[KEYS.lat])
      ]
    }
  }));

  console.log(errorIds);

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 100, maxZoom: 36 }
  });
  return (
    <Page
      className={classes.root}
      title="Products"
    >
      <Container maxWidth={false}>
        {/* <Toolbar /> */}
        <Box mt={3} height={750} width={900}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDj0eEH8lm2C-uXpxiVmTMerITqwwj_rfU' }}
            defaultCenter={{ lat: 52.2297, lng: 21.0122 }}
            defaultZoom={10}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map }) => {
              mapRef.current = map;
            }}
            onChange={({ zoom, bounds }) => {
              setZoom(zoom);
              setBounds([
                bounds.nw.lng,
                bounds.se.lat,
                bounds.se.lng,
                bounds.nw.lat
              ]);
            }}
          >
            {clusters.map((cluster) => {
              const [longitude, latitude] = cluster.geometry.coordinates;
              const {
                cluster: isCluster,
                point_count: pointCount
              } = cluster.properties;

              if (isCluster) {
                // console.log(cluster, 'props');
                return (
                  <Marker
                    key={`cluster-${cluster.id}`}
                    lat={latitude}
                    lng={longitude}
                    className={classes.clusterWrap}
                    style={{
                      width: getSize(pointCount),
                      height: getSize(pointCount)
                    }}
                  >
                    <div
                      className={classes.clusterMarker}
                      onClick={() => {
                        const expansionZoom = Math.min(
                          supercluster.getClusterExpansionZoom(cluster.id),
                          20
                        );
                        mapRef.current.setZoom(expansionZoom);
                        mapRef.current.panTo({ lat: latitude, lng: longitude });
                      }}
                    >
                      {pointCount}
                    </div>
                  </Marker>
                );
              }

              console.log(cluster.properties);
              return (
                <Marker
                  key={`boar-${cluster.properties.id}`}
                  lat={latitude}
                  lng={longitude}
                >
                  <button type="button" className={classes.boarMarker}>
                    <img
                      className={cx(classes.boarMarkerImg, classes.boarMarkerConfirmed)}
                      src={pointers[cluster.properties.category.toLowerCase()]}
                      alt={cluster.properties.category}
                      title={cluster.properties.category}
                    />
                  </button>
                </Marker>
              );
            })}
          </GoogleMapReact>
        </Box>
      </Container>
    </Page>
  );
};

export default ProductList;
