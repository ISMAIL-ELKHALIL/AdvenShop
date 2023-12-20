// Users.jsx
import DataTable from "../../components/dataTable/DataTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import "./Users.scss";
import { useGetProductsQuery, useDeleteProductMutation } from "../../slices/productsApiSlice";
import { useEffect, useState } from "react";
import {
  addProductModal,
  productColumns,
} from "../../utils/columnsAndModals";
import AddProduct from "../../components/Add/addProduct";
import ProductEditModal from "../../components/update/productEditModal";





export default function Products() {

  const { data, isLoading, refetch, error } = useGetProductsQuery();
   const [deleteProduct, { isLoading: loadingDeleteProduct}] =
    useDeleteProductMutation(); 

  const [editProductId, setEditProductId] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const categories = data?.map((product) => {
    return { ...product, id: product._id };
  });

  const handleUpdate = (productID) => {
    // Open the UserEditModal with the userId
    // Pass a callback to handle update success+-
    setOpenEdit(true);
    setEditProductId(productID);
  };

  const handleEditUpdateSuccess = () => {
    // If needed, perform any additional logic when user update is successful
    refetch(); // Refetch the data or perform any other actions
  };

   const handleDelete = async (productID) => {
    //if (window.confirm("Are you sure?")) {
    try {
      await deleteProduct(productID);

      refetch();
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }; 

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <div onClick={() => handleUpdate(params.row.id)}>
            <img src="/view.svg" alt="" />
          </div>
          <div  onClick={() => handleDelete(params.row.id)} >
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  useEffect(() => {
    refetch();
  }, [openAdd, refetch]);

  return (
    <>
      {isLoading ? (
        <p>loading</p>
      ) : error ? (
        <p>{error?.data?.message || error.error}</p>
      ) : (
        <div className="users">
          <div className="info">
            <h1>Products</h1>
            <button
              className="addButton"
              onClick={() => {
                setOpenAdd(true);
              }}
            >
              Add New Product
            </button>
          </div>

          {categories && (
            <DataTable
              columns={productColumns}
              rows={categories}
              getRowId={(row) => row.id}
              actionColumn={actionColumn}
            />
          )}
          {openAdd && (
            <AddProduct
              slug="Product"
              modalConfig={addProductModal}
              setOpen={setOpenAdd}
            />
          )}
          {openEdit && (
            <ProductEditModal
              productId={editProductId}
              setOpen={setOpenEdit}
              onUpdateSuccess={handleEditUpdateSuccess}
            />
          )}
        </div>
      )}
    </>
  );
}
