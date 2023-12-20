import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LinkContainer } from "react-router-bootstrap";

import { Form, Image, Button, Row, Col } from "react-bootstrap";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import { FaTimes, FaTruckMoving } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

import { useUpdateProfileMutation } from "../slices/usersApiSlice";
import { useRegisterMutation } from "../slices/usersApiSlice";

import { selectAuth, setCredentials } from "../slices/authSlice";

import { ordersApiSlice, useGetMyOrdersQuery } from "../slices/ordersApiSlice";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector(selectAuth);

  const [updateProfile, { isLoading: isLoadingUpdateProfile }] =
    useUpdateProfileMutation();

  const {
    data: myOrders,
    isLoading: isLoadingMyOrders,
    error,
  } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmedPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          password,
        }).unwrap();

        dispatch(setCredentials(res));
        toast.success("Profile Updated Successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  //for React-bootstrap Pagination
  const columns = [
    { dataField: "_id", text: "ID" },
    { dataField: "createdAt", text: "DATE" },
    { dataField: "totalPrice", text: "TOTAL" },
    {
      dataField: "isPaid",
      text: "PAID",
      formatter: (cell, row) =>
        row.isPaid ? (
          row.paidAt?.substring(0, 10)
        ) : (
          <FaTimes style={{ color: "red", textAlign: "center" }}></FaTimes>
        ),
    },
    {
      dataField: "isDelivered",
      text: "DELIVERED",
      formatter: (cell, row) =>
        row.isDelivered ? (
          row.deliveredAt?.substring(0, 10)
        ) : (
          <TbTruckDelivery
            style={{ color: "red", textAlign: "center" }}
            size={25}
          ></TbTruckDelivery>
        ),
    },
    {
      dataField: "details",
      text: "INFO",
      formatter: (cell, row) => (
        <LinkContainer to={`/orders/${row._id}`}>
          <Button className="btn-sm" variant="light">
            Details
          </Button>
        </LinkContainer>
      ),
    },
  ];

  const defaultSorted = [
    {
      dataField: "createdAt",
      order: "desc",
    },
  ];
  return (
    <div className="profile cb">
    <div className="container pt-4">
    <Row>
      <Col md={3}>
        <Image className="center-item img-profile" src="/favicon.png" roundedCircle width={"50px"} />
        <h3 className="text-center">{userInfo?.name}</h3>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              required
              onChange={(event) => setName(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              minLength={8}
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmedPassword" className="my-2">
            <Form.Label>Confirmed Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              required
              minLength={8}
              value={confirmedPassword}
              onChange={(event) => setConfirmedPassword(event.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="my-2">
            Update
          </Button>
          {isLoadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
        {isLoadingMyOrders ? (
          <Loader></Loader>
        ) : error ? (
          <Message variant={"danger"} className={"text-center"}>
            "We're sorry, but we encountered an issue while processing your
            request."
          </Message>
        ) : (
          <BootstrapTable
            keyField="_id"
            data={myOrders}
            columns={columns}
            defaultSorted={defaultSorted}
            pagination={paginationFactory()}
          />
        )}
      </Col>
    </Row>
    </div>
    </div>
  );
};

export default ProfileScreen;

/*(
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((order) => (
                  <tr key={`key_${order._id}`}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt?.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }}></FaTimes>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt?.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }}></FaTimes>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/orders/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )*/
