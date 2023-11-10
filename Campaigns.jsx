import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Button, Spinner } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { getCookie } from "../../../utils/auth";
import { baseURL } from "../../../utils/constant";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { MaterialReactTable } from "material-react-table";

const Campaigns = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();
  const bearerToken = getCookie("bearerToken");
  const headers = {
    Authorization: `Bearer ${bearerToken}`,
  };

  const columns = useMemo(() => [
    {
      accessorKey: "campaignName",
      header: " Name",
      size: 150,
    },
    {
      accessorKey: "recordCount",
      header: "Leads Uploaded",
      size: 150,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 150,
    },
    {
      // accessorKey: '_id',
      header: "Id",
      size: 150,
      accessorFn: (renderedCellValue) => `${renderedCellValue.id}`,
      Cell: ({ renderedCellValue }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Link
            to={`/campaignid/${renderedCellValue}`}
            className="mb-3 text-decoration-none"
          >
            <Button variant="warning" size="sm" className="rounded-3">
              <Icon.Eye className="" />
            </Button>
          </Link>
        </Box>
      ),
    },
  ]);

  const payload = {
    "page":"1",
    "start":"0",
    "length":`${data.recordsTotal}`,
    "columns":[
        {
            "data": "campaignName",
            "name": "",
            "searchable": true,
            "orderable": true,
            "search": {
                "value": "",
                "regex": false
            }
        },
        {
            "data": "recordCount",
            "name": "",
            "searchable": true,
            "orderable": true,
            "search": {
                "value": "",
                "regex": false
            }
        },
        {
            "data": "userId",
            "name": "",
            "searchable": true,
            "orderable": true,
            "search": {
                "value": "",
                "regex": false
            }
        }
    ],
    "order": [
        {
            "column":0,
            "dir": "asc"
        }
    ],
    "search": {
        "value": "",
        "regex": false
    }
}


  const fetchData = () => {
    axios
      .post(`${baseURL}campaign/getDataTableForCampaign`, payload, {
        headers: { ...headers },
      })
      .then((response) => {
        const Response = response.data;
        setData(Response);
        setIsLoading(false);
        // console.log(Response);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response && err.response.status === 401) {
          return navigate("/login");
        }
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

  
  
  return (
    <Container fluid>
      <Row>
        <Sidebar />
        <Col lg={10} className="rounded-4 py-3">
          <Row>
            <Col lg={12}>
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center pt-5">
                  <Spinner animation="grow" variant="warning" />
                </div>
              ) : (
                <MaterialReactTable columns={columns} data={data.data} />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Campaigns;

