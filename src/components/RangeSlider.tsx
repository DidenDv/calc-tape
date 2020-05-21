import React, { useMemo } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 300 + theme.spacing(3) * 2,
            padding: theme.spacing(0),
        },
        margin: {
            height: theme.spacing(3),
        },
    }),
);

interface PropsRangeSlider {
    title: string
    rangeStep: number
    rangeMax: number
    rangeMin: number
    rangeValue: number
    disabled: boolean
    setWidthRange?: any
    rangeChange: (event: any, newValue: number | number[]) => void
}

function valuetext(value: number) {
    return `${value} м`;
}

export default function RangeSlider(
    { title, rangeStep, rangeMax, rangeMin, rangeValue, rangeChange, disabled }: PropsRangeSlider) {
    const classes = useStyles();

    const renderSlider = useMemo(() =>
        <Slider
            aria-label={title}
            value={rangeValue}
            max={rangeMax}
            min={rangeMin}
            disabled={disabled}
            valueLabelDisplay="auto"
            onChange={rangeChange}
            step={rangeStep}
            getAriaValueText={valuetext}
        />
    ,[title, rangeStep, rangeMax, rangeMin, rangeValue, rangeChange, disabled])

    return (
        <div className={classes.root}>
            <div className={classes.margin} />
                <Typography gutterBottom>{title}</Typography>
                {renderSlider}
                {`${rangeValue} м`}
                <div className={classes.margin} />
        </div>
    );
};
