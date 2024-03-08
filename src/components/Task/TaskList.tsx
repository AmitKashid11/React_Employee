import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Container, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IGetTaskDetailsBody } from 'src/interfaces/Task/ITask';
import DynamicList from 'src/libraries/Training/DynamicList';
import PageHeader from 'src/libraries/heading/PageHeader';
import { deleteTaskDetails, getTasksList, resetDeleteTaskDetails } from 'src/requests/Task/RequestTask';
import { RootState } from 'src/store';


const TaskList = ({ ClickItemList }) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const TasksList = useSelector((state: RootState) => state.Task.TasksList);

    const DeleteTaskDetailsMsg = useSelector((state: RootState) => state.Task.DeleteTaskDetailsMsg);

    const HeaderList = ["TaskSubject", "TaskName", "Day&Time", "TaskType", "Edit", "Delete"]
    const IconList = [
        { Id: 1, Icon: <EditIcon />, Action: 'Edit' },
        { Id: 2, Icon: <DeleteIcon />, Action: 'Delete' },
    ];

    useEffect(() => {
        dispatch(getTasksList())
    }, [])

    useEffect(() => {
        if (DeleteTaskDetailsMsg !== '') {
            toast.success(DeleteTaskDetailsMsg);
            dispatch(resetDeleteTaskDetails())
            dispatch(getTasksList())
        }
    }, [DeleteTaskDetailsMsg])

    const ClickItem = (value) => {
        if (value.Action == 'Delete') {
            const message = `Are you sure, you want to delete employee with ID ${value.Id}?`;
            if (confirm(message)) {
                const GetTaskDetailsBody: IGetTaskDetailsBody = {
                    ID: value.Id
                }
                dispatch(deleteTaskDetails(GetTaskDetailsBody))
            }
        }
        if (value.Action == 'Edit') {
            // navigate('../AddTask/' + value.Id)
            ClickItemList(value.Id)
        }
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PageHeader heading={'Task List'} subheading={''} />
                </Grid>
                <Grid item xs={12}>
                    <DynamicList HeaderList={HeaderList} ItemList={TasksList}
                        IconList={IconList} ClickItem={ClickItem} />
                </Grid>
            </Grid>
        </Container >
    )
}

export default TaskList