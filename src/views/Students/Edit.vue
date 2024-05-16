<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit Students</h4>
            </div>
            <div class="card-body">
                <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error,index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>
                <div class="mb-3">
                    <label for="">Name</label>
                    <input type="text" v-model="model.student.name" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Course</label>
                    <input type="text"  v-model="model.student.course"  class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Email</label>
                    <input type="text" v-model="model.student.email"  class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Phone</label>
                    <input type="text" v-model="model.student.phone"  class="form-control" />
                </div>
                <div class="mb-3">
                    <button type="button" @click="updateStudent" class="btn btn-primary">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'studentEdit',
  setup() {
    const studentId = ref('');
    const errorList = ref('');
    const model = ref({
      student: {
        name: '',
        course: '',
        email: '',
        phone: ''
      }
    });

    const idEstudiante = computed(() => store.state.stApp.app.idEstudiante);

    const obtenerEstudianteData = (params) => store.dispatch('stApp/obtenerEstudianteData')

    const getStudentData = async () =>{ await obtenerEstudianteData({students: idEstudiante.value});};

    const updateStudent = async () =>{
        await editarEstudiante({name: student.name.value, course: student.course.value, email: student.email.value, phone:student.phone.value})
      router.push({ name: 'students' }); 
    };

    // onMounted(() => {
    //   studentId.value = this.$route.params.id;
    //   getStudentData(studentId.value);
    // });

    return {
      studentId,
      errorList,
      model,
      updateStudent
    };
  }
};
</script>

