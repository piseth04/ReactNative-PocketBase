import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity} from 'react-native'
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';



const index = () => {
  return (
	<View style={styles.container}>
	 	<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
			{/* Header */}
			<View style={{backgroundColor: '#ffffff', padding: 20, marginTop: 2, flexDirection: 'column'}}>
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<View>
						<AntDesign name="align-left" size={20} color="black" />
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center', gap: 16}}>
						<Feather name="search" size={24} color="black"  />
						<Ionicons name="notifications-outline" size={24} color="black" />
					</View>
				</View>
			</View>	
			{/* Top View */}
			<View style={{backgroundColor: '#ffffff',marginTop: 2, padding: 20}}>
				<Text style= {{fontSize: 25, fontWeight: 'bold'}}>Welcome Back</Text>
				<Text style= {{fontSize: 16, marginTop: 4 }}>We're glad to see you again!</Text>
			</View>
			<View style={{backgroundColor: '#ffffff', padding: 10}}>
				<Text  style= {{fontSize: 16 }}> Categories </Text>	
				<View style={{flexDirection: 'row', gap: 28, marginTop: 20}}>
					<View style={{alignItems: 'center'}}>
						<View style={{backgroundColor: '#00000011', borderRadius: 15, alignItems: 'center', justifyContent: 'center', width: 50, height: 50}}>
						<AntDesign name="alert" size={24} color="black" />
						</View>
						<Text style={{fontSize: 16}}>Category1</Text>
					</View>
					<View style={{alignItems: 'center'}}>
						<View style={{backgroundColor: '#00000011', borderRadius: 15, alignItems: 'center', justifyContent: 'center', width: 50, height: 50}}>
						<AntDesign name="alert" size={24} color="black" />
						</View>
						<Text style={{fontSize: 16}}>Category1</Text>
					</View>
					<View style={{ alignItems: 'center'}}>
						<View style={{backgroundColor: '#00000011', borderRadius: 15, alignItems: 'center', justifyContent: 'center', width: 50, height: 50}}>
						<AntDesign name="alert" size={24} color="black" />
						</View>
						<Text style={{fontSize: 16}}>Category1</Text>
					</View>
					<View style={{alignItems: 'center'}}>
						<View style={{backgroundColor: '#00000011', borderRadius: 15, alignItems: 'center', justifyContent: 'center', width: 50, height: 50}}>
						<AntDesign name="alert" size={24} color="black" />
						</View>
						<Text style={{fontSize: 16}}>Category1</Text>
					</View>
				</View>
			</View>

			{/* Bottom View */}
			<View style={{position: 'absolute', bottom: 0, left: 5, right: 5, padding: 20}} >
				<TouchableOpacity style={{backgroundColor: '#5471F0', padding: 20, borderRadius:10, alignItems: 'center', justifyContent: 'center'}}>
					<Text style={{color: '#ffffff', fontSize: 16}}>+ Add New Task</Text>
				</TouchableOpacity>
			</View>

	 	</ScrollView>
	 <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
	</View>
  )
}

export default index

const styles = StyleSheet.create({
	container: {
    	flex: 1,
		backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 1,
    paddingBottom: 28,
  },
})