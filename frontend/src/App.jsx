import './App.css';
import '@fontsource/roboto/300.css';
import {useEffect, useState} from "react";
import {GetAllRole, GetCopyByDate} from "../wailsjs/go/main/App.js";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {Container, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import dayjs from "dayjs";

const columns = [
    {field: 'copyName', headerName: '副本名称', width: 300},
    {field: 'status', headerName: '状态', width: 150},
    {field: 'actual', headerName: '次数', width: 150},
    {field: 'startTime', headerName: '开始时间', width: 200, valueGetter: (params) => DateFunc(params.row.startTime),},
    {field: 'endTime', headerName: '结束时间', width: 200, valueGetter: (params) => DateFunc(params.row.endTime)},
    {
        field: 'timeConsuming', headerName: "耗时", width: 100, valueGetter: (params) => {
            let t = params.row.timeConsuming;
            if (Math.floor(t / 3600) > 0) {
                //小时
                let h = Math.floor(t / 3600)
                let m = Math.floor(t % 3600 / 60)
                let s = t % 3600 % 60
                return `${h}H${m}m${s}s`
            } else if (Math.floor(t / 60) > 0) {
                // 分钟
                let m = Math.floor(t / 60)
                let s = t % 60
                return `${m}m${s}s`
            } else {
                return `${t}s`
            }
        }
    },
    {
        field: "other", headerName: "S/R/A", width: 150,
        valueGetter: (params) => {
            return params.row.type1.length + "/" + params.row.type2.length + "/" + params.row.type3.length
        },
    }

]
const DateFunc = (str) => {
    const startTime = new Date(str);
    if (!isNaN(startTime.getTime())) {
        const year = startTime.getFullYear();
        const month = String(startTime.getMonth() + 1).padStart(2, '0');
        const day = String(startTime.getDate()).padStart(2, '0');
        const hours = String(startTime.getHours()).padStart(2, '0');
        const minutes = String(startTime.getMinutes()).padStart(2, '0');
        const seconds = String(startTime.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    return str
}

function App() {
    const [role, setRole] = useState(['']);
    const [roleNow, setRoleNow] = useState('')
    const [rows, setRows] = useState([])
    const [filterModel, setFilterModel] = useState({
        items: [
            {
                field: 'actual',
                operator: 'isNotEmpty',
                value: 'Category A', // 默认的筛选条件
            },
        ],
    });
    const [date, setDate] = useState()

    useEffect(function () {
        setDate(pre => {
            const currentDate = new Date();
            return dayjs(currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + "-" + currentDate.getDate())
        })
        GetAllRole().then((t) => {
            setRole(t)
            setRoleNow(t[0])
            GetCopyByDate(t[0], date)
                .then(t2 => {
                    setRows(pre => t2)
                })
        })
    }, [])
    const handleChange = (event) => {
        setRoleNow(event.target.value);
        GetCopyByDate(event.target.value, date)
            .then(t2 => setRows(t2));
    };

    return (
        <Container maxWidth={"100%"}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker defaultValue={dayjs(date)}
                                    format="YYYY-MM-DD"
                                    onChange={(newValue) => {
                                        setDate(pre => {
                                            GetCopyByDate(roleNow, newValue.toISOString())
                                                .then(t2 => {
                                                    setRows(pre => t2)
                                                })
                                            return newValue
                                        })
                                    }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={roleNow}
                            label="Age"
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
            <Grid container fixed>
                <Grid xs={12}>
                    <DataGrid
                        rows={rows}
                        getRowId={(row) => row.Id}
                        columns={columns}
                        filterModel={filterModel}
                        onFilterModelChange={(model) => setFilterModel(model)}
                        slots={{
                            toolbar: GridToolbar,
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

export default App
