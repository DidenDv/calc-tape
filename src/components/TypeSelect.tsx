import React, {useMemo} from 'react';
import uniqueId from 'lodash.uniqueid';
import {Container, FormControl, Grid, MenuItem, Select, Theme} from '@material-ui/core';
import {makeStyles, createStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            minWidth: 120,
            width: '100%'
        },
        title: {
          padding: "5px 0 10px",
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

interface PropsTypeSelect {
    handleChange: (event: React.ChangeEvent<{ name?: string, value: unknown }>) => void
    type: number | string
    id: string
    selectName: string
    labelId: string
    SelectTitle: string
    mainTitle: string
    dataItem: {
        price: number | string
        title: string
    }[]
}

export default function TypeSelect(
    { handleChange, type, dataItem, id, labelId, SelectTitle, selectName, mainTitle }: PropsTypeSelect) {
    const classes = useStyles();

    const getItemCollection = useMemo(
        () =>
            dataItem.map(item => {
                const { title, price } = item;
                const key = uniqueId();
                return price
                    ? <MenuItem key={key} value={price}>{title}</MenuItem>
                    : <MenuItem key={key} aria-label="None" value={price}><em>Ничего не выбрано</em></MenuItem>
            }),
        [dataItem]
    )

    return (
        <Container disableGutters>
            <Grid className={classes.title} container alignItems="flex-start">{mainTitle}</Grid>
            <FormControl className={classes.formControl}>
                <Select
                    value={type}
                    onChange={handleChange}
                    inputProps={{
                        name: selectName,
                        id: id,
                    }}
                >
                    {getItemCollection}
                </Select>
            </FormControl>
        </Container>
        )
    }
