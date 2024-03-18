
import { Container, Grid } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState } from "react";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IAddTaskBody, IGetTaskDetailsBody } from "src/interfaces/Task/ITask";
import ButtonField from "src/libraries/Training/ButtonField";
import Dropdown from "src/libraries/Training/Dropdown";
import InputField from "src/libraries/Training/InputField";
import RadioList from "src/libraries/Training/RadioList";
import PageHeader from "src/libraries/heading/PageHeader";
import { AddTaskDetails, getTaskDetails, getTaskSubjectList, getTaskTypeList, getTasksList, resetAddTaskDetails } from "src/requests/Task/RequestTask";
import { RootState } from "src/store";
import TaskList from "./TaskList";

function AddTask() {
    // const { Id } = useParams();
    const [Id, setId] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [TaskName, setTaskName] = useState('')
    // const [TaskTypeList, setTaskTypeList] = useState([ 
    //     { Id: 1, Name: 'Learning', Value: "1" }, 
    //     { Id: 2, Name: 'Discussion', Value: "2" }, 
    //     { Id: 3, Name: 'Practice', Value: "3" }, 
    //     { Id: 4, Name: 'Assignment', Value: "4" } 
    // ]) 
    const [TaskTime, setTaskTime] = useState('')
    const [TaskTypeId, setTaskTypeId] = useState('')

    // const [TaskSubjectList, setTaskSubjectList] = useState([ 
    //     { Id: 1, Name: 'SQL', Value: "1" }, 
    //     { Id: 2, Name: 'React', Value: "2" }, 
    //     { Id: 3, Name: 'ASP.NET', Value: "3" }, 
    // ]) 
    const [TaskSubjectId, setTaskSubjectId] = useState('')
    const [Reminder, setReminder] = useState(true);

    const [TaskErrorMessage, setTaskErrorMessage] = useState('')
    const [TaskTimeErrorMessage, setTaskTimeErrorMessage] = useState('')

    const TaskTypeList = useSelector((state: RootState) => state.Task.TaskTypeList);

    const TaskSubjectList = useSelector((state: RootState) => state.Task.TaskSubjectList);

    const AddTaskMsg = useSelector((state: RootState) => state.Task.AddTaskMsg);
    // console.log("AddTask", AddTaskMsg)

    const TaskDetails = useSelector((state: RootState) => state.Task.TaskDetails);
    console.log("TaskDetails", TaskDetails)

    // useEffect(() => {
    //     dispatch(getTaskTypeList())
    // }, [])                          /// API call to Task Type List 

    useEffect(() => {
        if (TaskDetails != null) {
            setTaskSubjectId(TaskDetails.TaskSubjectId)
            setTaskName(TaskDetails.TaskName)
            setTaskTime(TaskDetails.TaskTime)
            setTaskTypeId(TaskDetails.TaskTypeId)
            setReminder(TaskDetails.Reminder)
        }
    }, [TaskDetails])               /// to retrieve data on AddTask page in proper place

    useEffect(() => {
        dispatch(getTaskSubjectList())   /// API call to Task Subject List 
        dispatch(getTaskTypeList())      /// API call to Task Type List
        if (Id != undefined) {
            const GetTaskDetailsBody: IGetTaskDetailsBody = {
                ID: Number(Id)
            }
            dispatch(getTaskDetails(GetTaskDetailsBody))
        }
    }, [Id])

    // useEffect(() => {
    //     dispatch(AddTaskDetails(AddTaskBody))
    // }, [])

    useEffect(() => {
        if (AddTaskMsg !== '') {
            toast.success(AddTaskMsg)
            dispatch(resetAddTaskDetails())
            // navigate("../../TaskList")
            dispatch(getTasksList())
        }
    }, [AddTaskMsg])

    const clickTaskSubject = (value) => {
        setTaskSubjectId(value)
    }
    const clickTaskName = (value) => {
        setTaskName(value)
    }
    const clickTaskTime = (value) => {
        setTaskTime(value)
    }
    const clickTaskType = (value) => {
        setTaskTypeId(value)
    }


    const checkSetReminder = (event) => {
        setReminder(event.target.checked);
    };

    const clickTaskList = (value) => {
        setId(value)
    }

    const IsFormValid = () => {
        let returnVal = true
        if (TaskName == "") {
            setTaskErrorMessage("Field is mandatory")
            returnVal = false
        }

        if (TaskTime == "") {
            setTaskTimeErrorMessage("Choose the date")
            returnVal = false
        }
        return returnVal
    }

    const clickSave = () => {
        if (IsFormValid()) {
            const AddTaskBody: IAddTaskBody = {
                ID: Id == undefined ? 0 : Number(Id),
                TaskSubjectId: Number(TaskSubjectId),
                TaskName: TaskName,
                Tasktime: TaskTime,
                TaskTypeId: Number(TaskTypeId),
                IsReminder: Reminder,
                TaskSubjectName: "",
                TaskTypeName: ""
            }
            dispatch(AddTaskDetails(AddTaskBody))
        }
    }

    const clickCancel = () => {
        setTaskSubjectId('');
        setTaskName('');
        setTaskTime('');
        setTaskTypeId('');
        setReminder(false);
    }
    console.log(clickCancel)

    return (
        <Container >
            <Grid container direction="column"
                alignItems="center"
                justifyContent="center">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PageHeader heading={'Task Form'} subheading={''} />
                    </Grid>
                    <Grid item xs={12}>
                        <RadioList ItemList={TaskSubjectList} Label={'Task Subject'}
                            DefaultValue={TaskSubjectId}
                            ClickItem={clickTaskSubject}
                            ErrorMessage=""
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputField Item={TaskName} Label={'Task Name'}
                            ClickItem={clickTaskName} ErrorMessage={TaskErrorMessage} />
                    </Grid>
                    <Grid item xs={12} >
                        <FormControlLabel
                            label="Date & Time : " labelPlacement='top'
                            control={<Datetime value={TaskTime} onChange={clickTaskTime} />}
                        />
                    </Grid>
                    <Grid item xs={20}>
                        <Dropdown ItemList={TaskTypeList} Label={'Task Type'}
                            DefaultValue={TaskTypeId}
                            ClickItem={clickTaskType} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox checked={Reminder} onChange={checkSetReminder} />}
                            label="Set Reminder"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonField Label={'Save'} ClickItem={clickSave} />&nbsp;&nbsp;
                        <ButtonField Label={'Cancel'} ClickItem={clickCancel} />
                    </Grid>
                    <Grid item xs={20}>
                        <TaskList ClickItemList={clickTaskList} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default AddTask