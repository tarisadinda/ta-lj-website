import * as React from 'react'
import { styled } from '@mui/material/styles'
import styles from '@/styles/components/common/Table.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Pagination } from '@mui/material'

const CustomTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontWeight: 700
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}))

const CustomTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}))

export default function CustomTable({columns, data, deleteFunc,
    editFunc, detailFunc, idKey, actionButton, totalData, getPage, rowsPerPage}) {
    const [currPage, setCurrPage] = React.useState(1);

    const handleChangePage = (event, newPage) => {
        setCurrPage(newPage);
        getPage(newPage - 1)
    };
    
    console.log(totalData)
    const startIndex = (currPage - 1) * rowsPerPage;

    return(<>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <CustomTableCell>No</CustomTableCell>
                        {columns.length > 0 && columns.map((column, index) => (
                            <CustomTableCell width={column.width ? column.width : 200} key={index} className={styles.column}>{column.label}</CustomTableCell>
                        ))}
                        <CustomTableCell>Aksi</CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.length > 0 ? 
                        data.map((item, index) => (
                            <CustomTableRow key={index}>
                                <CustomTableCell>{startIndex + index + 1}</CustomTableCell>
                                {columns.map((col, index) => (
                                    <CustomTableCell width={col.width ? col.width : 200} key={index}>{col.render(item)}</CustomTableCell>
                                ))}
                                <CustomTableCell>
                                    <div className={styles.actions}>
                                        {detailFunc &&
                                            <IconButton onClick={() => detailFunc(item[idKey])}>
                                                <VisibilityIcon />
                                            </IconButton>
                                        }
                                        {editFunc &&
                                            <IconButton onClick={() => editFunc(item[idKey])}>
                                                <EditIcon />
                                            </IconButton>
                                        }
                                        {deleteFunc &&
                                            <IconButton onClick={() => deleteFunc(item[idKey])}>
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                        {actionButton != undefined && actionButton.map((btn, index) => (
                                            <IconButton key={index} onClick={() => btn.function(idKey == undefined ? item.company_detail.id : item[idKey])}>
                                                {btn.icon}
                                            </IconButton>
                                        ))}
                                    </div>
                                </CustomTableCell>
                            </CustomTableRow>
                        )) :
                        <CustomTableRow>
                            <CustomTableCell align="center" colSpan={10}>Belum ada data tersedia</CustomTableCell>
                        </CustomTableRow>
                    }
                </TableBody>
            </Table>
            {totalData != undefined &&
                <div className={styles.pagination}>
                    <Pagination 
                        color="primary"
                        count={totalData == 0 ? 1 : Math.ceil(totalData / rowsPerPage)}
                        page={currPage}
                        onChange={handleChangePage}
                        disabled={getPage == undefined || totalData == 0 ? true : false}
                    />
                </div>
            }
        </TableContainer>
    </>)
}