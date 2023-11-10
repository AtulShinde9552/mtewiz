// import { Container, Row, Col } from "react-bootstrap";
// import { getCookie } from "../../../utils/auth";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { baseURL } from "../../../utils/constant";
// import Sidebar from "../../../Components/Sidebar/Sidebar";
// import Adduser from '../Adduser/Adduser'
// import AccountNav from "../../../Components/AccountNav/AccountNav";
// import Spinner from "react-bootstrap/Spinner";
// import * as Icon from "react-bootstrap-icons";
// import { useNavigate } from "react-router-dom";
// import { Box } from "@mui/material";
// import { MaterialReactTable } from "material-react-table";
// import { useMemo } from "react";
// import { toast } from "react-toastify";


// const Campaigns = () => {
//    const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
 
// const navigate = useNavigate()

//   const bearerToken = getCookie("bearerToken");
//   const headers = {
//     Authorization: `Bearer ${bearerToken}`,
//   };

//   const columns = useMemo(() => [

//     // {
//     //   // accessorKey: '_id',
//     //   header: "Name",
//     //   size: 150,
//     //   accessorFn: (renderedCellValue) => `${renderedCellValue.profileImage}`,
//     //   Cell: ({ renderedCellValue }) => (
//     //     <Box
//     //       sx={{
//     //         display: "flex",
//     //         alignItems: "center",
//     //         gap: "1rem",
//     //       }}
//     //     >
//     //         <img src={renderedCellValue} width={30} />

//     //     </Box>
//     //   ),
//     // },

//     {
//       accessorKey: "firstName",
//       header: "Name",
//       size: 150,
//     },

//     {
//       accessorKey: "lastName",
//       header: "Last Name",
//       size: 150,
//     },

//     {
//       accessorKey: "companyName",
//       header: "Company Name",
//       size: 100,
//     },
//     {
//       accessorKey: "jobTitle",
//       header: "Job Title",
//       size: 150,
//     },

//     {
//       accessorKey: "email",
//       header: "Email",
//       size: 150,
//     },

//     {
//       accessorKey: "status",
//       header: "Status",
//       size: 150,
//     },
   
    
//   ]);

//   const payload = {
//     "page":"1",
//     "start":"0",
//     "length":`${data.recordsTotal}`,
//     "columns":[
//         {
//             "data": "campaignName",
//             "name": "",
//             "searchable": true,
//             "orderable": true,
//             "search": {
//                 "value": "",
//                 "regex": false
//             }
//         },
//         {
//             "data": "recordCount",
//             "name": "",
//             "searchable": true,
//             "orderable": true,
//             "search": {
//                 "value": "",
//                 "regex": false
//             }
//         },
//         {
//             "data": "userId",
//             "name": "",
//             "searchable": true,
//             "orderable": true,
//             "search": {
//                 "value": "",
//                 "regex": false
//             }
//         }
//     ],
//     "order": [
//         {
//             "column":0,
//             "dir": "asc"
//         }
//     ],
//     "search": {
//         "value": "",
//         "regex": false
//     }
// }

