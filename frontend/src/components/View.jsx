import '@fontsource/roboto/300.css';
import React, {useEffect, useState} from "react";
import SendIcon from '@mui/icons-material/Send';
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {GetCopyByDate} from "../../wailsjs/go/backend/App.js";
import {Button} from "@mui/material";
import Info from "./Info.jsx";
import {DateFunc, SToStr} from "./util.js";


export default function View({date, role}) {
    const [dataGridData, setDataGridData] = useState([])
    const [dialogStatus, setDialogStatus] = useState(false);
    const [dialogData, setDialogData] = React.useState();


    const handleClickOpen = (Id) => {
        setDialogStatus(true);
        setDialogData(dataGridData.filter(k => k.Id === Id)[0])
    };


    const columns = [
        {field: 'copyName', headerName: '副本名称', width: 300},
        {field: 'status', headerName: '状态', width: 200},
        {field: 'actual', headerName: '次数', width: 200},
        {
            field: 'startTime',
            headerName: '开始时间',
            width: 200,
            valueGetter: (params) => DateFunc(params.row.startTime)
        },
        {
            field: 'endTime',
            headerName: '结束时间',
            width: 200,
            valueGetter: (params) => DateFunc(params.row.endTime)
        }, {
            field: 'timeConsuming', headerName: "耗时", width: 100, valueGetter: (params) => {
                return SToStr(params.row.timeConsuming)
            }
        }, {
            field: "other", headerName: "D/R/A", width: 200, valueGetter: (params) => {
                return params.row.type1.length + "/" + params.row.type2.length + "/" + params.row.type3.length
            },
        }, {
            field: 'actions', // 按钮列的字段名
            headerName: '操作', width: 120, sortable: false, // 禁止排序
            renderCell: (params) => {
                return (<div>
                    <Button variant="contained" color="secondary" endIcon={<SendIcon/>} size="small"
                            onClick={() => {
                                handleClickOpen(params.row.Id)
                            }}>Detail</Button>
                </div>);
            },
        },]


    useEffect(function () {
        GetCopyByDate(role, date).then(t2 => {
            setDataGridData(t2)
        })
    }, [role, date])
    return (<>
        <DataGrid
            rows={dataGridData}
            getRowId={(row) => row.Id}
            columns={columns}
            slots={{toolbar: GridToolbar}}
            slotProps={{
                toolbar: {
                    showQuickFilter: true,
                },
            }}
        />
        {dialogData && <Info dialogData={dialogData} dialogStatus={dialogStatus} setDialogStatus={setDialogStatus}/>}
    </>)
}