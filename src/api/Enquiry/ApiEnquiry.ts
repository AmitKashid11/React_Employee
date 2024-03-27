import { IAddStudentBody } from "src/interfaces/Enquiry/IEnquiry";
import http from '../../requests/SchoolService/schoolServices';

const GetClassApi = () => {
    return http.post<IAddStudentBody[]>('GetClass');
};

const EnquiryApi = {
    GetClassApi
}
export default EnquiryApi;