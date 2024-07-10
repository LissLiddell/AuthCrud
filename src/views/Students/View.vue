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
        <input v-model="filterText" placeholder="Filtrar..." />
        <br><br>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha Registro</th>
              <th>Telefono</th>
              <th>Usuario Agrega</th>
            </tr>
          </thead>
          <tbody v-if="filteredData.length > 0">
            <tr v-for="student in filteredData" :key="student.id">
              <td>{{ student.IdContacto }}</td>
              <td>{{ student.fechaRegistro }}</td>
              <td>{{ student.telefono }}</td>
              <td>{{ student.IdUsuario }}</td>
              <td>
                <RouterLink :to="{ path: '/students/Edit/'+student.id }" class="btn btn-success mx-2">
                  Update
                </RouterLink>
                <button type="button" @click="studentDeleted(student.id)" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="6">Loading....</td>
            </tr>
          </tbody> 
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import { computed, ref } from 'vue';

export default {
  setup() {
    const filterText = ref('');
    const store = useStore()
    const students = computed(() => store.state.stApp.app.students)

    // llamada de store
    const deleteStudent = (params) => store.dispatch('stApp/FdeleteContact', params)
    const resuDelStudents = computed(() => store.state.stApp.app.resuDelStudents)

    const filteredData = computed(() => {
      if (!filterText.value) {
        return students.value;
      }
      return students.value.filter(student =>
        student.name.toLowerCase().includes(filterText.value.toLowerCase())
      );
    });

    const getStudents = async () => {
      try {
        await store.dispatch('stApp/FgetContact')
        console.log('contactos', students)
      } catch (error) {
        console.error("Error fetching students:", error)
      }
    }

    const studentDeleted = async (id) => {
      try {
        if (confirm('Are you sure, you want to delete this data?')) {
          await deleteStudent({ id })
          alert(resuDelStudents.value.mensaje)
          getStudents()
        }
      } catch (error) {
        console.error("Error deleting student:", error)
      }
    };

    onMounted(() => {
      getStudents()
    })

    return {
      getStudents,
      filterText,
      filteredData,
      studentDeleted,
      students
    }
  }
}
</script>