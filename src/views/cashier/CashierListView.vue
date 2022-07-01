<template>
  <section class="isi">
    <section class="hero is-small">
      <div class="judul">
        <p class="title has-text-black">
          Cashier
        </p>
        <p class="subtitle has-text-black">
          Data Cashier yang ada di toko bunga floristya
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
            <th>ID Cashier</th>
            <th>Nama Lengkap</th>
            <th>Nomor Kassa</th>
            <th>Shift</th>
            <th>Created at</th>
            <th>Action</th>

          </tr>
          </thead>
          <tbody>
          <tr v-if="cashier.length" v-for="(value, index) in cashier">
            <td>{{index + 1}}</td>
            <td>{{value.id_cashier}}</td>
            <td>{{value.nama_lengkap}}</td>
            <td>{{value.no_kassa}}</td>
            <td>{{value.shift}}</td>
            <td>{{value.created_at}}</td>
            <td>
              <div class="field has-addons">
                <p class="control">
                  <RouterLink class="button is-success" :to="{ name: 'cashier-detail', params: { id_cashier:  value.id_cashier}}">
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
            <li>ID CASHIER <strong>{{cashier[selectedIndex].id_cashier}}</strong></li>
            <li>NAMA LENGKAP <strong>{{cashier[selectedIndex].nama_lengkap}}</strong></li>
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
              <label class="label" for="nama_lengkap_update">Nama Lengkap</label>
              <div class="control">
                <input class="input" type="text" id="nama_lengkap_update" placeholder="Nama Lengkap" required v-model="formEdit.nama_lengkap">
              </div>
            </div>
            <div class="field">
              <label class="label" for="alamat_update">Alamat</label>
              <div class="control">
                <input class="input" type="text" id="alamat_update" placeholder="Alamat" required v-model="formEdit.alamat">
              </div>
            </div>
            <div class="field">
              <label class="label" for="nomor_hp_update">Nomor HP</label>
              <div class="control">
                <input class="input" type="number" id="nomor_hp_update" placeholder="Nomor HP" required v-model="formEdit.nomor_hp">
              </div>
            </div>
            <div class="field">
              <label class="label" for="jenis_kelamin_update">Jenis Kelamin</label>
              <div class="control">
                <div class="select is-primary">
                  <select name="jenis_kelamin_insert" id="jenis_kelamin_update" v-model="formEdit.jenis_kelamin">
                    <option v-for="val in jenis_kelamin" :value="val.id">{{val.gender}}</option>
                  </select>
                </div>
              </div>
            <div class="field">
              <label class="label" for="no_kassa_update">Nomor Kassa</label>
              <div class="control">
                <input class="input" type="text" id="no_kassa_update" placeholder="Nomor Kassa" required v-model="formEdit.no_kassa">
              </div>
            </div>
              <div class="field">
                <label class="label" for="shift_update">Shift</label>
                <div class="control">
                  <input class="input" type="text" id="shift_update" placeholder="Shift" required v-model="formEdit.shift">
                </div>
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
            <label class="label" for="id_cashier_insert">ID Cashier</label>
            <div class="control">
              <input class="input" type="number" id="id_cashier_insert" placeholder="ID Cashier" required v-model="formAdd.id_cashier">
            </div>
          </div>
          <div class="field">
            <label class="label" for="nama_lengkap_insert">Nama Lengkap</label>
            <div class="control">
              <input class="input" type="text" id="nama_lengkap_insert" placeholder="Nama Lengkap" required v-model="formAdd.nama_lengkap">
            </div>
          </div>
          <div class="field">
            <label class="label" for="alamat_insert">Alamat</label>
            <div class="control">
              <input class="input" type="text" id="alamat_insert" placeholder="Alamat" required v-model="formAdd.alamat">
            </div>
          </div>
          <div class="field">
            <label class="label" for="nomor_hp_insert">Nomor HP</label>
            <div class="control">
              <input class="input" type="number" id="nomor_hp_insert" placeholder="Nomor HP" required v-model="formAdd.nomor_hp">
            </div>
          </div>
          <div class="field">
            <label class="label" for="jenis_kelamin_insert">Jenis Kelamin</label>
            <div class="control">
              <div class="select is-primary">
                <select name="jenis_kelamin_insert" id="jenis_kelamin_insert" v-model="formAdd.jenis_kelamin">
                  <option v-for="val in jenis_kelamin" :value="val.id">{{val.jenis}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label" for="no_kassa_insert">Nomor Kassa</label>
            <div class="control">
              <input class="input" type="date" id="no_kassa_insert" placeholder="Nomor Kassa" required v-model="formAdd.no_kassa">
            </div>
          </div>
          <div class="field">
            <label class="label" for="shift_insert">Shift</label>
            <div class="control">
              <input class="input" type="text" id="shift_insert" placeholder="Shift" required v-model="formAdd.shift">
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
  name: "CashierListView",
  data(){
    return{
      cashier: [],
      jenis_kelamin:[],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        id_cashier: '',
        nama_lengkap: '',
        alamat: '',
        nomor_hp: '',
        jenis_kelamin: '',
        no_kassa: '',
        shift: '',
        gender: ''
      },
      formEdit: {
        id_cashier: '',
        nama_lengkap: '',
        alamat: '',
        nomor_hp: '',
        jenis_kelamin: '',
        no_kassa: '',
        shift: '',
        gender: ''
      }
    }
  },
  methods:{
    loadCashier(){
      this.isLoading = true;
      fetch(`https://floristya.000webhostapp.com/pages/cashier/index.php`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.cashier= json.data;
        })
        .catch(()=>{
          alert('Terjadi error')
        })
        .finally(()=>{
          this.isLoading = false;
        })
    },
    loadJenis_Kelamin(){
      this.isLoading = true;
      fetch(`https://floristya.000webhostapp.com/pages/jenis_kelamin/index.php`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.jenis_kelamin = json.data;
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
        const selectedData = this.cashier[this.selectedIndex];
        const payload = new URLSearchParams({
          'id_cashier': selectedData.id_cashier
        });
        fetch(`https://floristya.000webhostapp.com/pages/cashier/delete.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
          .then(response => {
            if(response.ok){
              this.cashier.splice(this.selectedIndex, 1);
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
          id_cashier: this.formEdit.id_cashier,
          nama_lengkap: this.formEdit.nama_lengkap,
          alamat: this.formEdit.alamat,
          nomor_hp: this.formEdit.nomor_hp,
          jenis_kelamin: this.formEdit.jenis_kelamin,
          no_kassa: this.formEdit.no_kassa,
          shift: this.formEdit.shift

        });
        fetch(`https://floristya.000webhostapp.com/pages/cashier/update.php`,{
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
              this.cashier[this.selectedIndex] = json.data;
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
      const selectedData = this.cashier[index];
      this.formEdit = {
        id_cashier: selectedData.id_cashier,
        nama_lengkap: selectedData.nama_lengkap,
        alamat: selectedData.alamat,
        nomor_hp: selectedData.nomor_hp,
        jenis_kelamin: selectedData.jenis_kelamin,
        no_kassa: selectedData.no_kassa,
        shift: selectedData.shift
      }
      nextTick(()=>{
        document.getElementById('nama_lengkap_update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('id_cashier_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      const payload = new URLSearchParams({
        id_cashier: this.formAdd.id_cashier,
        nama_lengkap: this.formAdd.nama_lengkap,
        alamat: this.formAdd.alamat,
        nomor_hp: this.formAdd.nomor_hp,
        jenis_kelamin: this.formAdd.jenis_kelamin,
        no_kassa: this.formAdd.no_kassa,
        shift: this.formAdd.shift
      });
      fetch(`https://floristya.000webhostapp.com/pages/cashier/create.php`,{
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
            this.cashier.push(json.data);
          }
        })
        .catch( (e) =>{
          alert('Terjadi error'+e.toString())
        })
        .finally(()=>{
          this.formAdd.nama_lengkap = '';
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
        nama_lengkap: '',
        alamat: '',
        nomor_hp: '',
        jenis_kelamin: '',
        no_kassa: '',
        shift: '',

      }
    }
  },
  mounted() {
    this.loadCashier();
    this.loadJenis_Kelamin()
  }
}
</script>

<style scoped>
</style>