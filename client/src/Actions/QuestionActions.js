export const submitQuestion = (ques) => {
    console.log(ques);
    return {question: ques,type: "SUBMIT_QUES"};
}

export const assignQuestion = (questions, students) => {
    console.log(questions);
    console.log(students);
    return {questions: questions, students: students, type: "ASSIGN_QUES"};
}