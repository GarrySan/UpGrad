import React from 'react';
import Paper from 'material-ui/Paper';
import { withRouter } from "react-router-dom";

class TopBar extends React.Component{
    render(){
        return(
            <Paper style={styles.container}>
                <img src="http://c.fastcdn.co/t/f8c127f9/defef0de/1506372107-20549666-210x140-UpGrad-logo.png" style={styles.logo} onClick={() => this.props.history.push('/')}/>
            </Paper>
        )   
    }
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'left',
        width: '100%'
    },
    logo: {
        height: 80,
        marginLeft: 50,
        cursor: 'pointer'
    }
}

export default (withRouter)(TopBar);