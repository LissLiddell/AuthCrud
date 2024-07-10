<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Contact</h4>
            </div>
            <form @submit.prevent="saveStudent" class="card-body">
                <div class="mb-3">
                    <label for="telefono">Telefono</label>
                    <input id="telefono" type="number" v-model="student.telefono" class="form-control" required/>
                </div>
                <div class="mb-3">
                    <input type="hidden" name="idUsuario" v-model="student.IdUsuario" value="6">
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>                
            </form>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';


export default {
  setup() {
     const student = ref({  telefono: '', idUsuario: '' })
     const store = useStore()
     const router = useRouter()


    // llamada de store
    const addStudent = computed(() => store.state.stApp.app.addStudent);
    const createStudent = (student) => store.dispatch('stApp/FcreateContact', student);


    const saveStudent = async () => {
      try {
          await createStudent(student.value)
          alert(addStudent.value.mensaje)      
          router.push({ name: 'students' });   
      } catch (error) {
        console.error("Error creating students:", error);
      }
    };

    return {
      student,
      saveStudent
    };
  }
};
</script>
