
import DangerZone from "../../Components/admin-view/settings/DangerZone";
import Notifications from "../../Components/admin-view/settings/Notifications";
import Profile from "../../Components/admin-view/settings/Profile";
import Security from "../../Components/admin-view/settings/Security";

const SettingsPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
				<Profile />
				<Notifications />
				<Security />
				<DangerZone />
			</main>
		</div>
	);
};
export default SettingsPage;