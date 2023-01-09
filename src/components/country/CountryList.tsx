import React, { useEffect, useState } from 'react'
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

// Mui table function
function createData(
    flag: string,
    name: {common: string; official: string},
    region: string,
    population: number,
    languages: object,
    maps: {googleMaps: string},
    flags: {png: string},
    currencies?: {name: string; symbol: string},
    capital?: string[]
  ) {
    return { flag, name, region, population, languages };
  }


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
        fontWeight: '900',
        fontSize: '18px'
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
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <Paper sx={{
            width: '90%',
            overflow: 'hidden',
            margin: 'auto'
            }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
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
                        // handleClick={handleClick}
                        // handleWishClose={handleWishClose}
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
    </div>
  )
}
