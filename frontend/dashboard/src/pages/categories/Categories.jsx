// Users.jsx
import DataTable from "../../components/dataTable/DataTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import "./Users.scss";
import {
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../slices/categoriesApiSlice";
import { useEffect, useState } from "react";
import {
  addCategoryModal,
  categoryColumns,
} from "../../utils/columnsAndModals";
import CategoryEditModal from "../../components/update/CategoryEditModal";
import AddCategory from "../../components/Add/AddCategory";




export default function Categories() {
  const { data, isLoading, refetch, error } = useGetAllCategoriesQuery();
  const [deleteCategory, { isLoading: loadingDeleteCategory }] =
    useDeleteCategoryMutation();
  const [editUserId, setEditUserId] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const categories = data?.map((category) => {
    return { ...category, id: category._id };
  });

  const handleUpdate = (categoryId) => {
    // Open the UserEditModal with the userId
    // Pass a callback to handle update success+-
    setOpenEdit(true);
    setEditUserId(categoryId);
  };

  const handleEditUpdateSuccess = () => {
    // If needed, perform any additional logic when user update is successful
    refetch(); // Refetch the data or perform any other actions
  };

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);

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
          <div onClick={() => handleDelete(params.row.id)}>
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
            <h1>Categories</h1>
            <button
              className="addButton"
              onClick={() => {
                setOpenAdd(true);
              }}
            >
              Add New Category
            </button>
          </div>

          {categories && (
            <DataTable
              columns={categoryColumns}
              rows={categories}
              getRowId={(row) => row.id}
              actionColumn={actionColumn}
            />
          )}
          {openAdd && (
            <AddCategory
              slug="Category"
              modalConfig={addCategoryModal}
              setOpen={setOpenAdd}
            />
          )}
          {openEdit && (
            <CategoryEditModal
              userId={editUserId}
              setOpen={setOpenEdit}
              onUpdateSuccess={handleEditUpdateSuccess}
            />
          )}
        </div>
      )}
    </>
  );
}
