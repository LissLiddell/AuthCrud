<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit Students</h4>
            </div>
            <div class="card-body" v-if="editedStudent"> 
                           
                <div class="mb-3">
                    <label for="">Name</label>
                    <input type="text" v-model="editedStudent.name" class="form-control" required/>
                </div>
                <div class="mb-3">
                    <label for="">Age</label>
                    <input type="text"  v-model="editedStudent.age"  class="form-control" required/>
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
                    <button type="button" :disabled="!hasChanges" @click="btnFupdateContact(editedStudent.id)"
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
    const editedStudent = ref({ name: '', age: '', email: '', phone: '' })
    const originalStudent = ref(null)
    const router = useRouter()
    const store = useStore()

    // llamada de store
    const FupdateContact = (params) => store.dispatch('stApp/FupdateContact', params);
    const FgetContactID = (studentId) => store.dispatch('stApp/FgetContactID', studentId)
    const student = computed(() => store.state.stApp.app.student)
    const updateStudent = computed(() => store.state.stApp.app.updateStudent)
    

    const btnFupdateContact = async (id) => {
        try {
          await FupdateContact({id: id, editedStudent: editedStudent.value})
          alert(updateStudent.value.mensaje)      
          router.push({ name: 'students' });   
      } catch (error) {
        console.error("Error updating students:", error);
      }
    }

    const getStudentID = async (studentId) => {
      try {
          await FgetContactID(studentId)
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
        btnFupdateContact,
        editedStudent,
        hasChanges        
    }
  }
}
</script>

