<template>
  <section class="isi">
    <section class="hero is-small">
      <div class="judul">
        <p class="title has-text-black">
          Bunga
        </p>
        <p class="subtitle has-text-black">
          Berikut daftar bunga yang dapat di beli di toko kami
        </p>
      </div>
    </section>
    <section class="content">
      <div class="container">
        <button class="button is-link" @click="showAdd">
        <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                  </span>
          <span>Data baru</span>
        </button>
        <table class="table has-background-success-light">
          <thead>
          <tr>
            <th>#</th>
            <th>Kode Bunga</th>
            <th>Nama Bunga</th>
            <th>Jenis Bunga</th>
            <th>Harga Bunga</th>
            <th>Created at</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="bunga.length" v-for="(value, index) in bunga">
            <td>{{index + 1}}</td>
            <td>{{value.kode_bunga}}</td>
            <td>{{value.nama_bunga}}</td>
            <td>{{value.jenis_bunga}}</td>
            <td>{{value.harga_bunga}}</td>
            <td>{{value.created_at}}</td>
            <td>
              <div class="field has-addons">
                <p class="control">
                  <RouterLink class="button is-success" :to="{ name: 'bunga-detail', params: { kode_bunga:  value.kode_bunga}}">
                  <span class="icon is-small">
                    <i class="fas fa-arrow-right"></i>
                  </span>
                    <span>Detail</span>
                  </RouterLink>
                </p>
                <p class="control">
                  <button class="button is-warning" @click="showUpdate(index)">
                  <span class="icon is-small">
                    <i class="fas fa-pencil"></i>
                  </span>
                    <span>Edit</span>
                  </button>
                </p>
                <p class="control">
                  <button class="button is-danger" @click="showDelete(index)">
                  <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                  </span>
                    <span>Delete</span>
                  </button>
                </p>
              </div>
            </td>
          </tr>
          <tr v-else>
            <td colspan="9">
              <div class="notification is-warning">
                Tidak ada data
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="has-text-centered" v-if="isLoading">
        <i class="fa-solid fa-spinner fa-pulse"></i>
      </div>
    </section>
  </section>
  <div class="modal" id="modal-delete">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirm Delete</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <ul>
            <li>KODE BUNGA <strong>{{bunga[selectedIndex].kode_bunga}}</strong></li>
            <li>NAMA BUNGA <strong>{{bunga[selectedIndex].nama_bunga}}</strong></li>
          </ul>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="remove">Delete</button>
        <button class="button" @click="closeModal('modal-delete')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-update">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Form Update</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex >= 0">
          <form @submit.prevent="update">
            <div class="field">
              <label class="label" for="nama_bunga_update">Nama Bunga</label>
              <div class="control">
                <input class="input" type="text" id="nama_bunga_update" placeholder="Nama Bunga" required v-model="formEdit.nama_bunga">
              </div>
            </div>
            <div class="field">
              <label class="label" for="jenis_bunga_update">Jenis Bunga</label>
              <div class="control">
                <input class="input" type="text" id="jenis_bunga_update" placeholder="Jenis Bunga" required v-model="formEdit.jenis_bunga">
              </div>
            </div>
            <div class="field">
              <label class="label" for="warna_bunga_update">Warna Bunga</label>
              <div class="control">
                <input class="input" type="text" id="warna_bunga_update" placeholder="Warna Bunga" required v-model="formEdit.warna_bunga">
              </div>
            </div>
            <div class="field">
              <label class="label" for="kategori_bunga_update">Kategori Bunga</label>
              <div class="control">
                <input class="input" type="text" id="kategori_bunga_update" placeholder="Kategori Bunga" required v-model="formEdit.kategori_bunga">
              </div>
            </div>
            <div class="field">
              <label class="label" for="deskripsi_bunga_update">Deskripsi Bunga</label>
              <div class="control">
                <input class="input" type="text" id="deskripsi_bunga_update" placeholder="Deskripsi Bunga" required v-model="formEdit.deskripsi_bunga">
              </div>
            </div>
            <div class="field">
              <label class="label" for="harga_bunga_update">Harga Bunga</label>
              <div class="control">
                <input class="input" type="text" id="harga_bunga_update" placeholder="Harga Bunga" required v-model="formEdit.harga_bunga">
              </div>
            </div>
          </form>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="update">Update</button>
        <button class="button" @click="closeModal('modal-update')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-add">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add new</p>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="addNew">
          <div class="field">
            <label class="label" for="kode_bunga_insert">Kode Bunga</label>
            <div class="control">
              <input class="input" type="number" id="kode_bunga_insert" placeholder="Kode Bunga" required v-model="formAdd.kode_bunga">
            </div>
          </div>
          <div class="field">
            <label class="label" for="nama_bunga_insert">Nama Bunga</label>
            <div class="control">
              <input class="input" type="text" id="nama_bunga_insert" placeholder="Nama Bunga" required v-model="formAdd.nama_bunga">
            </div>
          </div>
          <div class="field">
            <label class="label" for="jenis_bunga_insert">Jenis Bunga</label>
            <div class="control">
              <input class="input" type="text" id="jenis_bunga_insert" placeholder="Jenis Bunga" required v-model="formAdd.jenis_bunga">
            </div>
          </div>
          <div class="field">
            <label class="label" for="warna_bunga_insert">Warna Bunga</label>
            <div class="control">
              <input class="input" type="text" id="warna_bunga_insert" placeholder="Warna Bunga" required v-model="formAdd.warna_bunga">
            </div>
          </div>
          <div class="field">
            <label class="label" for="kategori_bunga_insert">Kategori Bunga</label>
            <div class="control">
              <input class="input" type="text" id="kategori_bunga_insert" placeholder="Kategori Bunga" required v-model="formAdd.kategori_bunga">
            </div>
          </div>
          <div class="field">
            <label class="label" for="deskripsi_bunga_insert">Deskripsi Bunga</label>
            <div class="control">
              <input class="input" type="text" id="deskripsi_bunga_insert" placeholder="Deskripsi Bunga" required v-model="formAdd.deskripsi_bunga">
            </div>
          </div>
          <div class="field">
            <label class="label" for="harga_bunga_insert">Harga Bunga</label>
            <div class="control">
              <input class="input" type="text" id="harga_bunga_insert" placeholder="Harga Bunga" required v-model="formAdd.harga_bunga">
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="addNew">Save</button>
        <button class="button" @click="closeModal('modal-add')">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
