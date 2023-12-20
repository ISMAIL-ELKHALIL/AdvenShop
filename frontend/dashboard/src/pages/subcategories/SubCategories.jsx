// Subcategories.jsx

import { useState, useEffect } from "react";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/Add/Add";
//import Update from "../../components/update/Update"; // Import the Update component
import "./subCategories.scss";
import { ToastContainer } from "react-toastify";

const columns = [
  { field: "_id", headerName: "ID", width: 260 },
  {
    field: "subcategory_name",
    type: "string",
    headerName: "SubCategory name",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created at",
    width: 160,
    type: "string",
  },
  {
    field: "updatedAt",
    headerName: "Updated at",
    width: 160,
    type: "string",
  },
  {
    field: "category_name",
    headerName: "Category Boss",
    width: 150,
  },
];

const subCategoriesModal = [
  {
    field: "subcategory_name",
    type: "string",
    headerName: "SubCategory name",
    width: 150,
  },
  {
    field: "category_id",
    headerName: "Category Boss",
    width: 150,
    type: "string",
  },
];

export default function Subcategories() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
}
