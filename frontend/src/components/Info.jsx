import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {Button, Grid, styled, TableHead, TableRow} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import DialogActions from "@mui/material/DialogActions";
import React from "react";
import Dialog from "@mui/material/Dialog";
import {DateFunc, SToStr} from "./util.js";

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
                    <Typography variant="button" display="block" gutterBottom>
                        <Grid container spacing={1}>
                            {Array.from([dialogData.type1, dialogData.type2, dialogData.type3, dialogData.type4])
                                .map((k, i) => (<Grid item xs={6}>
                                    <TableContainer component={Paper}>
                                        <Table size="small" aria-label="a dense table">
                                            <TableHead>
                                                {i !== 3 && <TableRow>
                                                    <TableCell align="left">序号</TableCell>
                                                    <TableCell align="right">
                                                        {i === 0 && '死亡地图'}
                                                        {i === 1 && '掉线重连'}
                                                        {i === 2 && '激活图鉴'}
                                                    </TableCell>
                                                </TableRow>}
                                                {i == 3 && <TableRow>
                                                    <TableCell align="left">获得道具</TableCell>
                                                    <TableCell align="right">数量</TableCell>
                                                </TableRow>}
                                            </TableHead>
                                            <TableBody>
                                                {Object.keys(k).map((key) => (<TableRow key={key}
                                                                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                    <TableCell align="left">{key}</TableCell>
                                                    <TableCell align="right">{k[key]}</TableCell>
                                                </TableRow>))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>))}

                        </Grid>
                    </Typography>
                </Stack>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={handleClose}>{'关闭'}</Button>
        </DialogActions>
    </BootstrapDialog>)
}