import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {Button, styled, TableHead, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import DialogActions from "@mui/material/DialogActions";
import React from "react";
import Dialog from "@mui/material/Dialog";
import {DateFunc, SToStr} from "./util.js";
import Masonry from 'react-masonry-css';

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    }, '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


export default function Info({dialogStatus, setDialogStatus, dialogData}) {
    const handleClose = () => {
        setDialogStatus(false);
    };
    return (<BootstrapDialog
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
                        {`开始时间：${DateFunc(dialogData.startTime)}`}
                    </Typography>
                    <Typography variant="button" display="block" gutterBottom>
                        {`结束时间：${DateFunc(dialogData.endTime)}`}
                    </Typography>
                    <Typography variant="button" display="block" gutterBottom>
                        {`耗时 ：${SToStr(dialogData.timeConsuming)}`}
                    </Typography>
                    <Typography variant="button" display="block" gutterBottom>
                        {`平均时间 ${SToStr(dialogData.timeConsuming / dialogData.actual)}`}
                    </Typography>
                    <Masonry
                        breakpointCols={2}
                        style={{
                            display: "flex"
                        }}
                    >
                        {dialogData.data && dialogData.data.map((k, i) => (
                            k &&
                            <Typography variant="button" display="block" gutterBottom style={{
                                margin: '10px'
                            }}>
                                <TableContainer component={Paper}>
                                    <Table size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">序号</TableCell>
                                                <TableCell align="right">
                                                    {i === 0 && '苏生复活'}
                                                    {i === 1 && '掉线重连'}
                                                    {i === 2 && '死亡回城'}
                                                    {i === 3 && '特殊执行'}
                                                    {i === 4 && '激活图鉴'}
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {k.map((row, i) => (
                                                <TableRow key={row}
                                                          sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                    <TableCell align="left">{i+1}</TableCell>
                                                    <TableCell align="right">{row}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Typography>
                        ))}
                        {
                            dialogData.card && dialogData.card.length >0  &&
                            <Typography variant="button" display="block" gutterBottom style={{
                                margin: '10px'
                            }}>
                                <TableContainer component={Paper}>
                                    <Table size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">序号</TableCell>
                                                <TableCell align="right">翻牌</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {dialogData.card.map((row,i)=>(
                                                <TableRow key={row}
                                                          sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                    <TableCell align="left">{i+1}</TableCell>
                                                    <TableCell align="right">{row}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Typography>
                        }
                        {
                            dialogData.type4 && <Typography variant="button" display="block" gutterBottom style={{
                                margin: '10px'
                            }}>
                                <TableContainer component={Paper}>
                                    <Table size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">获得道具</TableCell>
                                                <TableCell align="right">数量</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Object.keys(dialogData.type4).map((key) => (
                                                <TableRow key={key}
                                                          sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                    <TableCell align="left">{key}</TableCell>
                                                    <TableCell align="right">{dialogData.type4[key]}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Typography>
                        }
                    </Masonry>

                </Stack>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleClose}>{'关闭'}</Button>
        </DialogActions>
    </BootstrapDialog>)
}