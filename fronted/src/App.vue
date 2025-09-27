<script setup>
import { ref, onMounted } from "vue";
import api from "./services/api";

const polizas = ref([]);
const nuevaPoliza = ref({
  numeroPoliza: "",
  tipoSeguro: "",
  titular: "",
  monto: 0,
});
const polizaEditar = ref(null);

// GET
const cargarPolizas = async () => {
  const res = await api.get("/");
  polizas.value = res.data;
};

// POST
const crearPoliza = async () => {
  await api.post("/", nuevaPoliza.value);
  nuevaPoliza.value = { numeroPoliza: "", tipoSeguro: "", titular: "", monto: 0 };
  cargarPolizas();
};

// PUT
const actualizarPoliza = async () => {
  if (!polizaEditar.value) return;
  await api.put(`/${polizaEditar.value._id}`, polizaEditar.value);
  polizaEditar.value = null;
  cargarPolizas();
};

onMounted(cargarPolizas);
</script>

<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold text-blue-500 mb-4"> Aseguradora -Gestión de Pólizas</h1>

    <!-- Formulario Crear -->
    <div class="bg-white shadow p-4 rounded mb-6">
      <h2 class="text-lg font-semibold mb-2">Crear Nueva Póliza</h2>
      <input v-model="nuevaPoliza.numeroPoliza" placeholder="Número de Póliza" class="border p-2 mr-2" />
      <select v-model="nuevaPoliza.tipoSeguro" class="border p-2 mr-2">
        <option disabled value="">Tipo de Seguro</option>
        <option>Auto</option>
        <option>Vida</option>
        <option>Hogar</option>
        <option>Salud</option>
      </select>
      <input v-model="nuevaPoliza.titular" placeholder="Titular" class="border p-2 mr-2" />
      <input v-model="nuevaPoliza.monto" type="number" placeholder="Monto" class="border p-2 mr-2" />
      <button @click="crearPoliza" class="bg-blue-500 rounded">Crear</button>
    </div>


    <table class="w-full bg-white shadow rounded">
      <thead class="bg-blue-600 text-white">
        <tr>
          <th class="p-2">Número</th>
          <th class="p-2">Tipo</th>
          <th class="p-2">Titular</th>
          <th class="p-2">Monto</th>
          <th class="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in polizas" :key="p._id" class="border-b">
          <td class="p-2">{{ p.numeroPoliza }}</td>
          <td class="p-2">{{ p.tipoSeguro }}</td>
          <td class="p-2">{{ p.titular }}</td>
          <td class="p-2">{{ p.monto }}</td>
          <td class="p-2">
            <button @click="polizaEditar = { ...p }" class="bg-yellow-500 px-2 py-1 rounded">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario Editar -->
    <div v-if="polizaEditar" class="bg-white shadow p-4 rounded mt-6">
      <h2 class="text-lg font-semibold mb-2">Editar Póliza</h2>
      <input v-model="polizaEditar.numeroPoliza" class="border p-2 mr-2" />
      <select v-model="polizaEditar.tipoSeguro" class="border p-2 mr-2">
        <option>Auto</option>
        <option>Vida</option>
        <option>Hogar</option>
        <option>Salud</option>
      </select>
      <input v-model="polizaEditar.titular" class="border p-2 mr-2" />
      <input v-model="polizaEditar.monto" type="number" class="border p-2 mr-2" />
      <button @click="actualizarPoliza" class="bg-green-600 text-white px-4 py-2 rounded">Actualizar</button>
    </div>
  </div>
</template>
