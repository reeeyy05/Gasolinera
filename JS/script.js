import { base } from './constants.js';

const selectProvincia = document.getElementById('select-provincia');
const selectMunicipio = document.getElementById('select-municipio');
const selectCombustible = document.getElementById('select-combustible');
const checkAbiertas = document.getElementById('check-abiertas');
const botonBuscar = document.getElementById('boton-buscar');
const resultados = document.getElementById('resultados');

document.addEventListener("DOMContentLoaded", async () => {
    cargarProvincias();
    cargarCombustibles();
});

// Rellenamos el select de provincias
async function cargarProvincias() {
    try {
        const respuesta = await fetch(`${base}/Listados/Provincias`);
        const data = await respuesta.json();
        selectProvincia.innerHTML = '<option value="">Seleccione una provincia</option>';

        // Lo rellenamos con cada provincia recibida
        data.forEach(prov => {
            selectProvincia.innerHTML += `<option value="${prov.IDPovincia}">${prov.Provincia}</option>`;
        });
    } catch (e) {
        selectProvincia.innerHTML = "<option>Error de conexion con la API</option>";
    }
}

// Al cambiar la provincia se actualiza los municipios
selectProvincia.addEventListener("change", async () => {
    const idProv = selectProvincia.value;
    selectMunicipio.disabled = !idProv;
    selectMunicipio.innerHTML = '<option value="">Seleccione un municipio</option>';

    // Si no hay provincia se sale de la funcion
    if (!idProv) return;

    try {
        const respuesta = await fetch(`${base}/Listados/MunicipiosPorProvincia/${idProv}`);
        const data = await respuesta.json();
        // Recorremos los municipios obtenidos
        data.forEach(mun => {
            selectMunicipio.innerHTML += `<option value="${mun.IDMunicipio}">${mun.Municipio}</option>`;
        });
    } catch (error) {
        selectMunicipio.innerHTML += `<option value="">Error al cargar municipios</option>`;
    }
});

async function cargarCombustibles() {
    try {
        // Pedimos el listado de combustibles a la API
        const res = await fetch(`${base}/Listados/ProductosPetroliferos`);
        const data = await res.json();
        selectCombustible.innerHTML = '<option value="">Seleccione combustible</option>';
        // Añadimos cada combustible recibido como opción del select
        data.forEach(prod => {
            selectCombustible.innerHTML += `<option value="${prod.IDProducto}">${prod.NombreProducto}</option>`;
        });
    } catch (e) {
        selectCombustible.innerHTML = "<option>Error al cargar combustibles</option>";
    }
}