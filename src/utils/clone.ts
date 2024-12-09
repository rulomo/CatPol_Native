//Clonar profundamente un objeto
export const deepClone = (
    target: { [x: string]: any },
    source: { [x: string]: any }
) => {
    // Miramos si la propiedad es también un objeto para copiarla de forma iterativa
    if (source)
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object)
            Object.assign(source[key], deepClone(target[key], source[key]));
    }
    // Combina el objeto resultante con el objeto de entrada
    Object.assign(target || {}, source);
    return target;
};

//Copia sin funciones de un objeto
export const newObject = (oldObject: object) => JSON.parse(JSON.stringify(oldObject));
