import React, {useEffect, useState} from 'react';
import {Container, Grid, Typography, Button, Paper} from '@material-ui/core';
import TypeSelect from './components/TypeSelect';
import RangeSlider from "./components/RangeSlider";
import {dataMenuItem, dataMatchTapes, dataMount} from './helper/dataItem';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {getWidthTape} from "./helper/getWidthTape";
import {onMatchWidth} from "./helper/matchTape";
import {isMax} from "./helper/isMax";
import TotalTable from "./components/TotalTable";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: "20px",
            marginBottom: "20px",
        },
        formControl: {
            margin: theme.spacing(0),
            minWidth: 120,
        },
        subTitle: {
            fontSize: "16px",
            lineHeight: 1.5,
            margin: '10px 0',
        }
    }));

function App() {
    const classes = useStyles();

    const [type, setType] = useState<({ typeOfTape: number | string, typeOfMount: number | string })>({
        typeOfTape: 0,
        typeOfMount: 0,
    });

    const [heightRange, setHeightRange] = useState<number>(1.8);
    const [widthRange, setWidthRange] = useState<number>(0.6);

    const [price, setPrice] = useState<string>('');
    const [tape, setTape] = useState<string>('');

    const [amountPerTape, setAmountPerTape] = useState<number | string>(0);
    const [amountPerMount, setAmountPerMount] = useState<number | string>(0);
    const [sum, setSum] = useState<number | string>(0);

    const [countChange, setCountChange] = useState<boolean>(false);

    const onHandleHRange = (event: any, newValue: number | number[]): void => {
        setHeightRange(newValue as number);
    };

    const onHandleWRange = (event: any, newValue: number | number[]): void => {
        setWidthRange(newValue as number);
    };

    const handleChange = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        const name = event.target.name as keyof typeof type;

        setType({
            ...type,
            [name]: event.target.value as string,
        });
    };

    const { typeOfTape, typeOfMount } = type;
    const isDisabled = !!typeOfTape && !!typeOfMount;

    const getWidth = getWidthTape(typeOfTape);

    const getPrice = getWidth[0];
    const getTape = getWidth[1];

    useEffect(() => {
        if(getPrice) {
            setPrice(getPrice);
            setTape(getTape);
        }
    },[getWidth, getPrice, getTape]);

    const onReset = () => {
        setHeightRange(1.8);
        setWidthRange(0.6);
        setCountChange(false);
        setType({
            typeOfTape: 0,
            typeOfMount: 0,
        });
    };

    useEffect(() => {
        if (heightRange || widthRange || getPrice || getTape || typeOfMount) {
            setCountChange(false);
        }
    }, [heightRange, widthRange, getPrice, getTape, typeOfMount]);

    const payment = () => {
        const countOfTape = () => {
            const getDataMatchTape = onMatchWidth(dataMatchTapes, widthRange);
            const { twenty, thirty } = getDataMatchTape[0];
            return (!!tape) ? thirty : twenty;
        }

        const countMetres = () => {
            const count = countOfTape();
            return (heightRange*count).toFixed(2);
        }

        const countPriceOfTape = () => {
            const getCountMetres = countMetres();
            return (parseFloat(getCountMetres)*parseInt(price)).toFixed(2);
        }

        const countPriceOfMount = () => {
            // @ts-ignore
            return (typeOfMount*widthRange).toFixed(0);
        }

        const getCountPriceOfTape = countPriceOfTape();
        const getCountPriceOfMount = countPriceOfMount();
        const getCountSum = () => {
            return (parseFloat(getCountPriceOfTape) + parseInt(getCountPriceOfMount)).toFixed(2);
        }

        setAmountPerMount(getCountPriceOfMount);
        setAmountPerTape(getCountPriceOfTape);
        setSum(getCountSum);

        setCountChange(true);
    }

  return (
      <Container maxWidth="sm" className={classes.root}>
          <Paper elevation={2} style={{
              padding: 20
          }}>
            <Typography style={{marginBottom: 20}} variant="h4" component="h4">  Калькулятор расчета ленты </Typography>
            <Grid container spacing={1}>
              <Grid container spacing={5}>
                <Grid container item xs={12} md={6}>
                    <TypeSelect
                        mainTitle='Полотно (выбрать тип ленты)'
                        dataItem={dataMenuItem}
                        handleChange={handleChange}
                        type={type.typeOfTape}
                        id="typeOfTape"
                        labelId="typeOfTapeLabel"
                        SelectTitle="Type of tape"
                        selectName="typeOfTape"
                    />
                </Grid>
                <Grid container item xs={12} md={6}>
                    <TypeSelect
                        mainTitle='Тип крепления'
                        dataItem={dataMount}
                        handleChange={handleChange}
                        type={type.typeOfMount}
                        id="typeOfMount"
                        labelId="typeOfMountLabel"
                        SelectTitle="Type of mount"
                        selectName="typeOfMount"
                    />
                </Grid>
              </Grid>
              <Grid container spacing={5}>
                <Grid container item xs={12} md={6}>
                    <RangeSlider
                        title="Выберите высоту проема"
                        rangeStep={0.01}
                        rangeMax={4.5}
                        rangeMin={1.8}
                        rangeValue={heightRange}
                        rangeChange={onHandleHRange}
                        disabled={!isDisabled}
                    />
                </Grid>
                <Grid container item xs={12} md={6}>
                    <RangeSlider
                        title="Выберите ширину проема"
                        rangeStep={0.1}
                        rangeMax={isMax(tape)}
                        rangeMin={0.6}
                        rangeValue={widthRange}
                        rangeChange={onHandleWRange}
                        disabled={!isDisabled}
                    />
                </Grid>
              </Grid>
              <Grid container style={{marginTop: 20}}>
                <Grid item xs={12} md={6}>
                    <Button
                        disabled={!isDisabled}
                        style={{marginRight: 5}}
                        variant="contained"
                        color="primary"
                        onClick={payment}
                    >
                        Расчитать
                    </Button>
                    {isDisabled &&
                        <Button variant="contained" onClick={onReset}>
                            Сбросить
                        </Button>
                    }
                </Grid>
             </Grid>
                {countChange &&
                    <TotalTable
                        amountPerMount={amountPerMount}
                        amountPerTape={amountPerTape}
                        sum={sum}
                    />
                }
            </Grid>
          </Paper>
      </Container>
  );
}

export default App;
