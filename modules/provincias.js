import { obtenerGasolineras } from './gasolinera.js';

export async function cargarProvincias() {
    const listadoCompleto = await obtenerGasolineras();

    const provinciasListado = listadoCompleto.map(estacion => estacion.Provincia);

    const provinciasSinDuplicados = [];
    provinciasListado.forEach(nombreProvincia => {
        if (!provinciasSinDuplicados.includes(nombreProvincia)) {
            provinciasSinDuplicados.push(nombreProvincia);
        }
    });

    provinciasSinDuplicados.sort();

    return provinciasSinDuplicados;
}
