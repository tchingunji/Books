import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import {  useRoute } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

interface ABook{
    id:string
    title:string
    imageUrl:string
    description:string
    authors:string[]
    pageCount:string
    category:string
    isbn10:string
    isbn13:string
    language :string
    publisher:string
    published:string    
}
type RootStackParamList = {    
    Home: undefined
    Detalhes:undefined
  };

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Detalhes ({navigation}:Props) {
  const [isLoading, setLoading] = useState(true);
  
  const params=useRoute();
  const[dados,setDados]=useState<ABook[]>([])
  

  const getMovies = async () => {
     try {
      const response = await fetch('https://books.ioasys.com.br/api/v1/books/'+params?.params?.id,{
        method: 'GET',
        headers: {
            accept: "application/json",
            'authorization': "Bearer "+params?.params?.authorization,
            'refresh-token':params?.params?.token, 
        },        
      });
      const json = await response.json();
      //setData(json);
      dados.push(json);
      setDados(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();    
  }, []);

  const Banner = () => {

    return (
        <View style={{marginTop:10, padding: '10px' }}>                
            <FlatList                        
                data={dados}
                renderItem={({ item }) => (
                    <ScrollView style={{ marginBottom: '36px' }}>
                         {isLoading ? <ActivityIndicator/> : (
                        <TouchableOpacity style={{backgroundColor:"#fff",flexDirection:"row",padding:10,borderRadius:10}}>
                            <View style={{ flexDirection: "row", justifyContent:"space-between" }}>
                                <View >
                                    <Image source={{ uri:item.imageUrl }} style={{ height:'150px', width:'100px', borderRadius:7 }}/>
                                </View>
                                <View style={{marginLeft:8}}>
                                    <Text style={{ fontWeight: "500", color: "#000", fontSize:14}}>{item.title}</Text>                
                                    {item.authors.map((autores)=>(
                                        <Text style={{color:"#AB2680",fontSize:12,fontWeight:"400"}} key={autores}>{autores}</Text>
                                    ))
                                    }                                
                                    <Text style={{color:"#999999",fontSize:12,marginTop:6,fontWeight:"400"}}>{item.pageCount} Páginas</Text>
                                    <Text style={{color:"#999999",fontSize:12,marginTop:6,fontWeight:"400"}}>{item.publisher}</Text>
                                    <Text style={{color:"#999999",fontSize:12,marginTop:6,fontWeight:"400"}}>{item.published}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        )}
                    </ScrollView>                        
                )}
            />                
        </View>
    );
}


  return (
      
    <View style={{backgroundColor:"#fff"}}>
            {/*<Banner/>*/}            
            <View style={{flexDirection:"column", justifyContent:"center"}}>
            <TouchableOpacity style={{margin:37}} onPress={()=>navigation.goBack()}>
                <Image 
                    source={require('../assets/voltar.png')}
                    style={{width:24,height:24}}
                />
            </TouchableOpacity>
                <Image 
                    source={{uri:params.params?.imageUrl}}
                    style={{width:240,height:351,marginLeft:40,marginRight:40}}
                />
                <Text style={{fontSize:28,color:"#333333",fontWeight:"500",textAlign:"center"}}>{params.params.title}</Text>                
                <Text style={{color:"#AB2680",fontSize:12,fontWeight:"400",textAlign:"center", marginBottom:30}}>{params.params?.authors}</Text>                
                <Text style={{color:"#333333",fontWeight:"500", marginLeft:40}}>INFORMAÇÕES</Text>
            <View style={{flexDirection:"row",justifyContent:"space-between",marginLeft:40}}>
                <View>
                    <Text style={{color:"#333333",fontSize:12,fontWeight:"500"}}>Páginas</Text>
                    <Text style={{color:"#333333",fontSize:12,fontWeight:"500"}}>Editora</Text>
                    <Text style={{color:"#333333",fontSize:12,fontWeight:"500"}}>Publicação</Text>
                    <Text style={{color:"#333333",fontSize:12,fontWeight:"500"}}>Idioma</Text>
                    <Text style={{color:"#333333",fontSize:12,fontWeight:"500"}}>Título Original</Text>
                    <Text style={{color:"#333333",fontSize:12,fontWeight:"500"}}>ISBN-10</Text>
                    <Text style={{color:"#333333",fontSize:12,fontWeight:"500"}}>ISBN-13</Text>
                    <Text style={{color:"#333333",fontSize:12,fontWeight:"500"}}>Categoria</Text>
                </View>
                <View style={{marginRight:40}}>
                    <Text style={{color:"#999999",fontSize:12,fontWeight:"500"}}>{params.params?.pageCount}</Text>
                    <Text style={{color:"#999999",fontSize:12,fontWeight:"500"}}>{params.params?.publisher}</Text>
                    <Text style={{color:"#999999",fontSize:12,fontWeight:"500"}}>{params.params?.published}</Text>
                    <Text style={{color:"#999999",fontSize:12,fontWeight:"500"}}>{params.params?.language}</Text>                    
                    <Text style={{color:"#999999",fontSize:12,fontWeight:"500"}}>{params.params?.title}</Text>
                    <Text style={{color:"#999999",fontSize:12,fontWeight:"500"}}>{params.params?.isbn10}</Text>
                    <Text style={{color:"#999999",fontSize:12,fontWeight:"500"}}>{params.params?.isbn13}</Text>
                    <Text style={{color:"#999999",fontSize:12,fontWeight:"500"}}>{params.params?.category}</Text>
                </View>
            </View>
            <View style={{margin:40}}>
                <Text style={{color:"#333333",fontSize:12,fontWeight:"500"}}>RESENHA DA EDITORA</Text>
                <View style={{flexDirection:"row",marginTop:10}}>
                    <Image
                    source={require('../assets/virgula.png')}
                    style={{width:17,height:14}}
                    />
                    <Text style={{color:"#999999",fontSize:12,fontWeight:"500"}}>{params.params?.description}</Text>
                </View>
            </View>
            </View>
    </View>
    );
  
};