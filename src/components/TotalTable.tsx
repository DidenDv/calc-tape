import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
        marginTop: 20
    },
    table: {
        minWidth: 460,
    },
    cell: {
        fontWeight: 'bold',
    }
});

interface propsTotalTable {
    amountPerMount: number | string
    amountPerTape: number | string
    sum: number | string
}

export default function TotalTable({ amountPerMount, amountPerTape, sum }: propsTotalTable) {
    const classes = useStyles();

    return (
        <TableContainer className={classes.root} component={Paper}>
            <Table className={classes.table} aria-label="spanning table">
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>Цена за ленту</TableCell>
                        <TableCell align="right">{`${amountPerTape} грн`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Цена за крепление</TableCell>
                        <TableCell align="right">{`${amountPerMount} грн`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className={classes.cell}>Цена готового изделия</TableCell>
                        <TableCell className={classes.cell} align="right">{amountPerTape} + {amountPerMount}</TableCell>
                        <TableCell className={classes.cell} align="right">{`${sum} грн`}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
);
}
