import { obtenerGasolineras } from "./gasolinera.js";

export async function cargarMunicipios(provinciaSeleccionada) {
    const todasLasGasolineras = await obtenerGasolineras();

    const municipiosRepetidos = [];
    todasLasGasolineras.forEach(gasolinera => {
        if (gasolinera.Provincia === provinciaSeleccionada) {
            municipiosRepetidos.push(gasolinera.Municipio);
        }
    });

    const municipiosUnicos = [];
    municipiosRepetidos.forEach(nombreMunicipio => {
        if (!municipiosUnicos.includes(nombreMunicipio)) {
            municipiosUnicos.push(nombreMunicipio);
        }
    });

    municipiosUnicos.sort();
    return municipiosUnicos;
}