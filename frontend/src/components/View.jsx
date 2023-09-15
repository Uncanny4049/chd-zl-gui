import '@fontsource/roboto/300.css';
import React, {useEffect, useState} from "react";
import SendIcon from '@mui/icons-material/Send';
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {GetCopyByDate} from "../../wailsjs/go/main/App.js";
import {Button, Grid, styled, TableHead, TableRow} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';


const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    }, '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const SToStr = (t) => {
    if (Math.floor(t / 3600) > 0) {
        //小时
        let h = Math.floor(t / 3600)
        let m = Math.floor(t % 3600 / 60)
        let s = t % 3600 % 60
        return `${h}小时 ${m}分钟 ${s.toFixed(0)}秒`
    } else if (Math.floor(t / 60) > 0) {
        // 分钟
        let m = Math.floor(t / 60)
        let s = t % 60
        return `${m}分钟 ${s.toFixed(0)}秒`
    } else {
        return `${t}秒`
    }
}

const DToStr = (dateString) => {
    console.log(dateString)
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export default function View({date, role}) {
    const [dataGridData, setDataGridData] = useState([])
    const [dataGridFilterModel, setDataGridFilterModel] = useState({
        items: [{
            field: 'actual', operator: 'isNotEmpty', value: 'Category A', // 默认的筛选条件
        },],
    });
    const [dialogStatus, setDialogStatus] = React.useState(false);
    const [dialogData, setDialogData] = React.useState();


    const handleClickOpen = (Id) => {
        setDialogStatus(true);
        setDialogData(dataGridData.filter(k => k.Id === Id)[0])
    };
    const handleClose = () => {
        setDialogStatus(false);
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
            filterModel={dataGridFilterModel}
            onFilterModelChange={(model) => setDataGridFilterModel(model)}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
                toolbar: {
                    showQuickFilter: true,
                },
            }}
        />
        {dialogData && <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            fullWidth={true}
            maxWidth={"md"}
            open={dialogStatus}
        >
            <DialogTitle id="customized-dialog-title">
                {dialogData.copyName}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500],
                }}
            />
            <DialogContent dividers={scroll === 'paper'}>
                <Box sx={{width: '100%'}}>
                    <Stack spacing={2}>

                        <Typography variant="button" display="block" gutterBottom>
                            {`开始时间：${DToStr(dialogData.startTime)}`}
                        </Typography>
                        <Typography variant="button" display="block" gutterBottom>
                            {`结束时间：${DToStr(dialogData.endTime)}`}
                        </Typography>
                        <Typography variant="button" display="block" gutterBottom>
                            {`耗时 ：${SToStr(dialogData.timeConsuming)}`}
                        </Typography>
                        <Typography variant="button" display="block" gutterBottom>
                            {`平均时间 ${SToStr(dialogData.timeConsuming / dialogData.actual)}`}
                        </Typography>
                        <Typography variant="button" display="block" gutterBottom>
                            <Grid container spacing={1}>
                                {Array.from([dialogData.type1, dialogData.type2, dialogData.type3, dialogData.type4])
                                    .map((k, i) => (
                                        <Grid item xs={6}>
                                            <TableContainer component={Paper}>
                                                <Table size="small" aria-label="a dense table">
                                                    <TableHead>
                                                        {
                                                            i !== 3 && <TableRow>
                                                                <TableCell align="left">序号</TableCell>
                                                                <TableCell align="right">
                                                                    {i === 0 && '死亡地图'}
                                                                    {i === 1 && '掉线重连'}
                                                                    {i === 2 && '激活图鉴'}
                                                                </TableCell>
                                                            </TableRow>
                                                        }
                                                        {
                                                            i == 3 && <TableRow>
                                                                <TableCell align="left">获得道具</TableCell>
                                                                <TableCell align="right">数量</TableCell>
                                                            </TableRow>
                                                        }
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            Object.keys(k).map((key) => (<TableRow key={key}
                                                                                                   sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                                <TableCell align="left">{key}</TableCell>
                                                                <TableCell align="right">{k[key]}</TableCell>
                                                            </TableRow>))
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                    ))}

                            </Grid>
                        </Typography>
                    </Stack>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>{'关闭'}</Button>
            </DialogActions>
        </BootstrapDialog>}
    </>)
}