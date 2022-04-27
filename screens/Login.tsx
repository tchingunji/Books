import { View, Text, ImageBackground, TextInput, Button, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Login: undefined;
    Home: { authorization: string
            token:string
          };
    Detalhes:{
      id:number
    }
  };
  type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Login({navigation}:Props) {

    const [name,setName]=useState('');
    const [senha,setSenha]=useState('');
    const [saida,setSaida]=useState('');
    
    const sendData = async () => {
        const response = await fetch('https://books.ioasys.com.br/api/v1/auth/sign-in', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": name,
            "password": senha
        })
        });
        const json = await response.json();
        if(json.hasOwnProperty("errors")){
            alert(json.errors.message)
            
        }else{           
          //console.log(response.headers.get('refresh-token'));
            navigation.navigate('Home',{
              authorization:""+response.headers.get('authorization'),
              token:""+response.headers.get('refresh-token'),
            });
        }
    }
    

  return (
    <View>
      <ImageBackground
        source={require('../assets/fundo.png')}
        style={{width:'400px',height:'900px'}}
      >
        <View style={{flexDirection:'row'}}>
            <Text style={{color:'#fff', width:'104.4px',height:'36px' ,fontSize:35,marginTop:'75%',marginBottom:'22%',fontWeight:'bold',marginLeft:'5%', }}>ioasys</Text>
            <Text style={{color:'#fff', width:'104.4px',height:'36px', fontFamily:'Heebo',fontWeight:'300' ,fontSize:28,marginTop:'78%',marginLeft:'5%', }}>Books</Text>
      </View>
      
      <View style={{flexDirection:'row',justifyContent:'flex-start',marginLeft:12}}>
        <View style={{backgroundColor:'rgba(0, 0, 0, 0.5)',padding:4,borderRadius:7}}>
            <Text style={{color:'#eee'}}>Email</Text>
            <TextInput     
            placeholder='something@gmail.com' 
            onChangeText={setName}
            value={name}          
                style={{
                    color:'#fff',
                    fontSize:18,
                    width:320,          
                    height:40,
                    padding:10,
                }}      
                />
        </View>        
      </View>
        <View style={{flexDirection:'row',justifyContent:'flex-start',marginLeft:12,marginTop:12}}>
            <View style={{backgroundColor:'rgba(0, 0, 0, 0.5)',padding:4,borderRadius:7}}>
                <Text style={{color:'#eee'}}>Password</Text>
                <View style={{flexDirection:'row', justifyContent:'center'}}>                
                    <TextInput     
                        secureTextEntry={true}
                        placeholder='Password'           
                        onChangeText={setSenha}
                        value={senha}
                        style={{
                            color:'#fff',
                            fontSize:18,
                            width:266,          
                            height:40,
                            padding:10,
                        }}      
                    />
                    <TouchableOpacity style={{borderRadius:7,backgroundColor:'#fff',padding:7}}onPress={()=>sendData()}>
                        <Text style={{color:'#B22E6F',fontSize:16}}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>        
        </View>

      </ImageBackground>
    </View>
  )
}