import React from 'react'
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {Home, Settings} from '../pages/Pages'

const { Navigator, Screen } = createBottomTabNavigator();

const HomeIcon = (props) => (<Icon {...props} name='home-outline'/>);
const SettingsIcon = (props) => (<Icon {...props} name='settings-outline'/>);

const BottomTabBar = ({navigation, state}) => (
	<BottomNavigation
		selectedIndex={state.index}
		onSelect={index => navigation.navigate(state.routeNames[index])}
	>
		<BottomNavigationTab title='Home' icon={HomeIcon}/>
		<BottomNavigationTab title='Settings' icon={SettingsIcon}/>
	</BottomNavigation>
);

function Main() {
  
    return (
		<NavigationContainer independent={true}>
	  		<Navigator 
				screenOptions={{
					headerShown: false,
				}}
				tabBar={props => <BottomTabBar {...props} />}
			>
	  			<Screen name='Home' component={Home}/>
	  			<Screen name='Settings' component={Settings}/>
			</Navigator>
		</NavigationContainer>
    )
}


export default Main;