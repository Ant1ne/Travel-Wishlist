import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'


// file
import { AppDispatch, RootState } from '../../redux/store'
import {fetchCountryData} from '../../redux/thunk/countries';
import CountryRow from './CountryRow';
import { Country } from "../../types/type";
import { actions } from "../../redux/slice/countries";
import LoadingPage from '../LoadingPage';

// Mui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// Mui table function
function createData(
    flag: string,
    name: {common: string; official: string},
    region: string,
    population: number,
    languages: object,
    maps: {googleMaps: string},
    flags: {png: string, svg: string;},
    currencies: {name: string; symbol: string},
    capital: string[]
  ): Country {
    return { flag, name, region, population, languages, maps, flags, currencies, capital };
  }

  // Mui alert
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

export default function CountryList() {
    // select store
    const countryList = useSelector(
        (state: RootState) => state.country.countries);

    const wishCountries = useSelector(
        (state: RootState) => state.country.wish);

      const loading = useSelector(
        (state: RootState) => state.country.showLoading);

    // dispatch for action
    const dispatch = useDispatch<AppDispatch>();

    // fetch data with useEffect
    useEffect(() => {
        dispatch(fetchCountryData());
        }, [dispatch]);

        // Mui table rows
    const rows = countryList.map((country) =>
        createData(
            country.flag,
            country.name,
            country.region,
            country.population,
            country.languages,
            country.maps,
            country.flags,
            country.currencies,
            country.capital
        )
      );

    // Mui style
    const style = {
        fontFamily: 'nunito',
        fontWeight: '700',
        fontSize: '17px',
        textAlign: 'center'
    };

    // Mui pagination for sticky table head
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // Mui Snackbar
    const [open, setOpen] = useState<boolean>(false);
    const [openAlert, SetOpenAlert] = useState<boolean>(false);

    const handleClick = () => {
      setOpen(true);
    };

    const handleWishClose = () => {
      SetOpenAlert(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };

    const handleCloseAlert = (
      event: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === 'clickaway') {
        return;
      }

      SetOpenAlert(false);
    };

    // Mui Snackbar actions
    const action = (
      <Fragment>
        <IconButton
          size='small'
          aria-label='close'
          color='primary'
          onClick={handleClose}
        >
        <CloseIcon fontSize='small' />
      </IconButton>
    </Fragment>
  );

    const actionAlert = (
      <Fragment>
        <IconButton
          size='small'
          aria-label='close'
          color='primary'
          onClick={handleCloseAlert}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      </Fragment>
    )

    // wish function onClick function
    const addWishHandler = (wish: Country) => {
        const hasDuplicate = wishCountries.some(
        (country) =>
            country.name.common.toLocaleLowerCase() ===
            wish.name.common.toLocaleLowerCase()
        );
        if (hasDuplicate) {
        return dispatch(actions.removeWish(wish.name.common));
        } else {
        return dispatch(actions.addWish(wish));
        }
    };

  return (
    <div className="countryList-container">
      {loading ? (
        <LoadingPage />
      ) : (
        <Paper sx={{
            width: '90%',
            overflow: 'hidden',
            margin: 'auto'
            }}>
          <TableContainer sx={{ maxHeight: 470 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead sx={style}>
                <TableRow>
                    <TableCell sx={style}>
                        Flag
                    </TableCell>
                    <TableCell sx={style}>
                        Name
                    </TableCell>
                    <TableCell sx={style}>
                        Region
                    </TableCell>
                    <TableCell sx={style}>
                        Population
                    </TableCell>
                    <TableCell sx={style}>
                        Travel Wishlist
                    </TableCell>
                    <TableCell sx={style}>
                        More Details
                    </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <CountryRow
                        key={row.name.common}
                        country={row}
                        addWishHandler={addWishHandler}
                        wishCountries={wishCountries}
                        style={style}
                        handleClick={handleClick}
                        handleWishClose={handleWishClose}
                    />
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 75, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
      <div>
        <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            action={action}
          >
          <Alert
            onClose={handleClose}
            severity='info'
            sx={{ width: '100%' }}
          >
            The country is successfully added to your travel wishlist
          </Alert>
        </Snackbar>
      </div>
      <div>
        <Snackbar
          open={openAlert}
          autoHideDuration={2000}
          onClose={handleCloseAlert}
          action={actionAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity='info'
            sx={{ width: '100%' }}
          >
            The country is removed from your travel wishlist
          </Alert>
        </Snackbar>
      </div>
    </div>
  )
}