import {nextTick} from "vue";
export default {
  name: "BungaListView",
  data(){
    return{
      bunga: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        kode_bunga: '',
        nama_bunga: '',
        jenis_bunga: '',
        warna_bunga: '',
        kategori_bunga: '',
        deskripsi_bunga: '',
        harga_bunga: ''
      },
      formEdit: {
        kode: '',
        kode_bunga: '',
        nama_bunga: '',
        jenis_bunga: '',
        warna_bunga: '',
        kategori_bunga: '',
        deskripsi_bunga: '',
        harga_bunga: ''
      }
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      fetch(`https://floristya.000webhostapp.com/pages/bunga/index.php`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.bunga = json.data;
        })
        .catch(()=>{
          alert('Terjadi error')
        })
        .finally(()=>{
          this.isLoading = false;
        })
    },
    remove(){
      this.closeModal('modal-delete');
      if(this.selectedIndex >= 0){
        const selectedData = this.service[this.selectedIndex];
        const payload = new URLSearchParams({
          'kode_bunga': selectedData.kode_bunga
        });
        fetch(`https://floristya.000webhostapp.com/pages/bunga/delete.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
          .then(response => {
            if(response.ok){
              this.bunga.splice(this.selectedIndex, 1);
            }
            return response.json();
          })
          .then(json =>{
            if(!json.status){
              alert(json.error);
            }
          })
          .catch(()=>{
            alert('Terjadi error')
          })
      }
      this.selectedIndex = -1;
    },
    update(){
      this.closeModal('modal-update');
      if(this.selectedIndex >= 0){
        const payload = new URLSearchParams({
          kode_bunga: this.formEdit.kode_bunga,
          nama_bunga: this.formEdit.nama_bunga,
          jenis_bunga: this.formEdit.jenis_bunga,
          warna_bunga: this.formEdit.warna_bunga,
          kategori_bunga: this.formEdit.kategori_bunga,
          deskripsi_bunga: this.formEdit.deskripsi_bunga,
          harga_bunga: this.formEdit.harga_bunga
        });
        fetch(`https://floristya.000webhostapp.com/pages/bunga/update.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
          .then(response => {
            return response.json()
          })
          .then(json =>{
            if(!json.status){
              alert(json.error);
            }else{
              /*
              Update data pada kolom yg diupdate
               */
              this.bunga[this.selectedIndex] = json.data;
            }
          })
          .catch( (e) =>{
            alert('Terjadi error'+e.toString())
          })
          .finally(()=>{
            this.selectedIndex = -1;
          })
      }
    },
    showDelete(index){
      this.showModal('modal-delete');
      this.selectedIndex = index;
    },
    showUpdate(index){
      this.showModal('modal-update');
      this.selectedIndex = index;
      const selectedData = this.bunga[index];
      this.formEdit = {
        kode_bunga: selectedData.kode_bunga,
        nama_bunga: selectedData.nama_bunga,
        jenis_bunga: selectedData.jenis_bunga,
        warna_bunga: selectedData.warna_bunga,
        kategori_bunga: selectedData.kategori_bunga,
        deskripsi_bunga: selectedData.deskripsi_bunga,
        harga_bunga: selectedData.harga_bunga
      }
      nextTick(()=>{
        document.getElementById('nama_bunga_update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('kode_bunga_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      const payload = new URLSearchParams({
        kode_bunga: this.formAdd.kode_bunga,
        nama_bunga: this.formAdd.nama_bunga,
        jenis_bunga: this.formAdd.jenis_bunga,
        warna_bunga: this.formAdd.warna_bunga,
        kategori_bunga: this.formAdd.kategori_bunga,
        deskripsi_bunga: this.formAdd.deskripsi_bunga,
        harga_bunga: this.formAdd.harga_bunga
      });
      fetch(`https://floristya.000webhostapp.com/pages/bunga/create.php`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(),
      })
        .then(response => {
          return response.json()
        })
        .then(json =>{
          if(!json.status){
            alert(json.error);
          }else{
            this.bunga.push(json.data);
          }
        })
        .catch( (e) =>{
          alert('Terjadi error'+e.toString())
        })
        .finally(()=>{
          this.formAdd.nama_bunga = '';
        })
    },
    showModal(id){
      document.getElementById(id).classList.add('is-active');
    },
    closeModal(id){
      document.getElementById(id).classList.remove('is-active');
    },
    resetFormAdd(){
      this.formAdd = {
        nama_bunga: '',
        jenis_bunga: '',
        warna_bunga: '',
        kategori_bunga: '',
        deskripsi_bunga: '',
        harga_bunga: '',
      }
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style scoped>
</style>