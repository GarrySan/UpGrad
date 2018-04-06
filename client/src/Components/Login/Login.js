import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { withRouter } from "react-router-dom";

class Login extends Component{
    constructor(){
        super();
        this.state = {
            mode: 'teacher'
        }
    }
    setMode = (val) => {
        this.setState({mode: val})
    }
    render(){
        return(
            <Paper style={styles.container} zDepth={0}>
                <h2 style={{...styles.header, borderBottom: 'solid 1px #ddd', paddingBottom: 20}}>Please select Login</h2>
                <h2 style={{...styles.header, fontSize: 21, marginTop: 50}}>I am a...</h2>
                <RadioButtonGroup name="loginOptions" defaultSelected="teacher" style={styles.options} onChange={(e,val) => this.setMode(val)}>
                    <RadioButton
                        value="student"
                        label="Student"
                        style={styles.radioButton}
                    />
                    <RadioButton
                        value="teacher"
                        label="Teacher"
                        style={styles.radioButton}
                    />
                </RadioButtonGroup>
                <div style={styles.bottomContainer}>
                    <p style={{...styles.header, fontSize: 15}}>Please Login to continue</p>
                    <div>
                        <button className="btn" style={styles.button}>Cancel</button>
                        <button className="btn" style={{...styles.button, borderColor: '#5c96ed', letterSpacing: 0.6, backgroundColor: '#5c96ed', color: 'white'}} onClick={() => this.state.mode=="teacher"?this.props.history.push('/questions'):this.props.history.push('/students')}>Login</button>
                    </div>
                </div>
            </Paper>
        );
    }
}

const styles = {
    container: {
        width: 700,
        marginTop: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        border: 'solid 1px #ddd',
        marginBottom: 100,
        borderRadius: 3
    },
    divider: {
        marginTop: 0,
        borderColor: "#ddd",
    },
    header: {
        textAlign: 'left',
        fontFamily: 'Open Sans',
        color: '#555',
        paddingLeft: 40,
        paddingBottom: 0,
    },
    radioButton: {
      marginBottom: 25,
      textAlign: 'left'
    },
    options: {
        marginLeft: 35,
        marginTop: 50
    },
    bottomContainer:{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: "#fcfcfc",
        borderTop: 'solid 1px #ccc'
    },
    button: {
        fontSize: 21,
        margin: 15,
        borderRadius: 5,
        border: 'solid 1px #777',
        padding: '10px 20px 10px 20px',
        fontFamily: 'Open Sans',
        cursor: 'pointer'
    }

}

export default withRouter(Login);