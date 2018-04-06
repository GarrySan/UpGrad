import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { initialQuestions } from '../../InitialQuestions';
import { withRouter } from "react-router-dom";
import { compose } from 'recompose';
import { initialStudents } from '../../initialStudents';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../../Actions/QuestionActions.js';

class Questions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open: false,
            allSelect: false,
            questions: [],
            students: []
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.assignQuestions = this.assignQuestions.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.removeStudent = this.removeStudent.bind(this);
        this.selectAll = this.selectAll.bind(this);
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    assignQuestions = () => {
        this.props.assignQuestion(this.state.questions,this.state.students);
        this.setState({questions: [], students: []});
        this.setState({allSelect: false});
        //this.selectAll(false);
        console.log(this.check.props);
    };

    addQuestion = (ques) => {
        this.setState({questions: [...this.state.questions, ques]});
    }

    removeQuestion = (ques) => {
        const questions = this.state.questions;
        this.setState({questions: questions.filter((question) => question!=ques)});
        console.log(this.state.questions);
    }

    addStudent = (student) => {
        this.setState({students: [...this.state.students, student]});
    }

    removeStudent = (stu) => {
        const students = this.state.students;
        this.setState({students: students.filter((student) => student!=stu)});
        console.log(this.state.students);
    }

    selectAll = (bool) => {
        console.log(bool);
        
        if(bool&&this.props.state){
            console.log('here')
            const allQuestions = this.props.state.questions.map((question) => question.id);
            this.setState({questions: allQuestions, allSelect: true});
        }
        else if(bool){
            console.log(initialQuestions)
            const allQuestions = initialQuestions.map((question, index) => index);
            console.log(allQuestions);
            this.setState({questions: allQuestions, allSelect: true});
        }
        else{
            console.log('in here')
            this.setState({questions: [], allSelect: false});
        }
    }

    render(){
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={() => {this.handleClose();this.assignQuestions()}}
            />,
          ];

          const radios = [];
          for (let i = 0; i < initialStudents.length; i++) {
            radios.push(
              <Checkbox
                key={i}
                value={`value${i}`}
                label={initialStudents[i].name}
                style={styles.check}
                ref={(check) => this.check=check}
                onCheck={(e, bool) => {bool?this.addStudent(i):this.removeStudent(i)}}
              />
            );
        }

        return(
            <div style={styles.container}> 

                <Dialog
                    title="Student List"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                    style={styles.dialog}
                    >
                    <div>
                        {radios}
                    </div>
                </Dialog>

                <h3 style={styles.text}>Question List:</h3>
                <Paper style={styles.barContainer}>
                    <div style={styles.leftContainer}>
                        <Checkbox style={{width: 70, paddingTop: 25}} onCheck={(e, bool) => this.selectAll(bool)} checked={this.state.allSelect?true:false}/>
                        <p style={{...styles.text, paddingTop: 5, marginLeft: -20}}>Select all</p>
                    </div>
                    <div style={styles.rightContainer}>
                        <h3 style={{...styles.text, paddingLeft: 40, width: '45%', paddingTop: 5 }}>Select questions to assign</h3>
                        <button className="btn" style={{...styles.button, borderColor: '#5c96ed', letterSpacing: 0.6, backgroundColor: '#5c96ed', color: 'white'}} onClick={this.handleOpen}>Assign</button>
                        <button className="btn" style={{...styles.button, backgroundColor: 'white', borderColor: '#5c96ed', color: '#5c96ed'}} onClick={() => this.props.history.push('/question-builder')}>Author new question</button>
                    </div>
                </Paper>



                {this.props.state?
                this.props.state.questions.map((ques, index) => {
                return (
                <div style={{display: 'flex', width: '80%', marginTop: 20}}>
                    <div>
                        <Checkbox style={{paddingTop: 30, paddingLeft: 5, paddingRight: 15}} onCheck={(e, bool) => {bool?this.addQuestion(index):this.removeQuestion(index)}} checked={this.state.questions.includes(index)?true:false}/>
                    </div>
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
                </div>)
                }):
                initialQuestions.map((ques, index) => {
                    return (
                    <div style={{display: 'flex', width: '80%', marginTop: 20}}>
                        <div>
                            <Checkbox style={{paddingTop: 30, paddingLeft: 5, paddingRight: 15}} value={index} onCheck={(e, bool) => {bool?this.addQuestion(index):this.removeQuestion(index)}} checked={this.state.questions.includes(index)?true:false}/>
                        </div>
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
                                <h3>QUESTION TYPE<br/>{ques.type}</h3>
                            </div>
                        </Paper>
                    </div>)
                })}
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {state: state};
}

const mapDispatchToProps = (dispatch) => {
    return {
        assignQuestion : (questions, students) => dispatch(actions.assignQuestion(questions, students)),
    }
}

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

export default compose(connect(mapStateToProps, mapDispatchToProps),withRouter)(Questions);

