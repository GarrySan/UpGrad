import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';


class Student extends React.Component{
    render(){
        console.log(this.props)
        return(
            <div style={styles.container}>
                <h3 style={{...styles.text, fontSize: 28}}>Assigned questions:</h3>
                {this.props.state?
                this.props.state.students[this.props.id].questions.map((question, index) => {
                    const ques = this.props.state.questions[question];
                    return (
                        <div style={{width: '80%', marginTop: 20}}>
                        <Paper style={{...styles.barContainer, width: '95%'}}>
                        <div style={styles.questionNo}>
                            <p style={{...styles.text, fontSize: 15, paddingLeft: 15}}>S.No.</p>
                            <h3>{index+1}.</h3>
                        </div>
                        <div style={styles.middleContainer}>
                            <h3 style={{textAlign: 'left',paddingLeft: 40, width: '85%', paddingTop: 5, marginBottom: 0 }}>{ques.title}</h3>
                            <p style={{...styles.text, fontSize: 16,paddingLeft: 40, width: '85%', paddingTop: 5, marginTop: 0, maxHeight: 30, overflowY: "hidden" }}>{ques.description.substr(0, 65)}{ques.description.length>65?"...":null}</p>
                        </div>
                        <div style={styles.lastContainer}>
                            <h3>QUESTION TYPE<br/><span style={styles.text}>{ques.type}</span></h3>
                        </div>
                    </Paper>
                    </div>
                    );
                }):<h3 style={styles.text}>You havent been assigned any questions yet.</h3>}
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {state: state};
}
const mapDispatchToProps = (dispatch) => {return {}};

const styles = {
    container: {
        marginLeft: 140,
        width: '80%',
    },
    barContainer: {
        display: 'flex',
        width: '80%',
        borderRadius: 5,
        border: 'solid 1px #ddd'
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
    text:{
        textAlign: 'left',
        fontFamily: 'Open Sans',
        fontSize: 19
    },
    leftContainer: {background: 'white', display: 'flex', width:'15%', borderTopLeftRadius: 7, borderBottomLeftRadius: 7, borderRight: 'solid 1px #ddd'},
    rightContainer: {background: '#fbfbfb', display: 'flex', width: '85%', borderTopRightRadius: 7, borderBottomRightRadius: 7},
    questionNo: {
        background: '#fbfbfb',
        width: '8%',
        borderRight: 'solid 1px #ddd'
    },
    middleContainer: {
        background: 'white',
        width: '70%'
    },
    lastContainer: {
        background: '#fbfbfb',
        width: '22%',
        borderLeft: 'solid 1px #ddd'
    },
    check: {
        paddingLeft: 10,
        marginTop: 20
    },
    dialog: {
        borderRadius: 5
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Student);