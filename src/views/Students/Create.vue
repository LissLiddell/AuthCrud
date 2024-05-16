<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Students</h4>
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
                    <button type="button" @click="saveStudent" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, reactive } from 'vue';
import { computed } from 'vue';

export default {
 name: 'studentCreate',
  setup() {
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

    const crearEstudiante = (params) => store.dispatch('stApp/crearEstudiante', params);

    const saveStudent = async () =>{
        await crearEstudiante({name: student.name.value, course: student.course.value, email: student.email.value, phone:student.phone.value})
        router.push({ name: 'students' });
    }

    return {
      errorList,
      model,
      saveStudent
    };
  }
};
</script>