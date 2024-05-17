export const state = () => ({
    sessionActive: false,
    token: '',
    username: '',
    resuDelStudents: null,
    students: [],
    addStudent: {
        name: '',
        course: '',
        email: '',
        phone: ''
    },
    updateStudent: {
        name: '',
        course: '',
        email: '',
        phone: ''
    },
    studentData: null
})

export default state
  