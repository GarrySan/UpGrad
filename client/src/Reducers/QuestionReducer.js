
export const question = (state={questions: initialQuestions, students: initialStudents}, action) => {
    switch(action.type){
        case "SUBMIT_QUES":
            return Object.assign({}, state, {questions: [...state.questions, action.question]});
            break;
        case "ASSIGN_QUES":
            const studentList = action.students;
            var newStudents = state.students;
            for(var i=0; i<studentList.length;i++){
                const assignee = state.students.find((student) => student.id == studentList[i]);
                const allQuestions = assignee.questions.concat(action.questions);
                console.log(allQuestions);
                var b = [], finalQuestions=[];
                for(var j=0; j<allQuestions.length; j++){
                    b[allQuestions[j]]=1;
                }
                for(var k=0; k<b.length;k++){
                    if(b[k])
                        finalQuestions.push(k);
                }//this is being done to avoid double assigning the same question to the same student
                console.log(b);
                console.log(finalQuestions);
                const newStudent = Object.assign({}, assignee, {questions: finalQuestions});
                const index = state.students.indexOf(assignee);
                newStudents[index] = newStudent;
            }
            return Object.assign({}, state, {students: newStudents});
            break;
        case 'persist/REHYDRATE':
            return {...state, persistedState: action.payload}
    }
}

const initialQuestions = [
    {
        title: "Creating external table with partition and adding data to it",
        description: "Why there are no airplanes visible in satelite mode of google maps",
        type: "Submission"
    },
    {
        title: "Buying a house in Bangalore",
        description: "Do you regret buying it?",
        type: "Passage"
    },
    {
        title: "Drive responsibly on the road",
        description: "If i am driving at 65 miles per hour and I take the ignition off what happens then. Explain using examples",
        type: "Passage"
    }
];


const initialStudents = [
    {
        id: 0,
        name: "Gaurav Sangle",
        questions: []
    },
    {
        id: 1,
        name: "Karan Sharma",
        questions: []
    },
    {
        id: 2,
        name: "Soham Patil",
        questions: []
    },
    {
        id: 3,
        name: "Nishad Kulkarni",
        questions: []
    },
    {
        id: 4,
        name: "Parul Pandit",
        questions: []
    }
]