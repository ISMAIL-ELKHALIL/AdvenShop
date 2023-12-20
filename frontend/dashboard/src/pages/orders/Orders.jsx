import { useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import { useGetOrdersQuery } from "../../slices/orderApiSlice";
import OrderEditModal from "../../components/update/OrderEditModal";

import "./Orders.scss";

const columns = [
  { field: "id", headerName: "ID", width: 250 },
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.image || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "user",
    type: "string",
    headerName: "Customer Name",
    width: 200,
    renderCell: (params) => {
      return params.row.user ? params.row.user.name : "";
    },
  },

  {
    field: "itemsPrice",
    type: "string",
    headerName: "Total Amount",
    width: 100,
  },
  {
    field: "paymentMethod",
    headerName: "Payment Method",
    type: "string",
    width: 200,
  },

  {
    field: "isPaid",
    headerName: "Paid",
    width: 100,
    type: "string",
  },
  {
    field: "isDelivered",
    headerName: "Delivered",
    width: 100,
    type: "string",
  },
  {
    field: "paidAt",
    headerName: "Paid At",
    width: 250,
    type: "string",
  },
];

export default function Orders() {
  const { data, isLoading, error } = useGetOrdersQuery();
  const [editProductId, setEditProductId] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);


  


  const orders = data?.map((product) => {
    return { ...product, id: product._id };
  });

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
{/*           <div>
            <img src="/view.svg" alt="" />
          </div> */}
        </div>
      );
    },
  };

  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : error ? (
        <p>{error?.data?.message || error.error}</p>
      ) : (
        <div className="orders">
          <div className="info">
            <h1>Orders</h1>
          </div>
          {orders && (
            <DataTable
              slug="orders"
              columns={columns}
              rows={orders}
              getRowId={(row) => row.id}
              actionColumn={actionColumn}
            />
          )}
          {openEdit && (
            <OrderEditModal
              productId={editProductId}
              setOpen={setOpenEdit}
            />
          )}
        </div>
      )}
    </>
  );
}
