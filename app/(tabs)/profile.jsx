import { View, Text ,FlatList, TouchableOpacity, Share, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { useUser } from '@clerk/clerk-react'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-react'
import { Colors } from '@/constants/Colors'

export default function Profile() {
  const {user}=useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const menuList = [
    {
        id: 1,
        name: 'Add New',
        icon: require('./../../assets/images/add.png'),
        path: '/add-new-pet'
    },
    {
        id: 2,
        name: 'Favorites',
        icon: require('./../../assets/images/love.png'),
        path: '/(tabs)/favorite'
    },
    {
        id: 3,
        name: 'InBox',
        icon: require('./../../assets/images/chat.png'),
        path: '/(tabs)/inbox'
    },
    {
      id: 5,
      name: 'My Post',
      icon: require('./../../assets/images/app.png'),
      path: '/../users-post'
  },
  {
    id: 6,
    name: 'User',
    icon: require('./../../assets/images/location-pin.png'),
    path: '/add-new-pet'
},
{
  id: 4,
  name: 'Log Out',
  icon: require('./../../assets/images/logout.png'),
  path: 'logout'
},
]

const onMenuClick = (item) => {
  if (item.path == 'logout') {
      signOut();
      return;
  }
  if (item.path == 'Share') {
      Share.share({
          message: 'Download the Business Directory App'
      })
      return;
  }
  router.push(item.path)}


  return (
    // <View>
    //   <Link href={'/login/LoginScreen'}>
    //   <Text>profile</Text>
    //   </Link>
    // </View>
    <View style={{
      padding:20
      
    }}>
      <Text  style={{
         fontFamily:'outfit-bold',
         fontSize:35
         }}>profile</Text>

<View style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
      }}>
      <Image source={{uri:user?.imageUrl}}
                        style={{
                            width:100,
                            height:100,borderRadius:99
                        }}
                    />
        <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20
      }}>{user?.fullName}</Text>
        <Text style={{
                fontFamily: 'outfit',
                fontSize: 16
      }}>{user?.primaryEmailAddress?.emailAddress}</Text>
    </View>

        
    <TouchableOpacity
            // onPress={() => onMenuClick(item)}
            style={{ marginTop: 50 }}>
            <FlatList
                data={menuList}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <TouchableOpacity 
                    onPress={() => onMenuClick(item)}
                        style={{
                        display: 'flex', flexDirection: 'row',
                        gap: 10, alignItems: 'center', flex: 1,
                        borderRadius: 15, borderWidth: 1, margin: 10,
                        borderColor: Colors.PRIMARY, backgroundColor: '#fff'
                    }}>
                        <Image source={item.icon}
                            style={{
                                width: 50,
                                height: 50
                            }}
                        />
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            flex: 1,
                            fontSize: 16
                        }}>{item.name}</Text>

                    </TouchableOpacity>
                )}
            />
            <Text style={{
                fontFamily: 'outfit',
                marginTop: 50, textAlign: 'center', color: Colors.GRAY
            }}>Developed by App</Text>
        </TouchableOpacity>
    </View>
  )
}