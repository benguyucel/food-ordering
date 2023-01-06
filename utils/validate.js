export const validation = async (schema, data) => {
    try {
        schema.validateSync(data, { abortEarly: false });
        return { isValid: true, errors: null };
    } catch (error) {
        const errors = error.errors;
        return { isValid: false, errors };
    }
}