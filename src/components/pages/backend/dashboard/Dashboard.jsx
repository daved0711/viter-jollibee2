import Footer from '../partials/Footer'
import Header from '../partials/Header'
import SideNavigation from '../partials/SideNavigation'
import DashboardCard from './DashboardCard'
import DashboardAccordion from './DashboardAccordion'
import { menus } from '../menu-data'
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

const Dashboard = () => {
    

  return (
    
    <>
    <section className="layout-main">
            <div className="layout-division">
            <SideNavigation menu="dashboard"/>
                <main>
                    <Header title="Dashboard" subtitle="Welcome to Jolliebee"/>
                    <div className="p-8">
                      <div className="grid grid-cols-[1fr_400px] gap-5">

                        <div className="stats">

                            <div className="grid grid-cols-4 gap-5">
                                <DashboardCard title="Chicken Joy" filterby="Chicken Joy"/>
                                <DashboardCard title="Value Meal" filterby="Value Meal"/>
                                <DashboardCard title="Burger Steak" filterby="Burger Steak"/>
                                <DashboardCard title="Spaghetti" filterby="Spaghetti"/>
                                <DashboardCard title="Sides" filterby="Sides"/>
                                <DashboardCard title="Burger" filterby="Burger"/>
                                <DashboardCard title="Palabok" filterby="Palabok"/>
                            </div>

                            <div className="chart mt-10">
                                <h3>Menu Prices</h3>
                                <BarChart
                                width={1200}
                                height={400}
                                data={menus.slice(0,10)}
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
                                <Bar dataKey="menu_price" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                </BarChart>
                            </div>

                        </div>

                        <div className="sidebar overflow-auto custom-scroll h-[calc(100vh-200px)]">
                                <DashboardAccordion title="Chicken Joy" filterby="Chicken Joy"/>
                                <DashboardAccordion title="Value Meal" filterby="Value Meal"/>
                                <DashboardAccordion title="Burger Steak" filterby="Burger Steak"/>
                                <DashboardAccordion title="Spaghetti" filterby="Spaghetti"/>
                                <DashboardAccordion title="Sides" filterby="Sides"/>
                                <DashboardAccordion title="Burger" filterby="Burger"/>
                                <DashboardAccordion title="Palabok" filterby="Palabok"/>
                        </div>
                        
                      </div>
                    </div>
                    <Footer/>
                </main>
            </div>
        </section>

    </>
  )
}

export default Dashboard