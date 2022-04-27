import { View, Text, Image, TextInput, TouchableOpacity, ScrollView,ActivityIndicator, FlatList, Alert, Modal } from 'react-native'
import React,{useEffect,useState} from 'react'
import {  useRoute } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

interface Book{
    id:string
    imageUrl:string
    title:string
    description:string
    authors:any[]
    publisher:string
    published:string
    pageCount:number
    category:string
    isbn10:string
    isbn13:string
    language :string
}


type RootStackParamList = {
    
    Home: undefined
    Detalhes:{
        id:string
        authorization:string
        token:string        
        imageUrl:string
        title:string
        description:string
        authors:any[]
        publisher:string
        published:string
        pageCount:number
        category:string
        isbn10:string
        isbn13:string
        language:string
    }
  };
  type Props = NativeStackScreenProps<RootStackParamList, 'Detalhes'>;
export default function Home({navigation}:Props) {
    const params=useRoute()    
    const [data,setData]=useState<Book[]>([])
    const [livro,setLivro]=useState<Book[]>([])
    const [isLoading, setLoading] = useState(true);
    const[pagina,setPagina]= useState(1);

    const [name,setName]=useState("");

    const getBook = async () => {
        const response = await fetch('https://books.ioasys.com.br/api/v1/books?page='+pagina+'&amount=25', {
            method: 'GET',
            headers: {
                accept: "application/json",
                'authorization': "Bearer "+params?.params?.authorization,
                'refresh-token':params?.params?.token, 
            },        
        });
        const json = await response.json();
        //console.log(json.data)
        setData(json.data)
        setLivro(json.data)
        setLoading(false);
    }

    useEffect(() => {
        getBook();
    }, []);

    const change= async()=>{    
         const nVetor = await livro.filter(function(user) {
            return user.title == name||user.authors.includes(name) || name==""
          })
         await setData(nVetor);    
    }
    
    const Banner =() => {
        return (
            <View style={{marginTop:10, padding: '10px' }}>                
                <FlatList                        
                    data={data}
                    renderItem={({ item }) => (
                        <ScrollView style={{ marginBottom: '36px' }}>
                           
                             {isLoading ? <ActivityIndicator/> : ( 
                            <TouchableOpacity style={{backgroundColor:"#fff",flexDirection:"row",padding:10,borderRadius:10}}
                                onPress={()=>{
                                    navigation.navigate("Detalhes",{
                                        id:item.id,
                                        authorization:params?.params?.authorization,
                                        token:params?.params?.token,                                        
                                        imageUrl:item.imageUrl,
                                        title:item.title,
                                        description:item.description,
                                        authors:item.authors,
                                        publisher:item.publisher,
                                        published:item.published,
                                        pageCount:item.pageCount,
                                        category:item.category,
                                        isbn10:item.isbn10,
                                        isbn13:item.isbn13,
                                        language:item.language,
                                    })
                                    //console.log(item.id)
                                }}
                            >
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
    <View style={{padding:10, backgroundColor:'#eee'}}>
      <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <Text style={{color:'#333333', width:'104.4px',height:'36px' ,fontSize:35,fontWeight:'bold',marginLeft:'5%', }}>ioasys</Text>
            <Text style={{color:'#333333', width:'104.4px',height:'36px', fontFamily:'Heebo',fontWeight:'300' ,fontSize:28,marginTop:'3%',marginLeft:'5%', }}>Books</Text>
            <TouchableOpacity style={{marginTop:12}}  onPress={()=>navigation.goBack()}>
                <Image source={require('../assets/sair.png')} style={{width:32,height:32}}/>
            </TouchableOpacity>
      </View>


      <View style={{flexDirection:'row',justifyContent:'space-around',marginLeft:12,marginTop:12}}>
            <View style={{padding:4,borderRadius:7, borderWidth:1}}>
                <View style={{flexDirection:'row', justifyContent:'center'}}>                
                    <TextInput
                        placeholder='Procure um livro'
                        onChangeText={setName}
                        value={name}
                        style={{
                            color:'#000',
                            fontSize:18,
                            width:206,          
                            height:40,
                            padding:10,
                        }}      
                    />
                    <TouchableOpacity onPress={()=>{change()}}>
                        <Image source={require('../assets/pesquisa.png')} style={{width:32,height:32, marginTop:10}}/>
                    </TouchableOpacity>
                </View>
            </View>  
            <Image source={require('../assets/filtro.png')} style={{width:32,height:32, marginTop:10}}/>      
      </View>
      
      <View style={{flexDirection:"row",justifyContent:"space-between", marginTop:10}}>
            
            <TouchableOpacity style={{borderRadius:100,backgroundColor:'#fff',padding:7}} onPress={()=>{
                if(pagina>1){
                setPagina(pagina-1);
                   getBook();
                }else{
                    alert("Já não existe livros")
                }
                }}            
            >
                <Image source={require('../assets/anterior.png')} style={{width:24,height:24}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{borderRadius:100,backgroundColor:'#fff',padding:7,marginLeft:28}} onPress={()=>{
                if(pagina<=20){
                    setPagina(pagina+1);
                    getBook();
                }else{
                    Alert.alert("Já não existe livros")
                }
                }}>
                <Image source={require('../assets/proximo.png')} style={{width:24,height:24}}/>
            </TouchableOpacity>
      </View>

      <View>
          <Banner/>
      </View>

    </View>
  )
}