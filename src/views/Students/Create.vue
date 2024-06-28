<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Contact</h4>
            </div>
            <form @submit.prevent="saveStudent" class="card-body">
                <div class="mb-3">
                    <label for="name">Name</label>
                    <input id="name" type="text" v-model="student.name" class="form-control" required/>
                </div>
                <div class="mb-3">
                    <label for="Age">Age</label>
                    <input id="Age" type="number"  v-model="student.age"  class="form-control" required/>
                </div>
                <div class="mb-3">
                    <label for="Email">Email</label>
                    <input id="Email" type="email" v-model="student.email"  class="form-control" required/>
                </div>
                <div class="mb-3">
                    <label for="Phone">Phone</label>
                    <input id="Phone" type="number" v-model="student.phone" maxlength="10" class="form-control" required/>
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
    const store = useStore();
    const router = useRouter();

    const student = ref({ id: 0, name: '', age: '', email: '',  phone: '' });

    // llamada de store
    const addStudent = computed(() => store.state.stApp.app.addStudent);
    const createStudent = (student) => store.dispatch('stApp/crearEstudiante', student);


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
