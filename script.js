import { cargarProvincias } from './modules/provincias.js';
import { cargarMunicipios } from './modules/municipio.js';
import { obtenerTipoCombustible } from './modules/combustible.js';
import { buscarGasolineras } from './modules/gasolinera.js';


document.addEventListener('DOMContentLoaded', async () => {
    const selectorProvincia = document.getElementById('select-provincia');
    const selectorMunicipio = document.getElementById('select-municipio');
    const selectorCombustible = document.getElementById('select-combustible');
    const checkSoloAbiertas = document.getElementById('check-abiertas');
    const botonBuscar = document.getElementById('boton-buscar');
    const contenedorResultados = document.getElementById('resultados');

    const provincias = await cargarProvincias();
    provincias.forEach(nombreProvincia => {
        const opcion = document.createElement('option');
        opcion.value = nombreProvincia;
        opcion.textContent = nombreProvincia;
        selectorProvincia.appendChild(opcion);
    });
    selectorProvincia.disabled = false;

    selectorProvincia.addEventListener('change', async evento => {
        const provinciaElegida = evento.target.value;

        selectorMunicipio.innerHTML = '<option value="">Seleccione un municipio</option>';
        selectorMunicipio.disabled = true;
        selectorCombustible.innerHTML = '<option value="">Seleccione combustible</option>';
        selectorCombustible.disabled = true;

        if (!provinciaElegida) return;

        const municipios = await cargarMunicipios(provinciaElegida);
        municipios.forEach(nombreMunicipio => {
            const opcion = document.createElement('option');
            opcion.value = nombreMunicipio;
            opcion.textContent = nombreMunicipio;
            selectorMunicipio.appendChild(opcion);
        });
        selectorMunicipio.disabled = false;

        const tiposCombustible = await obtenerTipoCombustible();
        tiposCombustible.forEach(tipo => {
            const opcion = document.createElement('option');
            opcion.value = tipo;
            opcion.textContent = tipo;
            selectorCombustible.appendChild(opcion);
        });
        selectorCombustible.disabled = false;
    });

    botonBuscar.addEventListener('click', async () => {
        contenedorResultados.hidden = false;
        contenedorResultados.innerHTML = 'Buscando...';

        const provincia = selectorProvincia.value;
        const municipio = selectorMunicipio.value;
        const combustible = selectorCombustible.value;
        const soloAbiertas = checkSoloAbiertas.checked;

        const listaResultado = await buscarGasolineras({
            provincia,
            municipio,
            combustible,
            soloAbiertas
        });

        if (!listaResultado || listaResultado.length === 0) {
            contenedorResultados.innerHTML =
                'No se encontraron gasolineras con ese filtro.';
            return;
        }

        contenedorResultados.innerHTML = '';

        listaResultado.forEach(gasolinera => {
            const tarjeta = document.createElement('article');
            tarjeta.innerHTML = `
                <strong>${gasolinera.Rótulo}</strong><br>
                Dirección: ${gasolinera.Dirección}, ${gasolinera.Municipio}, ${gasolinera.Provincia}<br>
                Horario: ${gasolinera.Horario || 'Sin horario'}<br>`;
            contenedorResultados.appendChild(tarjeta);
        });
    });
});