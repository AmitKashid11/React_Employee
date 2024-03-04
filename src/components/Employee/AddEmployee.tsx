import { Container, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-toastify'
import ButtonField from "src/libraries/Training/ButtonField"
import CalendarField from "src/libraries/Training/CalendarField"
import Dropdown from "src/libraries/Training/Dropdown"
import InputField from "src/libraries/Training/InputField"
import RadioList from "src/libraries/Training/RadioList"
import PageHeader from "src/libraries/heading/PageHeader"

import { IAddEmployeeBody, IGetEmployeeDetailsBody } from "src/interfaces/Employee/IEmployee"
import {
    AddEmployeeDetails, getDesignationList,
    getEmployeeDetails,
    resetAddEmployeeDetails
} from "src/requests/Employee/RequestEmployee"

import { RootState } from 'src/store'
import { IsEmailValid, IsPhoneNoValid, getCalendarFormat } from "../Common/Util"

import { useParams } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {
    const navigate = useNavigate();


    const { Id } = useParams();

    const dispatch = useDispatch();

    const [EmployeeName, setEmployeeName] = useState('')
    const [BirthDate, setBirthDate] = useState('')
    const [EmailId, setEmailId] = useState('')
    const [PhoneNo, setPhoneNo] = useState('');
    const [GenderList, setGenderList] = useState([
        { Id: 1, Name: 'Male', Value: "1" },
        { Id: 2, Name: 'FeMale', Value: "2" }
    ])
    const [Gender, setGender] = useState('0')
    const [DesignationId, setDesignationId] = useState('0')

    const [EmployeeErrorMessage, setEmployeeErrorMessage] = useState('')
    const [BirthDateErrorMessage, setBirthDateErrorMessage] = useState('')
    const [EmailIdErrorMessage, setEmailIdErrorMessage] = useState('')
    const [PhoneNoErrorMessage, setPhoneNoErrorMessage] = useState('')
    const [GenderErrorMessage, setGenderErrorMessage] = useState('')

    const DesignationList = useSelector((state: RootState) => state.Employee.DesignationList);
    const AddEmployeeMsg = useSelector((state: RootState) => state.Employee.AddEmployeeMsg);
    const EmployeeDetails = useSelector((state: RootState) => state.Employee.EmployeeDetails);


    useEffect(() => {
        if (EmployeeDetails != null) {
            setEmployeeName(EmployeeDetails.EmployeeName)
            setBirthDate(getCalendarFormat(EmployeeDetails.BirthDate))
            setGender(EmployeeDetails.Gender)
            setPhoneNo(EmployeeDetails.PhoneNo)
            setDesignationId(EmployeeDetails.DesignationId)
            setEmailId(EmployeeDetails.EmailId)
        }
    }, [EmployeeDetails])

    useEffect(() => {
        dispatch(getDesignationList())
        const GetEmployeeDetailsBody: IGetEmployeeDetailsBody = {
            ID: Number(Id)
        }
        dispatch(getEmployeeDetails(GetEmployeeDetailsBody))

    }, [])


    useEffect(() => {
        if (AddEmployeeMsg != "") {
            toast.success(AddEmployeeMsg)
            dispatch(resetAddEmployeeDetails())
            navigate("../../EmployeeList")
        }
    }, [AddEmployeeMsg])

    const clickEmployeeName = (value) => {
        setEmployeeName(value)
    }
    const clickBirthDate = (value) => {
        setBirthDate(value)
    }
    const clickDesignation = (value) => {
        setDesignationId(value)
    }
    const clickEmailId = (value) => {
        setEmailId(value)
    }
    const clickGender = (value) => {
        setGender(value)
    }
    const clickPhoneNo = (value) => {
        // true if its a number, false if not & cannot enter more than 10 digit
        if (!isNaN(+value) && value.length < 11)
            setPhoneNo(value)
    }
    const BlurEmailId = () => {
        setEmailIdErrorMessage(IsEmailValid(EmailId))
    }
    const BlurPhoneNo = () => {
        setPhoneNoErrorMessage(IsPhoneNoValid(PhoneNo))
    }

    const IsFormValid = () => {
        let returnVal = true
        if (EmployeeName == "") {
            setEmployeeErrorMessage("Field is mandatory")
            returnVal = false
        }
        if (EmailIdErrorMessage != "" && EmailId == "") {
            setEmailIdErrorMessage("Field is mandatory")
            returnVal = false
        }
        if (PhoneNoErrorMessage != "" && PhoneNo == "") {
            setPhoneNoErrorMessage("Field is mandatory")
            returnVal = false
        }
        if (Gender == "0") {
            setGenderErrorMessage("Field is mandatory")
            returnVal = false
        }
        if (BirthDate == "") {
            setBirthDateErrorMessage("Field is mandatory")
            returnVal = false
        }
        return returnVal
    }
    const clickSubmit = () => {
        if (IsFormValid()) {
            const AddEmployeeBody: IAddEmployeeBody = {
                ID: Id == undefined ? 0 : Number(Id),
                EmployeeName: EmployeeName,
                BirthDate: BirthDate,
                DesignationId: Number(DesignationId),
                Gender: Number(Gender),
                EmailId: EmailId,
                PhoneNo: PhoneNo,
                DesignationName: "",
                DID: 0,

            }
            dispatch(AddEmployeeDetails(AddEmployeeBody))
        }
    }

    return (
        <Container>
            <Grid container direction="column" alignItems="center" justifyContent="center">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PageHeader heading={'Add Employee'} subheading={''} />
                    </Grid>
                    <Grid item xs={12}>
                        <InputField Item={EmployeeName} Label={'Employee Name'}
                            ClickItem={clickEmployeeName}
                            ErrorMessage={EmployeeErrorMessage} />
                    </Grid>
                    <Grid item xs={12}>
                        <CalendarField Item={BirthDate} Label={'Birth Date'}
                            ClickItem={clickBirthDate}
                            ErrorMessage={BirthDateErrorMessage} />
                    </Grid>
                    <Grid item xs={12}>
                        <Dropdown ItemList={DesignationList} Label={'Designation'} DefaultValue={DesignationId}
                            ClickItem={clickDesignation} />
                    </Grid>
                    <Grid item xs={12}>
                        <InputField Item={EmailId} Label={'Email Id'}
                            ClickItem={clickEmailId} BlurItem={BlurEmailId}
                            ErrorMessage={EmailIdErrorMessage} />
                    </Grid>
                    <Grid item xs={12}>
                        <InputField Item={PhoneNo} Label={'MobileNo'}
                            ClickItem={clickPhoneNo} BlurItem={BlurPhoneNo}
                            ErrorMessage={PhoneNoErrorMessage}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <RadioList ItemList={GenderList} Label={'Gender'} DefaultValue={Gender}
                            ClickItem={clickGender}
                            ErrorMessage={GenderErrorMessage} />
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonField Label={'Submit'} ClickItem={clickSubmit} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default AddEmployee