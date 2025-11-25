import { base } from './constants.js';

const selectProvincia = document.getElementById('select-provincia');
const selectMunicipio = document.getElementById('select-municipio');
const selectCombustible = document.getElementById('select-combustible');
const checkAbiertas = document.getElementById('check-abiertas');
const botonBuscar = document.getElementById('boton-buscar');
const resultados = document.getElementById('resultados');

async function cargarProvincias() {
    try {
        const respuesta = await fetch(`${base}/Listados/Provincias`);
        const data = await respuesta.json();
        selectProvincia.innerHTML = '<option value="">Seleccione una provincia</option>';

        data.forEach(prov => {
            selectProvincia.innerHTML += `<option value="${prov.IDPovincia}">${prov.Provincia}</option>`;
        });
    } catch (e) {
        selectProvincia.innerHTML = "<option>Error de conexion con la API</option>";
    }
}

selectProvincia.addEventListener("change", async () => {
    const idProv = selectProvincia.value;
    selectMunicipio.disabled = !idProv;
    selectMunicipio.innerHTML = '<option value="">Seleccione un municipio</option>';

    if (!idProv) return;

    try {
        const respuesta = await fetch(`${base}/Listados/MunicipiosPorProvincia/${idProv}`);
        const data = await respuesta.json();
        data.forEach(mun => {
            selectMunicipio.innerHTML += `<option value="${mun.IDMunicipio}">${mun.Municipio}</option>`;
        });
    } catch (error) {
        selectMunicipio.innerHTML += `<option value="">Error al cargar municipios</option>`;
    }
});