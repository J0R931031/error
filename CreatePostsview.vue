<template>
  <BarAdmin />

  <v-container class="create-posts">
    <v-row>
      <v-col cols="12">
        <h1>Crear Publicación</h1>
      </v-col>
    </v-row>
    <v-form @submit.prevent="submitForm">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Título"
            v-model="post.title"
            outlined
            required
          ></v-text-field>
          <v-textarea
            label="Descripción"
            v-model="post.content"
            outlined
            required
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="6">
          <div class="image-upload">
            <v-avatar size="200" class="mb-3">
              <v-img :src="previewImage" contain></v-img>
            </v-avatar>
            <v-btn color="primary" @click="selectImage">
              Adjuntar Imagen
            </v-btn>
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              @change="onFileChange"
              style="display: none;"
            />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn type="submit" color="primary" class="mt-3">Publicar</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
import BarAdmin from '@/components/barAdmin.vue';
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePostStore } from '@/stores/postStore';

const router = useRouter();
const postStore = usePostStore();
const post = reactive({
  title: '',
  content: '',
  image: ''
});
const previewImage = ref(null);
const fileInput = ref(null);

const selectImage = () => {
  fileInput.value.click();
};

const onFileChange = (e) => {
  const file = e.target.files[0];
  previewImage.value = URL.createObjectURL(file);
  postStore.setPreviewImage(previewImage.value);
};

const resetForm = () => {
  post.title = '';
  post.content = '';
  previewImage.value = null;
  postStore.setPreviewImage(null);
};

const submitForm = () => {
  post.image = previewImage.value;
  console.log(post);  // Verificar los datos que se están enviando
  postStore.addPost(post);
  resetForm();
  router.push('/posts');
};

onMounted(() => {
  previewImage.value = postStore.getPreviewImage();

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      previewImage.value = postStore.getPreviewImage();
    }
  });
});
</script>

<style scoped>
.create-posts {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
  color: #333;
}

.image-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 768px) {
  .create-posts {
    margin: 20px auto;
    padding: 10px;
  }

  h1 {
    font-size: 24px;
  }

  .v-avatar {
    width: 150px;
    height: 150px;
  }

  .v-btn {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .create-posts {
    margin: 10px auto;
    padding: 5px;
  }

  h1 {
    font-size: 20px;
  }

  .v-avatar {
    width: 100px;
    height: 100px;
  }

  .v-btn {
    font-size: 14px;
  }
}
</style>
