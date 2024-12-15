import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Platform, RefreshControl, SafeAreaView } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { MaterialIcons } from '@expo/vector-icons';

const App = () => {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (numberOfUsers = 10) => {
    const apiURL = `https://randomuser.me/api/?results=${numberOfUsers}`;
    const response = await fetch(apiURL);
    const data = await response.json();
    setUsers(data.results);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };

  const addItem = () => {
    fetchUsers(1);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.listItem, { flexDirection: Platform.OS === 'ios' ? 'row-reverse' : 'row' }]}>
    <UserAvatar size={50} name={`${item.name.first} ${item.name.last}`} src={item.picture.large} />
    <View style={styles.userInfo}>
      <Text style={styles.name}>{item.name.first}</Text>
      <Text style={styles.name}>{item.name.last}</Text>
    </View>
  </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Text style={{ padding: Platform.OS === 'ios' ? 5 : 10, }}>Welcome to the User List</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.login.uuid}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <TouchableOpacity style={styles.fab} onPress={addItem}>
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: Platform.OS === 'ios' ? 0 : 40,
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: Platform.OS === 'ios' ? 0 : 40,
  },
  listItem: {
    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
  },
  userInfo: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: Platform.OS === 'ios' ? 'flex-start' : 'flex-end',
  },
  name: {
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    right: Platform.OS === 'ios' ? 30 : 40,
    bottom: Platform.OS === 'ios' ? 30 : 70,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
});

export default App;