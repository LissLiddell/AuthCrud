<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit Students</h4>
            </div>
 <!-- <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error,index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul> -->
            <div class="card-body" v-if="editedStudent">
                           
                <div class="mb-3">
                    <label for="">Name</label>
                    <input type="text" v-model="editedStudent.name" class="form-control" required/>
                </div>
                <div class="mb-3">
                    <label for="">Course</label>
                    <input type="text"  v-model="editedStudent.course"  class="form-control" required/>
                </div>
                <div class="mb-3">
                    <label for="">Email</label>
                    <input type="email" v-model="editedStudent.email"  class="form-control" required/>
                </div>
                <div class="mb-3">
                    <label for="">Phone</label>
                    <input type="number" v-model="editedStudent.phone"  class="form-control" required/>
                </div>
                <div class="mb-3">
                    <button type="button" :disabled="!hasChanges" @click="changeStudent(editedStudent.id)"
                        class="btn btn-primary">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const originalStudent = ref(null)
    const editedStudent = ref({ name: '', course: '', email: '', phone: '' })

    // llamada de store
    const student = computed(() => store.state.stApp.app.student)
    const obtenerEstudianteID = (studentId) => store.dispatch('stApp/obtenerEstudianteID', studentId)
    const updatedStudent = (params) => store.dispatch('stApp/editarEstudiante', params);

    const changeStudent = async (id) => {
        try {
          await updatedStudent({id: id, editedStudent: editedStudent.value})
          //console.log(editedStudent.value)
        //   alert(updateStudent.value.mensaje)      
        //   router.push({ name: 'students' });   
      } catch (error) {
        console.error("Error updating students:", error);
      }
    }

    const getStudentID = async (studentId) => {
      try {
          await obtenerEstudianteID(studentId)
      } catch (error) {
        console.error("Error get student:", error)
      }
    }

    const hasChanges = computed(() =>
        JSON.stringify(originalStudent.value) !== JSON.stringify(editedStudent.value))

    onMounted(async() => {
        await getStudentID(router.currentRoute.value.params.id)
        originalStudent.value = JSON.parse(JSON.stringify(student.value))
        editedStudent.value = JSON.parse(JSON.stringify(student.value))
    })

    return {
        changeStudent,
        hasChanges,
        editedStudent
    }
  }
}
</script>

