import { obtenerGasolineras } from './gasolinera.js';

export async function obtenerTipoCombustible() {
    const listadoGasolineras = await obtenerGasolineras();

    const muestraGasolinera = listadoGasolineras[0];

    const tipoCombustible = [];

    for (const campo in muestraGasolinera) {
        if (campo.startsWith('Precio')) {
            const etiquetaCombustible = campo.replace('Precio ', '');
            if (!tipoCombustible.includes(etiquetaCombustible)) {
                tipoCombustible.push(etiquetaCombustible);
            }
        }
    }

    tipoCombustible.sort();
    return tipoCombustible;
}