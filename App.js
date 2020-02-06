import React, { Component } from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,FlatList, TextInput, Button, Alert} from 'react-native';
import {Header,LearnMoreLinks,Colors,DebugInstructions,ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import Item from './src/item.js';

export default class LIstaTarefasOnline extends Component{

  constructor(props){
    super(props);
    this.state = {
      lista: [],
      input:''
    };

      this.url = 'https://b7web.com.br/todo/19127';
      this.loadLista = this.loadLista.bind(this);
      this.addTask = this.addTask.bind(this); 
      
      fetch(this.url)
    .then((r) => r.json())
    .then((json) =>{
      let s = this.state;
      s.lista = json.todo;
      this.setState(s);
    });
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
  }

  render(){
    return (
      <View style={styles.contanier}>        
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
    marginBottom:10
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
  }
});
