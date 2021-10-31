import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { styled } from '@mui/material/styles';

export default function SocialSearchBar({ width, search, setSearch, submitSearch }) {
    return (
        <Paper sx={{
            padding: '4px 4px',
            margin: '0 4px',
            display: 'flex',
            alignItems: 'center'
        }}>
            <InputBase
                placeholder="Pesquisar..."
                inputProps={{ 'aria-label': 'search' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onSubmit={(e) => {
                    e.preventDefault();
                    submitSearch(search);
                }}
            />
            <IconButton aria-label="search" onClick={(e) => {
                e.preventDefault();
                submitSearch(search);
            }}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
