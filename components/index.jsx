import { Image, Pressable, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { Colors } from '@/constants/Colors';
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export const useWarmUpBrowser = () => {
    useEffect(() => {
      // Warm up the android browser to improve UX
      // https://docs.expo.dev/guides/authentication/#improving-user-experience
      void WebBrowser.warmUpAsync()
      return () => {
        void WebBrowser.coolDownAsync()
      }
    }, [])
  }
  
  WebBrowser.maybeCompleteAuthSession()


export default function LoginScreen() {

    useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
  const onPress =useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('./(tabs)/home', { scheme: 'myapp' }),
      })
     
      if (createdSessionId) {
        // setActive!({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])
  return (
    <View
      style={{
        backgroundColor:Colors.WHITE,
        height: '100%'
      }}
    >
      <Image
          source={require('./../../assets/images/react-logo.png')}
          style={{
            width: '100%',
            height: 450,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: '#000'
          }}
        />
        <View style={{
            padding:20,
            display:'flex',
            alignItems:'center'
        }}>
            <Text style={{
            fontSize: 30,
            fontFamily: 'outfit-bold',
            textAlign: 'center'
            }}>Ready to make
            <Text> a new friend
            </Text> App
            </Text>
            <Text style={{
            fontSize: 15,
            fontFamily: 'outfit',
            textAlign: 'center',
            marginVertical: 15,
            color: Colors.GRAY
            }}>Let's adopt the pet  which you like  and  make there life  happy again </Text>
        <Pressable 
        onPress={onPress}
        style={{   
            padding: 14,
            borderWidth: 1,
            borderRadius: 15,
            backgroundColor:Colors.PRIMARY,
            width: '100%',
        }}>
        <Text style={{
            textAlign: 'center',
            fontFamily: 'outfit-bold',
          }}>Login account</Text>
        </Pressable>
      </View>
    </View>
  );
}
