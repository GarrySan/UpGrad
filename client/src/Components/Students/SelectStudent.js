import React from 'react';
import {initialStudents} from '../../initialStudents';
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { withRouter } from "react-router-dom";

class SelectStudent extends React.Component{
    constructor(){
        super();
        this.state = {
            studentId: 0
        }
    }
    changeId = (val) => this.setState({studentId: val});
    render(){
        const Students = initialStudents.map((student) => {
                return(<RadioButton
                    value={student.id}
                    label={student.name}
                    style={styles.radioButton}
                    />)
            });
        return(
            <Paper style={styles.container}>
                <h2 style={{...styles.header, borderBottom: 'solid 1px #ddd', paddingBottom: 20}}>Select your name</h2>
                <RadioButtonGroup defaultSelected={0} onChange={(e, value) => this.changeId(value)}>
                    {Students}
                </RadioButtonGroup>
                <div style={styles.bottomContainer}>
                    <p style={{...styles.header, fontSize: 15}}>Please Select your name to continue</p>
                    <div>
                        <button className="btn" style={styles.button}>Cancel</button>
                        <button className="btn" style={{...styles.button, borderColor: '#5c96ed', letterSpacing: 0.6, backgroundColor: '#5c96ed', color: 'white'}} onClick={() => this.props.history.push('/student/'+this.state.studentId)}>Login</button>
                    </div>
                </div>
            </Paper>
        )
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
    radioButton: {
      marginBottom: 25,
      textAlign: 'left',
      paddingLeft: 40,
      paddingTop: 15
    },
    header: {
        textAlign: 'left',
        fontFamily: 'Open Sans',
        color: '#555',
        paddingLeft: 40,
        paddingBottom: 0,
    },
    button: {
        fontSize: 21,
        margin: 15,
        borderRadius: 5,
        border: 'solid 1px #777',
        padding: '10px 20px 10px 20px',
        fontFamily: 'Open Sans',
        cursor: 'pointer'
    },
    bottomContainer:{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: "#fcfcfc",
        borderTop: 'solid 1px #ccc'
    },
}

export default (withRouter)(SelectStudent);