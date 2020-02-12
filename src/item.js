import React, { Component } from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,FlatList, TouchableHighlight, Button, Image} from 'react-native';

export default class Item extends Component {

    constructor(props){
        super(props);
        this.state ={
            done: (this.props.data.done == '1')? styles.done: styles.undone
        };
        this.concluirTask = this.concluirTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this) ;
    }

    concluirTask(){
        let s = this.state;
        let done = 'sim';

        if(s.done == styles.undone){
            s.done = styles.done;
            done = 'sim';
        } else {
            s.done = styles.undone;
            done = 'nao';
        }

        fetch(this.props.url +'/'+this.props.data.id, {
            method: 'PUT',
            headers:{
              'Accept':'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              done:done
            })
          })
            .then((r) => r.json())
            .then((json) => {})

        this.setState(s);
    }

    deleteTask(){    
        fetch(this.props.url +'/'+this.props.data.id, {
            method: 'DELETE',
            headers:{
              'Accept':'application/json',
              'Content-Type': 'application/json'
            },            
          })
            .then((r) => r.json())
            .then((json) => {                
                this.props.loadFunction();
            })
    }

    render(){
        return(
            <View style={styles.area}>
                <TouchableHighlight style={[styles.marcarArea, this.state.done]} onPress={this.concluirTask}>
                    <View></View>
                </TouchableHighlight>
                <View style={styles.viewItem}>
                    <Text style={styles.tituloItem}>{this.props.data.item}</Text>       
                    <View style={styles.viewClear}>
                    <TouchableHighlight style={styles.botaoDelete} onPress={this.deleteTask}>                
                        <Image source={require('./imagens/clear.png')} style={styles.imagemLixeira}/>            
                    </TouchableHighlight>
                    </View>
                </View>
               
            </View>
        );
    }
}
const styles = StyleSheet.create({ 
    area:{
        paddingTop:10,
        paddingBottom: 10,
        marginBottom:10,
        borderBottomWidth: 1,
        borderColor: '#CCCCCC',
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    marcarArea:{
      width: 30,
      height: 30,
      margin:10,
      borderRadius:10        
    },
    undone:{
        backgroundColor: '#CCCCCC'
    },
    done:{
        backgroundColor: '#5cb85c'
    },
    imagemLixeira:{
        width:30,
        height:30,                        
    },
    tituloItem:{
        fontSize: 14,
        fontWeight: 'bold'
    },
    viewItem:{
        flexDirection:'column',
        flex: 1,              
    },
    viewClear:{
        alignItems: 'flex-end',
               
    }
});