import { base } from '../utils/constants.js';

export async function obtenerGasolineras() {
    if (window._datosGasolineras) {
        return window._datosGasolineras;
    }

    const respuesta = await fetch(base);
    const datosJson = await respuesta.json();

    window._datosGasolineras = datosJson.ListaEESSPrecio;
    return window._datosGasolineras;
}

export async function buscarGasolineras({ provincia, municipio, combustible, soloAbiertas }) {
    const todas = await obtenerGasolineras();
    let filtradas = todas;

    if (provincia) {
        filtradas = filtradas.filter(gasolinera => gasolinera.Provincia === provincia);
    }

    if (municipio) {
        filtradas = filtradas.filter(gasolinera => gasolinera.Municipio === municipio);
    }

    if (combustible) {
        filtradas = filtradas.filter(gasolinera => {
            let tiene = false;
            for (let clave in gasolinera) {
                if (clave.toLowerCase().includes(combustible.toLowerCase())) {
                    if (gasolinera[clave] && gasolinera[clave].trim() !== "") {
                        tiene = true;
                    }
                }
            }
            return tiene;
        });
    }

    if (soloAbiertas) {
        filtradas = filtradas.filter(gasolinera => {
            return gasolinera.Horario && gasolinera.Horario.includes('24H');
        });
    }

    return filtradas;
}