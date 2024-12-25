import OverviewCards from "../../Components/admin-view/analytics/OverviewCards";
import RevenueChart from "../../Components/admin-view/analytics/RevenueChart";
import ChannelPerformance from "../../Components/admin-view/analytics/ChannelPerformance";
import ProductPerformance from "../../Components/admin-view/analytics/ProductsPerformance";


const AnalyticsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<OverviewCards />
				<RevenueChart />

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<ChannelPerformance />
					<ProductPerformance />
				</div>
			</main>
		</div>
	);
};
export default AnalyticsPage;