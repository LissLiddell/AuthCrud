<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit Students</h4>
            </div>
            <div class="card-body">
                <!-- <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error,index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul> -->
                <div class="mb-3">
                    <label for="">Name</label>
                    <input type="text" v-model="student.name" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Course</label>
                    <input type="text"  v-model="student.course"  class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Email</label>
                    <input type="text" v-model="student.email"  class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="">Phone</label>
                    <input type="text" v-model="student.phone"  class="form-control" />
                </div>
                <div class="mb-3">
                    <button type="button" @click="ChangeStudent(student.id)" class="btn btn-primary">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useStore } from 'vuex';
import { onMounted} from 'vue';
import { computed } from 'vue';

export default {
  setup() {
    const students = computed(() => store.state.stApp.app.students);
    const store = useStore();

    // const studentOneData = ref({
    //   name: '',
    //   course: '',
    //   email: '',
    //   phone: ''
    // });

    // llamada de store
    const oneStudent = (params) => store.dispatch('stApp/obtenerEstudianteData', params);


    const studentData = async (id) => {
      try {
          await oneStudent({id: id})    
          console.log('Datos enviados:', id);             
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };



    onMounted(() => {
        studentData(id);
    });

    return {
      students,
      studentData
    };
  }
};
</script>

