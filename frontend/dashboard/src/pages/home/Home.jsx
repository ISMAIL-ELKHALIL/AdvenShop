import { Alert, Skeleton } from "@mui/material";
import BarChartBox from "../../components/barChartBox/BarChartBox";
import ChartBox from "../../components/chartBox/chartBox";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import { barChartBoxVisit } from "../../data";

import {
  useGetProductCountByDayQuery,
  useGetProductsQuery,
  
} from "../../slices/productsApiSlice";

import {
  useGetAllUsersQuery,
  useGetCustomerCountByDayQuery,
  useGetUserCountByDayQuery,
} from "../../slices/usersApiSlice";

import {
  useGetOrderCountByDayQuery,
  useGetOrdersQuery,
} from "../../slices/orderApiSlice";

import "./Home.scss";

export default function Home() {
  const { data, isLoading, refetch, error } = useGetAllUsersQuery();

  const { data: orders } = useGetOrdersQuery();

  const { data: products } = useGetProductsQuery();

  const { data: getUserCountByDay } = useGetUserCountByDayQuery();

  const { data: getCustomerCountByDay } = useGetCustomerCountByDayQuery();

  const { data: getProductCountByDay } = useGetProductCountByDayQuery();

  const { data: getOrderCountByDay } = useGetOrderCountByDayQuery();



  const chartDataCustomers =
    getCustomerCountByDay?.map((item) => ({
      day: item._id.day,
      customers: item.count,
    })) || [];

  // Map the data to the format expected by the chart
  const chartDataProducts =
    getProductCountByDay?.map((item) => ({
      day: item._id.day,
      products: item.count,
    })) || [];

  const chartDataUsers =
    getUserCountByDay?.map((item) => ({
      day: item._id.day,
      users: item.count,
    })) || [];

  const chartDataOrders =
    getOrderCountByDay?.map((item) => ({
      day: item._id.day,
      orders: item.count,
    })) || [];

  const chartDataTotalRevenue =
    getOrderCountByDay?.map((item) => ({
      day: item._id.day,
      orders: item.total,
    })) || [];


  const chartBoxCustomers = {
    color: "#8884d8",
    icon: "/userIcon.svg",
    title: "Total Customers",
    number: data?.customersCount,
    dataKey: "customers",
    chartData: chartDataCustomers,
  };

  const chartBoxUsers = {
    color: "#8884d8",
    icon: "/userIcon.svg",
    title: "Total Users",
    number: data?.usersCount,
    dataKey: "users",
    chartData: chartDataUsers,
  };

  const chartBoxProduct = {
    color: "#8884d8",
    icon: "/productIcon.svg",
    title: "Total Products",
    number: products?.length,
    dataKey: "products",
    chartData: chartDataProducts,
  };

  const chartBoxOrder = {
    color: "#8884d8",
    icon: "/productIcon.svg",
    title: "Total Orders",
    number: orders?.length,
    dataKey: "orders",
    chartData: chartDataOrders,
  };

  const barChartBoxRevenue = {
    title: "Profit Earned",
    color: "#8884d8",
    dataKey: "orders",
    chartData: chartDataTotalRevenue,
  };




  

  //Todo add spinner commpoment as laoder and message as error
  return (
    <>
      {isLoading ? (
        <Skeleton
          sx={{ bgcolor: "red.900" }}
          variant="rectangular"
          width={1510}
          height={800}
        />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <div className="home">
          {/*           <div className="box box1">
            <ChartBox />
          </div> */}

          <div className="box box2">
            <ChartBox {...chartBoxCustomers} viewAllLink="/v1/customers" />
          </div>

          <div className="box box3">
            <ChartBox {...chartBoxProduct} viewAllLink="/v1/products" />
          </div>
          <div className="box box4">
            <PieChartBox />
          </div>

          <div className="box box6">
            <ChartBox {...chartBoxUsers} viewAllLink="/v1/users" />
          </div>
          <div className="box box7">
            <ChartBox {...chartBoxOrder} viewAllLink="/v1/orders" />
          </div>
          <div className="box box8">
            <BarChartBox {...barChartBoxRevenue} />
          </div>
          <div className="box box9">
            <BarChartBox {...barChartBoxVisit} />
          </div>
        </div>
      )}
    </>
  );
}
