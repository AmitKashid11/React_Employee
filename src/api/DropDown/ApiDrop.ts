import { IGetDropdownBody } from "src/interfaces/DropDown/IDrop";
import http from '../../requests/SchoolService/schoolServices';

const CountryListApi = () => {
    return http.post<IGetDropdownBody[]>('GetCountryList');
};

const StateListApi = (data: IGetDropdownBody) => {
    return http.post<IGetDropdownBody[]>('GetStateList', data);
};

const CityListApi = (data: IGetDropdownBody) => {
    return http.post<IGetDropdownBody[]>('GetCityList', data);
};

const DropApi = {
    CountryListApi,
    StateListApi,
    CityListApi
}

export default DropApi;