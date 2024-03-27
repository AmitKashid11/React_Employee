import { createSlice } from "@reduxjs/toolkit";
import EnquiryApi from "src/api/Enquiry/ApiEnquiry";
import { AppThunk } from "src/store";


const Enquiryslice = createSlice({
    name: 'Enquiry',
    initialState: {
        Class: [],
        Loading: true

    },
    reducers: {
        getClass(state, action) {
            state.Loading = false;
            state.Class = action.payload;
        },
        getLoading(state, action) {
            state.Loading = true;
        }

    }

})

export const getClass =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(Enquiryslice.actions.getLoading(true));
            const response = await EnquiryApi.GetClassApi();
            const responseData = response.data.map((Item, i) => {
                return {
                    Id: Item.ClassID,
                    Name: Item.ClassName,
                    Value: Item.ClassID.toString()
                };
            });
            dispatch(Enquiryslice.actions.getClass(responseData));
        };

export default Enquiryslice.reducer;