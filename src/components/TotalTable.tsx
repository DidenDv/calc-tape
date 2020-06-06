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
            <Table aria-label="spanning table">
                <TableBody>
                    <TableRow>
                        <TableCell>Цена за ленту</TableCell>
                        <TableCell
                            style={{
                            whiteSpace: "nowrap"
                        }}
                            align="right">{`${amountPerTape} грн`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Цена за крепление</TableCell>
                        <TableCell style={{
                            whiteSpace: "nowrap"
                        }} align="right">{`${amountPerMount} грн`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{
                            fontWeight: 'bold'
                        }}>Цена готового изделия</TableCell>
                        <TableCell style={{
                            fontWeight: 'bold',
                            whiteSpace: "nowrap"
                        }} align="right">{`${sum} грн`}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
);
}
