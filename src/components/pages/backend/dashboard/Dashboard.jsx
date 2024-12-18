import Footer from "../partials/Footer";
import Header from "../partials/Header";
import SideNavigation from "../partials/SideNavigation";
import DashboardCard from "./DashboardCard";
import DashboardAccordion from "./DashboardAccordion";
import { menus } from "../menu-data";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useQueryData from "@/components/custom-hook/useQueryData";
import TableLoader from "../partials/TableLoader";
import FetchingSpinner from "@/components/partials/spinner/FetchingSpinner";
import IconNoData from "../partials/IconNoData";

const Dashboard = () => {
  const {
    isLoading: isLoadingCategory,
    isFetching: isFetchingCategory,
    error: errorCategory,
    data: dataCategory,
  } = useQueryData(
    `/v2/category`, //endpoint
    "get", //method
    "category" //key
  );
  const {
    isLoading: isLoadingfood,
    isFetching: isFetchingfood,
    error: errorfood,
    data: dataFood,
  } = useQueryData(
    `/v2/food`, //endpoint
    "get", //method
    "food" //key
  );

  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="dashboard" />
          <main>
            <Header title="Dashboard" subtitle="Welcome to Jolliebee" />
            <div className="p-8 overflow-y-auto overflow-x-auto custom-scroll">
              <div className="grid grid-cols-[1fr_400px]  gap-5">
                <div className="stats">
                  <div className="chart mt-0 pb-16">
                    <ResponsiveContainer width={820} height={440}>
                      <h3>Menu Prices</h3>
                      <BarChart
                        width={150}
                        height={500}
                        data={menus.slice(0, 10)}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="menu_title" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="menu_price"
                          fill="#8884d8"
                          activeBar={<Rectangle fill="pink" stroke="blue" />}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="relative">
                    {isFetchingCategory && !isLoadingCategory && (
                      <FetchingSpinner />
                    )}

                    {isLoadingCategory && <TableLoader cols={4} count={20} />}
                    {dataCategory?.count === 0 && <IconNoData />}
                    <div className="grid grid-cols-4 gap-5">
                      {dataCategory?.count > 0 &&
                        dataCategory.data.map((item, key) => (
                          <DashboardCard
                            key={key}
                            item={item}
                            dataFood={dataFood}
                          />
                        ))}
                    </div>
                  </div>
                </div>

                <div className="sidebar overflow-auto custom-scroll h-[calc(100vh-200px)]">
                  {dataCategory?.count > 0 &&
                    dataCategory.data.map((item, key) => (
                      <DashboardAccordion
                        title={item.category_title}
                        filterby={item.category_title}
                      />
                    ))}
                </div>
              </div>
            </div>
            <Footer />
          </main>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
