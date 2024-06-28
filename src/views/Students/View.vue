<template>
      <br>
      <div class="container"> 
        <div class="card">
         <div class="card-header">
            <h4>
                  Contacts
                  <RouterLink to="/students/create" class="btn btn-primary float-end">
                  Add Contact
                  </RouterLink>
            </h4>
         </div>
         <div class="card-body"> 
            <table class="table table-bordered">
                  <thead>
                        <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Age</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Action</th>
                        </tr>
                  </thead>
                   <tbody v-if="students && students.length > 0">
                        <tr v-for="student in students" :key="student.id">
                              <td>{{ student.id }}</td>
                              <td>{{ student.name }}</td>
                              <td>{{ student.age }}</td>
                              <td>{{ student.email }}</td>
                              <td>{{ student.phone }}</td>
                              <td>
                                <RouterLink  :to="{ path: '/students/Edit/'+student.id}" class="btn btn-success mx-2">
                                 Update
                                </RouterLink>
                                <button type="button" @click="studentDeleted(student.id)" class="btn btn-danger">Delete</button>
                              </td>
                        </tr>
                  </tbody> 
                  <tbody v-else>
                        <tr>
                               <td colspan="7">Loading....</td>
                        </tr>
                  </tbody> 
            </table>
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
    const students = computed(() => store.state.stApp.app.students)
    const store = useStore();

    // llamada de store
    const resuDelStudents = computed(() => store.state.stApp.app.resuDelStudents)
    const deleteStudent = (params) => store.dispatch('stApp/eliminarEstudiante', params)


    const studentDeleted = async (id) => {
      try {
        if(confirm('Are you sure, you wan delete this data?')){
          await deleteStudent({ id })
          alert(resuDelStudents.value.mensaje)
          getStudents()
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    const getStudents = async () => {
      try {
        await store.dispatch('stApp/obtenerEstudiantes');
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    onMounted(() => {
      getStudents();
    });

    return {
      students,
      getStudents,
      studentDeleted
    };
  }
};
</script>

