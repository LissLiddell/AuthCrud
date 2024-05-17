<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Students</h4>
            </div>
            <form @submit.prevent="saveStudent" class="card-body">
                <!-- <ul class="alert alert-warning" v-if="Object.keys(errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error,index) in errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul> -->
                <div class="mb-3">
                    <label for="">Name</label>
                    <input type="text" v-model="student.name" class="form-control" required/>
                </div>
                <div class="mb-3">
                    <label for="">Course</label>
                    <input type="text"  v-model="student.course"  class="form-control" required/>
                </div>
                <div class="mb-3">
                    <label for="">Email</label>
                    <input type="email" v-model="student.email"  class="form-control" required/>
                </div>
                <div class="mb-3">
                    <label for="">Phone</label>
                    <input type="number" v-model="student.phone"  class="form-control" required/>
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

    const student = ref({
      name: '',
      course: '',
      email: '',
      phone: ''
    });

    // llamada de store
    const addStudent = computed(() => store.state.stApp.app.addStudent);
    const createStudent = (student) => store.dispatch('stApp/crearEstudiante', student);


    const saveStudent = async () => {
      try {
          await createStudent(student)
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
