import React, { Component } from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,FlatList, TextInput, Button, Alert, ImageBackground
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import {Header,LearnMoreLinks,Colors,DebugInstructions,ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import Item from './src/item.js';

export default class LIstaTarefasOnline extends Component{

  constructor(props){
    super(props);
    this.state = {
      lista: [],
      input:'',
      netStatus: 0
    };

      this.url = 'https://b7web.com.br/todo/19127';
      this.loadLista = this.loadLista.bind(this);
      this.addTask = this.addTask.bind(this); 
      this.conEvent = this.conEvent.bind(this);      
      
     this.loadLista();
  }


  conEvent(info){
    let state = this.state
    if(info.type == false){
      state.netStatus = 0;
    } else {
      state.netStatus = 1;
    }
    this.setState(state);
  }

  loadLista(){
    fetch(this.url)
    .then((r) => r.json())
    .then((json) =>{
      let s = this.state;
      s.lista = json.todo;
      this.setState(s);
    });
  }

  addTask(){
    let texto = this.state.input;
    if(texto == ''){
      alert("Atenção, campo vazio!");
      return false;
    }
    let s = this.state;
    s.input = '';
    this.setState(s);
    
    if(this.state.netStatus ==1){
      fetch(this.url, {
        method: 'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          item: texto
        })
      })
        .then((r) => r.json())
        .then((json) => {        
          this.loadLista();
        })
    } else {
      alert.Alert('Falha','Erro ao adicionar o Item, você está sem conexão com a internet');
    }
  }

  render(){
    return (
      <View style={styles.contanier}>
        <ImageBackground source={require('./src/imagens/background1.png')} style={styles.bgImage}>
        <View style={styles.addArea}>
        <Text style={styles.tituloText}>Lista de Tarefas</Text>
          <Text style={styles.addText}> Adicione uma nova Tarefa</Text>  
          <TextInput style={styles.input} onChangeText={(text)=> {
           let s = this.state;
           s.input = text;
           this.setState(s);
          }} value={this.state.input}/>
          <Button title="Adicionar" onPress={this.addTask} style={styles.botaoAdd}/>
        </View> 
        <FlatList data={this.state.lista} renderItem={({item})=> <Item data={item} url={this.url} loadFunction={this.loadLista} />}
        keyExtractor={(item, index) => (item.id)}
        />
        <View style={styles.statusView}>
          <Text style={styles.statusText}>{this.state.netStatus} </Text>
        </View>
        </ImageBackground>        
      </View> 
    );
  }
};

const styles = StyleSheet.create({
  contanier: {
    flex:1
    
  },
  addArea: {
    marginBottom: 20,
    backgroundColor: '#DDDDDD'
  },
  input:{
    height: 40,
    backgroundColor:'#CCCCCC',
    marginLeft: 20,
    marginRight:20,
    paddingLeft:10,
    paddingRight:10,
    marginBottom:10,
    borderRadius:400
  },
  addText:{
    fontSize:15,
    textAlign: 'center',
    marginBottom:10,
    marginTop:10
  },
  botaoAdd:{
    marginTop:20
  },
  tituloText:{
    fontSize:20,
    alignItems:'center',
    justifyContent: 'center',
    textAlign: 'center',
    color:'#0275d8',
    fontWeight:'bold'
  },
  bgImage:{
    flex: 1,
    width: null
  },
  statusView:{
    height:50    
  },
  statusText:{
    fontSize:23,
    textAlign:'center'
  }
});
