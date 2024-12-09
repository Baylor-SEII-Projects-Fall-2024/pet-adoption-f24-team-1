import React, { useState, useEffect } from 'react';
import { Grid, Stack, Pagination, TextField } from '@mui/material';
import axios from 'axios';
import NavBar from '@/components/nav-bar';
import FilterStack from '@/components/filter-stack';  // Adjust this to fit the new filter logic

export default function AdoptionCenterHome() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 20;

    // Filters for name, address, and zip code
    const [nameFltr, setNameFltr] = useState('');
    const [addressFltr, setAddressFltr] = useState('');
    const [zipFltr, setZipFltr] = useState('');

    // Filter logic
    function filters(item) {
        return (
            (nameFltr ? item.name.toLowerCase().includes(nameFltr.toLowerCase()) : true) &&
            (addressFltr ? item.address.toLowerCase().includes(addressFltr.toLowerCase()) : true) &&
            (zipFltr ? item.zipCode.includes(zipFltr) : true)
        );
    }

    // Fetch data (could be any data with name, address, and zip code)
    useEffect(() => {
        axios.get('/api/data')  // Adjust to your actual API endpoint
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Pagination logic
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredData = data.filter(filters);
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <main>
                <Stack spacing={10}>
                    <NavBar />

                    <Stack direction="row">
                        <FilterStack
                            nameFltr={nameFltr}
                            setNameFltr={setNameFltr}
                            addressFltr={addressFltr}
                            setAddressFltr={setAddressFltr}
                            zipFltr={zipFltr}
                            setZipFltr={setZipFltr}
                        />

                        <Grid container direction="row" spacing={2} display="flex" alignItems="center" justifyContent="left">
                            {currentItems.map((item, index) => (
                                <Grid item key={index}>
                                    <div>
                                        <h3>{item.name}</h3>
                                        <p>{item.address}</p>
                                        <p>{item.zipCode}</p>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>

                    <Stack sx={{ paddingBottom: 10 }} alignItems="center">
                        <Pagination count={totalPages} page={page} onChange={handlePageChange} />
                    </Stack>
                </Stack>
            </main>
        </>
    );
}
