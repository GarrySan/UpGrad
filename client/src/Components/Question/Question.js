import React from 'react';
import Textarea from "react-textarea-autosize";
import './Question.css';
import Checkbox from 'material-ui/Checkbox';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../Actions/QuestionActions.js';
import { withRouter } from "react-router-dom";
import { compose } from 'recompose';

class Question extends React.Component{
    constructor(){
        super();
        this.state = {
            multiChoice: []
        }
        this.selectAnswer = this.selectAnswer.bind(this);
        this.constructQuestion = this.constructQuestion.bind(this);
    }
    selectAnswer = (val, bool) => {
        if(bool){
            this.setState({multiChoice: [...this.state.multiChoice, val]});
        }
        else{
            var arr = this.state.multiChoice;
            this.setState({multiChoice: arr.filter(e => e!=val)})
        }
    }
    constructQuestion = () => {
        console.log(this.question.value);
        console.log(this.inst.value+this.desc.value);
        const question = {
            title: this.question.value,
            description: this.desc.value,
            instructions: this.inst.value,
        }
        if(this.props.questionType==="multipleType"){
            const multiObj = {
                type: "Multiple",
                multiChoice: this.state.multiChoice,
                optionA: this.optionA.value,
                optionB: this.optionB.value,
                optionC: this.optionC.value,
                optionD: this.optionD.value
            }
            Object.assign(question, multiObj);
        }
        else if(this.props.questionType==="passageType"){
            question["type"] = "Passage";
            question["idealAnswer"] = this.ideal.value;
        }
        else{
            question["type"] = "Submission";
        }
        this.props.addQuestion(question);
        //store.dispatch({ type: 'SUBMIT_QUES', ques: question});
        console.log(this.props.state);
        //console.log(question);
    }
    render(){
        return(
            <div>
                <div style={styles.container}>
                    <h3 style={styles.text}>Question title:</h3>
                    <Textarea style={styles.textarea} className="text-box" placeholder="Type your question here" inputRef={question => this.question=question}/>
                    <h3 style={styles.text}>Question description:</h3>
                    <Textarea style={styles.textarea} className="text-box" placeholder="Type your question description here" inputRef={desc => this.desc = desc}/>
                    {this.props.questionType==="passageType"?
                    <div>
                            <h3 style={styles.text}>Ideal answer:</h3>
                            <Textarea style={styles.textarea} className="text-box" placeholder="Type your answer here" inputRef={ideal => this.ideal = ideal}/>
                    </div>:
                    this.props.questionType==="multipleType"?
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'left'}}>
                        <div style={{display: 'flex', width: '100%'}}>
                            <h3 style={{...styles.text, width: '88%', display: 'inline-block', paddingTop: 15}}>Answer options:</h3>
                            <h3 style={{...styles.text, width: '12%', paddingTop: 10}}>Right Answers:</h3>
                        </div>
                        <div style={{display: 'flex', width: '100%'}}>
                            <Textarea style={{...styles.textarea, width: '80%'}} className="text-multiple" placeholder="Type Option A here" inputRef={option => this.optionA = option}/>
                            <Checkbox style={{width: '10%', paddingLeft: 100, paddingTop: 25}} onCheck={(e, bool) => {this.selectAnswer("A", bool)}}/>
                        </div>
                        <div style={{display: 'flex', width: '100%'}}>
                            <Textarea style={{...styles.textarea, width: '80%'}} className="text-multiple" placeholder="Type Option B here" inputRef={option => this.optionB = option}/>
                            <Checkbox style={{width: '10%', paddingLeft: 100, paddingTop: 25}} onCheck={(e, bool) => {this.selectAnswer("B", bool)}}/>
                        </div>
                        <div style={{display: 'flex', width: '100%'}}>
                            <Textarea style={{...styles.textarea, width: '80%'}} className="text-multiple" placeholder="Type Option C here" inputRef={option => this.optionC = option}/>
                            <Checkbox style={{width: '10%', paddingLeft: 100, paddingTop: 25}} onCheck={(e, bool) => {this.selectAnswer("C", bool)}}/>
                        </div>
                        <div style={{display: 'flex', width: '100%'}}>
                            <Textarea style={{...styles.textarea, width: '80%'}} className="text-multiple" placeholder="Type Option D here" inputRef={option => this.optionD = option}/>
                            <Checkbox style={{width: '10%', paddingLeft: 100, paddingTop: 25}} onCheck={(e, bool) => {this.selectAnswer("D", bool)}}/>
                        </div>
                    </div>
                    :null}
                    <h3 style={styles.text}>Type instructions here:</h3>
                    <Textarea style={styles.textarea} className="text-box" placeholder="Type your instructions here...(eg. file size, file format, dos and donts etc" inputRef={inst => this.inst = inst}/>
                </div>
                <div style={styles.footer}>
                    <h3 style={{...styles.text, fontSize: 16, paddingTop: 30, paddingLeft: 140}}>Click author to add a new question which will be added to the question list</h3>
                    <div style={{position: 'relative', top: -50, left: 220}}>
                        <button className="btn" style={styles.button} onClick={() => this.props.history.push('/questions')}>Cancel</button>
                        <button className="btn" style={{...styles.button, borderColor: '#5c96ed', letterSpacing: 0.6, backgroundColor: '#5c96ed', color: 'white'}} onClick={() => {this.constructQuestion(); this.props.history.push('/questions')}}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }

}


const styles = {
    container: {
        width: '85%'
    },

    text:{
        textAlign: 'left',
        fontFamily: 'Open Sans',
        fontSize: 19
    },
    textarea: {
        backgroundColor: '#fbfbfb',
        width: '100%',
        fontSize: 21,
        padding: 15,
        borderRadius: 5,
        borderColor: '#dfdfdf'
    },
    footer: {
        backgroundColor: '#fbfbfb',
        height: 140,
        width: '130%',
        marginLeft: -140
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

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addQuestion: (ques) => dispatch(actions.submitQuestion(ques)),
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(Question);