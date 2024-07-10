export const state = () => ({
    sessionActive: false,
    token: '',
    username: '',
    resuDelStudents: null,
    students: [],
    student: null,
    addStudent: {
        name: '',
        course: '',
        email: '',
        phone: ''
    },
    updateStudent: null
})

export default state
  