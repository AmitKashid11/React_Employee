import { createSlice } from "@reduxjs/toolkit";
import DropApi from "src/api/DropDown/ApiDrop";
import { IGetDropdownBody } from "src/interfaces/DropDown/IDrop";
import { AppThunk } from "src/store";



const Dropslice = createSlice({
    name: 'Drop',
    initialState: {
        CountryList: [],
        StateList: [],
        CityList: [],
        Loading: true

    },
    reducers: {
        getCountryList(state, action) {
            state.Loading = false;
            state.CountryList = action.payload;
        },
        getStateList(state, action) {
            state.Loading = false;
            state.StateList = action.payload;
        },
        getCityList(state, action) {
            state.Loading = false;
            state.CityList = action.payload;
        },
        getLoading(state, action) {
            state.Loading = true;
        },


    }
});

export const getCountryList =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(Dropslice.actions.getLoading(true));
            const response = await DropApi.CountryListApi();
            const responseData = response.data.map((Item, i) => {
                return {
                    Id: Item.country_id,
                    Name: Item.country_name,
                    Value: Item.country_id.toString()
                };
            });
            dispatch(Dropslice.actions.getCountryList(responseData));
        };
export const getStateList =
    (data: IGetDropdownBody): AppThunk =>
        async (dispatch) => {
            dispatch(Dropslice.actions.getLoading(true));
            const response = await DropApi.StateListApi(data);
            const responseData = response.data.map((Item, i) => {
                return {
                    Id: Item.state_id,
                    Name: Item.state_name,
                    Value: Item.state_id.toString()
                };
            });
            dispatch(Dropslice.actions.getStateList(responseData));
        };

export const getCityList =
    (data: IGetDropdownBody): AppThunk =>
        async (dispatch) => {
            dispatch(Dropslice.actions.getLoading(true));
            const response = await DropApi.CityListApi(data);
            const responseData = response.data.map((Item, i) => {
                return {
                    Id: Item.city_id,
                    Name: Item.city_name,
                    Value: Item.city_id.toString()
                };
            });
            dispatch(Dropslice.actions.getCityList(responseData));
        };


export default Dropslice.reducer;