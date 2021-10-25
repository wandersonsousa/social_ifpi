import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


import { useTheme } from '@mui/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';

const PREFIX = 'SocialSearchBar';
const classes = {
    root: `${PREFIX}-root`,
    cta: `${PREFIX}-cta`,
    content: `${PREFIX}-content`,
}
const Root = styled('div')(({ theme }) => ({
    [`&.${classes.root}`]: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: ({ width }) => width || 300,
    },
    [`& .${classes.input}`]: {
        marginLeft: theme.spacing(1),
        flex: 1
    },
    [`& .${classes.iconButton}`]: {
        padding: 10,
    },
    [`& .${classes.divider}`]: {
        height: 28,
        margin: 4,
    },
}))



export default function SocialSearchBar({ width, search, setSearch, submitSearch }) {
    return (
        <Root width={width}>
            <Paper className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder="Pesquisar..."
                    inputProps={{ 'aria-label': 'search' }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitSearch(search);
                    }}
                />
                <IconButton className={classes.iconButton} aria-label="search" onClick={(e) => {
                    e.preventDefault();
                    submitSearch(search);
                }}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Root>
    );
}