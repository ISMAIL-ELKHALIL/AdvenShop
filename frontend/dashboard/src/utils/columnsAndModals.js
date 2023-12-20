export const userColumns = [
  { field: "id", headerName: "ID", width: 260 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "name",
    type: "password",
    headerName: "Full name",
    width: 200,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 270,
  },
  {
    field: "isAdmin",
    type: "Boolean",
    headerName: "Is Admin",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created at",
    width: 160,
    type: "string",
  },

];

export const addUserModal = [
  {
    field: "name",
    type: "string",
    headerName: "Full name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "isAdmin",
    headerName: "isAdmin",
    width: 150,
    type: "boolean",
  },
  {
    field: "password",
    headerName: "Password",
    width: 100,
    type: "password",
  },
];

export const customerColumns = [
  { field: "_id", headerName: "ID", width: 260 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "name",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 270,
  },
  {
    field: "createdAt",
    headerName: "Created at",
    width: 220,
    type: "string",
  },
  {
    field: "updatedAt",
    headerName: "Updated at",
    width: 220,
    type: "string",
  },
];

export const updateCustomerModal = [
  {
    field: "name",
    type: "string",
    headerName: "Full name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "isAdmin",
    headerName: "isAdmin",
    width: 150,
    type: "boolean",
  },
  {
    field: "password",
    headerName: "Password",
    width: 100,
    type: "password",
  },
];

/* Category Columns AND Modals */

export const categoryColumns = [
  { field: "id", headerName: "ID", width: 260 },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created at",
    width: 300,
    type: "string",
  },
  {
    field: "updatedAt",
    headerName: "Updated at",
    width: 300,
    type: "string",
  },
];

export const addCategoryModal = [
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 150,
  },
];

/* Product Columns AND Modals */

export const productColumns = [
  { field: "id", headerName: "ID", width: 250 },
  {
    field: "image",
    headerName: "Image",
    width: 150,
    renderCell: (params) => {
      return <img src={params.row.image[0] || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "name",
    type: "string",
    headerName: "name",
    width: 200,
  },
  {
    field: "price",
    type: "number",
    headerName: "Price",
    width: 100,
  },
  {
    field: "numReviews",
    type: "number",
    headerName: "Reviews",
    width: 160,
  },

  {
    field: "createdAt",
    headerName: "Created At",
    width: 250,
    type: "string",
  },
];
export const addProductModal = [
  {
    field: "name",
    type: "string",
    headerName: "name",
    width: 200,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 100,
  },
  {
    field: "description",
    type: "string",
    headerName: "Description",
    width: 100,
  },
  {
    field: "category",
    type: "boolean",
    headerName: "Category",
    width: 100,
  },
  {
    field: "image",
    type: "file",
    headerName: "image",
    width: 100,
  },
];