//   const fetchData = () => {
//     axios
//       .post(`${baseURL}user/getDataTableForUserList`, payload, {
//         headers: { ...headers },
//       })
//       .then((response) => {
//         const Response = response.data;
//         setData(Response);
//         setIsLoading(false);
//         console.log(response);
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         if (err.response && err.response.status === 401) {
//           return navigate("/login");
//         }
//         toast.error(err?.response?.data?.message, {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//         });
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
  
//   return (
//     <>
//       <Container fluid>
//       <Row>
//         <Sidebar />
//         <Col lg={10} className="rounded-4 py-5">
//           <Row>
//             <Col lg={12}>
//             <Adduser/>
//               {isLoading ? (
//                 <div className="d-flex justify-content-center align-items-center pt-5">
//                   <Spinner animation="grow" variant="warning" />
//                 </div>
//               ) : (
//                 <MaterialReactTable columns={columns} data={data.data} 
//                 />
                
//               )}
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </Container>
//     </>
//   );
// };

// export default Campaigns;



import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { getCookie } from "../../../utils/auth";
import axios from "axios";
import { baseURL } from "../../../utils/constant";
import { toast } from "react-toastify";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AddUser from '../Adduser/Adduser'
import Sidebar from "../../../Components/Sidebar/Sidebar";
import { Container, Row, Col} from "react-bootstrap";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function User() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const navigate = useNavigate()

  const bearerToken = getCookie("bearerToken");
  const headers = {
    Authorization: `Bearer ${bearerToken}`,
  };

  const payload = {
    page: "1",
    start: "0",
    length: `${rows.recordsTotal}`,
    columns: [
      {
        data: "campaignName",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "recordCount",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
      },
      {
        data: "userId",
        name: "",
        searchable: true,
        orderable: true,
        search: {
          value: "",
          regex: false,
        },
      },
    ],
    order: [
      {
        column: 0,
        dir: "asc",
      },
    ],
    search: {
      value: "",
      regex: false,
    },
  };

  const fetchData = () => {
    axios
      .post(`${baseURL}user/getDataTableForUserList`, payload, {
        headers: { ...headers },
      })
      .then((response) => {
        console.log("Response received:", response);
        const Response = response.data;
        console.log(
          "Mapped data:",
          Response.data.map((item) => ({ ...item, firstName: item.firstName }))
        );
        setRows(Response.data.map((item) => ({ ...item })));
        console.log("Rows state:", rows);
      })
      .catch((err) => {
        console.error("Error:", err);

        toast.error(err?.response?.data?.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
      fetchData();
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
      }
    });
  };

  return (
    <>
     <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddUser closeEvent={handleClose}/>
        </Box>
      </Modal>
    </div>
    <Container fluid>
       <Row>
         <Sidebar />
         <Col lg={10} className="rounded-4 py-5">
           <Row>
             <Col lg={12}>
             <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ padding: "20px" }}
      >
        Campaigns List
      </Typography>
      <Divider />

      <Box height={10} />
      <Stack direction="row" spacing={2} className="my-2 mb-2">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={rows}
          sx={{ width: 300 }}
          onChange={(e, v) => filterData(v)}
          getOptionLabel={(rows) => rows.firstName || ""}
          renderInput={(params) => (
            <TextField {...params} size="small" label="Search Products" />
          )}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
          Add
        </Button>
      </Stack>
      <Box height={10} />

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                First Name
              </TableCell>

              <TableCell align="left" style={{ minWidth: "100px" }}>
                Last Name
              </TableCell>

              <TableCell align="left" style={{ minWidth: "100px" }}>
                Company Name
              </TableCell>

              <TableCell align="left" style={{ minWidth: "100px" }}>
                Job Title
              </TableCell>

              <TableCell align="left" style={{ minWidth: "100px" }}>
                Email
              </TableCell>

              <TableCell align="left" style={{ minWidth: "100px" }}>
                Status
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell align="left">{row.firstName}</TableCell>

                    <TableCell align="left">{row.lastName}</TableCell>

                    <TableCell align="left">{row.companyName}</TableCell>

                    <TableCell align="left">{row.jobTitle}</TableCell>

                    <TableCell align="left">{row.email}</TableCell>

                    <TableCell align="justify">{row.status}</TableCell>

                    <TableCell align="left">
                      <Stack spacing={2} direction="row">
                        <EditIcon
                          style={{
                            fontSize: "20px",
                            color: "blue",
                            cursor: "pointer",
                          }}
                          className="cursor-pointer"
                          // onClick={() => editUser(row.id)}
                        />
                        <DeleteIcon
                          style={{
                            fontSize: "20px",
                            color: "darkred",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            deleteUser(row.email);
                          }}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 12, 13, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
            </Col>
           </Row>
         </Col>
      </Row>
     </Container>
    </>
  );
}



 