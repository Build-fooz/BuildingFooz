import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

const COLORS = ["rgba(40, 20, 100, 0.4)",
	
	"rgba(30, 15, 80, 0.7)",
	
	"rgba(20, 10, 60, 0.8)",
	
	"rgba(10, 5, 40, 0.8)"];


const SALES_CHANNEL_DATA = [
	{ name: "Website", value: 45600 },
	{ name: "Marketplace", value: 29800 },
	{ name: "Social Media", value: 18700 },// Example values
];

const SalesChannelChart = () => {
	return (
		<motion.div
			className='bg-[#f7d6d0] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className='text-lg font-medium mb-4 text--100'>Sales by Channel</h2>

			<div className='h-80'>
				<ResponsiveContainer>
					<BarChart data={SALES_CHANNEL_DATA}>
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						<XAxis dataKey='name' stroke='#000000' />
						<YAxis stroke='#000000' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Bar dataKey={"value"} fill=''>
							{SALES_CHANNEL_DATA.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}
                                 />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default SalesChannelChart;