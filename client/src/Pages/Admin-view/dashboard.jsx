import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "../../Components/admin-view/StatCard";
import SalesOverviewChart from "../../Components/admin-view/SalerOverviewChart";
import CategoryDistributionChart from "../../Components/admin-view/CategoryDistributionChart";
import SalesChannelChart from "../../Components/admin-view/SalesChannelChart";


function AdminDashboard (){
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			{/* <AdminHeader title='Overview' /> */}

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard label='Total Sales' icon={Zap} value='$--' color='#000000' />
					<StatCard label='New Users' icon={Users} value='---' color='#000000' />
					<StatCard label='Total Products' icon={ShoppingBag} value='---' color='#000000' />
					<StatCard label='Conversion Rate' icon={BarChart2} value='---%' color='#000000' />
				</motion.div>

				{/* CHARTS */}

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<SalesOverviewChart />
					<CategoryDistributionChart />
					<SalesChannelChart />
				</div>
			</main>
		</div>
	);
};
export default AdminDashboard;
