import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Question from './Question.js';
export default class QuestionBuilder extends React.Component{
    constructor(){
        super();
        this.state = {
            questionType: "multipleType",
        }
    }
    render(){
        return(
            <div style={styles.container}>
                <h3 style={{...styles.text, fontSize: 24}}>Question Builder</h3>
                <h4 style={styles.text}>What type of question do you want to build?</h4>
                <RadioButtonGroup name="questionOptions" defaultSelected="multipleType" style={styles.options} onChange={(e, val) => this.setState({questionType: val})}>
                    <RadioButton
                        value="multipleType"
                        label="Multiple Type Question"
                        labelStyle={{fontSize: 17, paddingTop: 3}}
                        style={styles.radioButton}
                    />
                    <RadioButton
                        value="submissionType"
                        label="Submission Type Question"
                        labelStyle={{fontSize: 17, paddingTop: 3}}
                        style={styles.radioButton}
                    />
                    <RadioButton
                        value="passageType"
                        label="Passage(text) Type Question"
                        labelStyle={{fontSize: 17, paddingTop: 3}}
                        style={styles.radioButton}
                    />
                </RadioButtonGroup>
                <Question questionType={this.state.questionType}/>
            </div>
        )
    }
}

const styles = {
    container:{
        marginTop: 50,
        marginLeft: 140
    },
    text:{
        textAlign: 'left',
        fontFamily: 'Open Sans',
        fontSize: 19
    },
    options: {
    },
    radioButton: {
        textAlign: 'left',
        marginTop: 20,
    }
}