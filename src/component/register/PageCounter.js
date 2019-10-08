import React from 'react';
import {View , Image, StyleSheet} from 'react-native';


export default (props) => {
    const {page} = props;

    const Dots = ({index}) => {
        const src = {uri : (page==index) ? 'pageindecatoractivate': 'pageindecatordeactivate'};
        return <Image style={styles.dot} source = {src} /> 
    }
    return <View style={styles.container}>
        <Dots index={0}/>
        <Dots index={1}/>
        <Dots index={2}/>
    </View>
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        marginLeft : 12.5,
        marginBottom : 11,
    },
    dot : {
        width : 4,
        height : 4,
        marginTop:21,
        marginBottom : 0,
        marginLeft : 4,
        marginRight : 4
    }

})