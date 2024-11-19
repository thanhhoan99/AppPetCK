import { View, Text , Image, TextInput, StyleSheet,ScrollView, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator} from 'react-native'
import { useNavigation} from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors';
import { collection, getDocs,doc, query, where ,setDoc} from 'firebase/firestore';
import { db, storage } from '@/Config/FirebaseConfigs';
import {Picker} from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
 
export default function AddNewPet() {
  const Navigation=useNavigation();
  const [formData, setFormData]=useState(
      {category:'Dogs', sex:'Male'}
  );
  const [gender, setGender]=useState();
  const [categoryList,setCategortList]=useState([]);
  const [selectedCategory, setSelectedategory]=useState();
  const [image,setImage]=useState(null);
  
  const [loader,setLoader]=useState(false);
  const {user}=useUser();
  const router=useRouter();

      useEffect(()=>{
        Navigation.setOptions({
            heatderTitle:'Add New Pet'
        })
        GetCategories();
    },[])

        const GetCategories=async()=>{
        setCategortList([]);
        const snapshot=await getDocs(collection(db,'Category'));
        snapshot.forEach((doc)=>{
            setCategortList(categoryList=>[...categoryList,doc.data()])
        })
    }
        const imagePicker=async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect:[4,3],
            quality:1,
        });
        console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    const handleInputChange=(fieldName,fieldValue)=>{
        setFormData(prev=>({
            ...prev,
            [fieldName]:fieldValue
        }))
    }

    const onSubmit=()=>{
        if(Object.keys(formData).length!=8)
        {
            ToastAndroid.show('Enter All Details',ToastAndroid.SHORT)
            return;
        }
        UploadImage();
    console.log(formData);
    }

//     /**
//      * tair hinhanh
//      */
    
    const UploadImage=async()=>{
        setLoader(true)
        const resp=await fetch(image);
        const blobImage=await resp.blob();
        const storageRef=ref(storage,'/PetAdopt/'+Date.now()+'.jpg');

        uploadBytes(storageRef,blobImage).then((snapshot)=>{
        console.log('File Uploaded')
        }).then(resp=>{
            getDownloadURL(storageRef).then(async(downloadUrl)=>{
                console.log(downloadUrl);
                SaveFormData(downloadUrl);
            })
        })
    }

    const SaveFormData=async(imageUrl)=>{
        const docId=Date.now().toString();
        await setDoc(doc(db, 'Pets', docId),{
            ...formData,
            imageUrl:imageUrl,
            username:user?.fullName,
            email:user?.primaryEmailAddress?.emailAddress,
            userImage:user?.imageUrl,
            id:docId

        }) 
        setLoader(false);
        router.replace('/(tabs)/home')

    }

  return (
           <ScrollView style={{
            padding:20
        }}>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:20

            }}>Add New Pet for adoption </Text>

            <Pressable onPress={imagePicker}>
            {!image? <Image source={require('./../../assets/images/camera.png')}
            style={{
                width:100,
                height:100,
                borderRadius:15,
                borderWidth:1,
                boderColor:Colors.GRAY
            }}
            />:
            <Image source={{uri:image}}
            style={{
                width:100,
                height:100,
                borderRadius:15,
            }} /> }
            </Pressable>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Pet Name *</Text>
                <TextInput style={styles.input} 
                onChangeText={(value)=>handleInputChange('name',value)}/>
                </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Pet Category *</Text>
            <Picker 
               selectedValue={selectedCategory}
               style={styles.input}
               onValueChange={(itemValue, itemIndex) =>{
                setSelectedategory(itemValue);
                handleInputChange('category',itemValue)
               }}>
                {categoryList.map((category, index)=>(
                      <Picker.Item key={index} label={category.name} value={category.name}/>
                ))}    

              </Picker>
               </View>
            
                
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Breed *</Text>
                <TextInput style={styles.input} 
                onChangeText={(value)=>handleInputChange('breed',value)}/>
                </View>  

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Age *</Text>
                <TextInput style={styles.input} 
                onChangeText={(value)=>handleInputChange('age',value)}/>
                </View> 

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Gender *</Text>
            <Picker  
               selectedValue={gender}
               style={styles.input}
               onValueChange={(itemValue, itemIndex) =>{
                setGender(itemValue);
                handleInputChange('sex',itemValue)
               }}>
                <Picker.Item label="Male" value="Male"/>
                <Picker.Item label="Female" value="Female"/>
               </Picker>
               </View>
            
            <View style={styles.inputContainer}>
                <Text style={styles.label}>weight *</Text>
                <TextInput style={styles.input} 
                     keyboardType='number-pad'
                onChangeText={(value)=>handleInputChange('weight',value)}/>
                </View>  

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Address *</Text>
                <TextInput style={styles.input} 
                onChangeText={(value)=>handleInputChange('address',value)}/>
                </View>  

            <View style={styles.inputContainer}>
                <Text style={styles.label}>About *</Text>
                <TextInput style={styles.input} 
                numberOfLine={5}
                multiline={true}
                onChangeText={(value)=>handleInputChange('about',value)}/>
                </View>  

                <TouchableOpacity 
                style={styles.button} 
                disabled={loader}
                onPress={onSubmit} >
                    {loader?<ActivityIndicator size={'large'}/>:
                    <Text style={{frontFamily:'outfit-medium', textAlign:'center'}}>Submit</Text>
                    }
                </TouchableOpacity>

        </ScrollView>
  )
}




const styles = StyleSheet.create({
    inputContainer:{
        marginVertical:5
    },
    input:{
        padding:10,
        backgroundColor:Colors.WHITE,
        borderRadius:7,
        fontFamily:'outfit'
    },
    label:{
        marginVertical:5,
        fontFamily:'outfit'
    },
    button:{
        padding:15,
        backgroundColor:Colors.PRIMARY,
        borderRadius:7,
        marginVertical:10,
        marginBottom:50

    }
})