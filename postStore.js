import { defineStore } from 'pinia';

export const usePostStore = defineStore('postStore', {
  state: () => ({
    posts: [
      {
        id: 1,
        title: 'Nueva Sucursal',
        content: '¡Ya abrimos nuestra nueva sucursal Satélite! Ven a sorprenderte a: Circuito Circunvalación Poniente #146, Col. Zona Azul, Satélite Estado de México.',
        image: '/src/assets/tacos.jpg'
      },
    ],
    previewImage: null,  // Nueva propiedad para la imagen de vista previa
  }),
  actions: {
    getPostById(id) {
      return this.posts.find(post => post.id === id);
    },
    addPost(post) {
      post.id = this.posts.length + 1;  // Asignar un ID único a la nueva publicación
      this.posts.push(post);  // Añadir la nueva publicación al array
      this.$patch((state) => {  // Forzar una reactividad en el estado
        state.posts = [...state.posts];
      });
      console.log('Post added:', post);  // Verificar que el post se ha añadido correctamente
    },
    updatePost(updatedPost) {
      const index = this.posts.findIndex(post => post.id === updatedPost.id);
      if (index !== -1) {
        this.posts[index] = { ...updatedPost };
      }
    },
    deletePost(id) {
      this.posts = this.posts.filter(post => post.id !== id);
    },
    setPreviewImage(image) {
      this.previewImage = image;
    },
    getPreviewImage() {
      return this.previewImage;
    },
  },
  persist: true,  // Persistencia habilitada
});
