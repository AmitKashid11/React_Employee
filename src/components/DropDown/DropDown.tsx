import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IGetDropdownBody } from 'src/interfaces/DropDown/IDrop';
import ButtonField from "src/libraries/Training/ButtonField";
import Dropdown from "src/libraries/Training/Dropdown";
import PageHeader from "src/libraries/heading/PageHeader";
import { getCityList, getCountryList, getStateList } from "src/requests/DropDown/RequestDrop";
import { RootState } from "src/store";

const DropDown = () => {

    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');

    const countryList = useSelector((state: RootState) => state.Drop.CountryList);
    const stateList = useSelector((state: RootState) => state.Drop.StateList);
    const cityList = useSelector((state: RootState) => state.Drop.CityList);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountryList())
    }, [])


    useEffect(() => {
        if (country !== '') {
            const IGetDropdownBody: IGetDropdownBody = {
                country_id: Number(country)
            }
            dispatch(getStateList(IGetDropdownBody))
        }
    }, [country])


    useEffect(() => {
        if (state !== '') {
            const IGetDropdownBody: IGetDropdownBody = {
                state_id: Number(state)
            }
            dispatch(getCityList(IGetDropdownBody))
        }
    }, [state])

    const ClearFormFields = () => {
        setCountry('')
        setState('')
        setCity('')
    }
    const clickCountry = (value) => {
        setCountry(value)
    }

    const clickState = (value) => {
        setState(value)
    }

    const clickCity = (value) => {
        setCity(value)
    }
    const clickSubmit = (value) => {
        alert('Data Submitted Successfully !')
        ClearFormFields();

    }
    return (
        <Container >
            <Grid container direction="column" alignItems="center" justifyContent="center">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PageHeader heading='Dropdown Task' />
                    </Grid>
                    <Grid item xs={12}>
                        <Dropdown ItemList={countryList} Label={'Country List'}
                            DefaultValue={country}
                            ClickItem={clickCountry}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {country && (
                            <Dropdown ItemList={stateList} Label={'State List'}
                                DefaultValue={state}
                                ClickItem={clickState}
                            />
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        {state && (
                            <>
                                <Dropdown ItemList={cityList} Label={'City List'}
                                    DefaultValue={city}
                                    ClickItem={clickCity}
                                /> <br /><br />
                                <ButtonField Label={'Submit'} ClickItem={clickSubmit} />

                            </>

                        )}

                    </Grid>


                </Grid>
            </Grid>
        </Container>
    )
}

export default DropDown