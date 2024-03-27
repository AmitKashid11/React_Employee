import { Container, Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Dropdown from "src/libraries/Training/Dropdown"
import PageHeader from "src/libraries/heading/PageHeader"
import { getClass } from "src/requests/Enquiry/RequestEnquiry"
import { RootState } from "src/store"
const AddEnquiry = () => {
    const dispatch = useDispatch();
    const [ClassID, setClassID] = useState('0')

    useEffect(() => {
        dispatch(getClass())
    }, [])

    const Class = useSelector((state: RootState) => state.Enquiry.Class);
    const clickClass = (value) => {
        setClassID(value)
    }

    return (
        <Container>
            <Grid container direction="column" alignItems="center" justifyContent="center">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PageHeader heading={'Enquiry Form'} subheading={''} />
                    </Grid>
                    <Grid item xs={12}>
                        <Dropdown ItemList={Class} Label={'Class'} DefaultValue={ClassID}
                            ClickItem={clickClass} />
                    </Grid>

                </Grid>
            </Grid>
        </Container>
    )
}

export default AddEnquiry