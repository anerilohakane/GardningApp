// app/Navigation/TenantAdminStack.js
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../Screens/TenantAdmin/TenantDashboardScreen';
// import Analytics from '../Screens/TenantAdmin/Analytics';

const Stack = createStackNavigator();

export default function TenantAdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      {/* <Stack.Screen name="Analytics" component={Analytics} /> */}
    </Stack.Navigator>
  );
}