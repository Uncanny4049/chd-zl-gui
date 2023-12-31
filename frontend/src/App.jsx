import './App.css';
import '@fontsource/roboto/300.css';
import React, {useEffect, useState} from "react";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {Container, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import dayjs from "dayjs";
import View from "./components/View.jsx";
import {GetAllRole} from "../wailsjs/go/backend/App.js";


function App() {
    const [role, setRole] = useState(['']);
    const [roleNow, setRoleNow] = useState('')
    const [date, setDate] = useState()

    const updateDate = (s)=>{
        return dayjs(s).add(8,"hour")
    }
    useEffect(() => {
        setDate(updateDate(undefined))
        GetAllRole().then((t) => {
            setRole(t)
            setRoleNow(t[0])
        })
    }, [])
    const handleChange = (event) => {
        setRoleNow(event.target.value);
    };

    return (
        <Container maxWidth={"100%"}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker defaultValue={dayjs(date)}
                                    format="YYYY-MM-DD"
                                    onChange={(newValue) => {
                                        setDate(updateDate(newValue) )
                                    }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">角色</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={roleNow}
                            label="Accoumt"
                            onChange={handleChange}
                        >
                            {role.map(k => <MenuItem value={`${k}`}>{k}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>

                </Grid>
            </Grid>
            <hr/>
            <Grid container>
                <Grid item xs={12}>
                    {date && roleNow && <View date={date} role={roleNow}/>}
                </Grid>
            </Grid>
        </Container>
    )
}

export default App
