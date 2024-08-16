<template>
  <BarAdmin />
  <v-container class="posts">
    <v-row>
      <v-col cols="12">
        <h1>Publicaciones</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" class="mb-3" @click="goToCreateForm">Añadir Publicación</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="post in posts" :key="post.id" cols="12" md="6" lg="4">
        <v-card class="mx-auto" max-width="400">
          <v-img :src="post.image" height="200px"></v-img>
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-text>{{ post.content }}</v-card-text>
          <v-card-actions>
            <v-btn color="error" @click="deletePost(post.id)">Eliminar Post</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import BarAdmin from '@/components/barAdmin.vue';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePostStore } from '@/stores/postStore';

const postStore = usePostStore();
const posts = computed(() => {
  console.log('Current posts:', postStore.posts);  // Verifica que los posts se están actualizando
  return postStore.posts;
});

const router = useRouter();

const goToCreateForm = () => {
  router.push({ name: 'AñadirPost' });
};

const deletePost = (id) => {
  postStore.deletePost(id);
};

onMounted(() => {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      postStore.$patch((state) => {
        state.posts = [...state.posts];
      });
    }
  });
});
</script>

<style scoped>
.posts {
  max-width: 1200px;
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

.v-btn {
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .posts {
    margin: 20px auto;
    padding: 10px;
  }

  h1 {
    font-size: 24px;
  }

  .v-card-title {
    font-size: 18px;
  }

  .v-card-text {
    font-size: 14px;
  }

  .v-btn {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .posts {
    margin: 10px auto;
    padding: 5px;
  }

  h1 {
    font-size: 20px;
  }

  .v-card-title {
    font-size: 16px;
  }

  .v-card-text {
    font-size: 12px;
  }

  .v-btn {
    font-size: 14px;
  }
}
</style>
