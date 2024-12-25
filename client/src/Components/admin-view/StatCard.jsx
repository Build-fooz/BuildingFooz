/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const StatCard = ({ label, icon: Icon, value, color }) => {
	return (
		<motion.div
			className='bg-[#f7d6d0] bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700'
			whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(201, 126, 126, 0.5)" }}
		>
			<div className='px-4 py-5 sm:p-6'>
				<span className='flex items-center text-sm font-medium text-White-400'>
					<Icon size={20} className='mr-2' style={{ color }} />
					{label}
				</span>
				<p className='mt-1 text-3xl font-semibold text-Darkblue-100'>{value}</p>
			</div>
		</motion.div>
	);
};
export default StatCard;