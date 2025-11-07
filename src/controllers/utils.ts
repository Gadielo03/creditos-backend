export const getErrorResponse = (error: any) => {
    return {
        success: false,
        error: error,
        timestamp: new Date().toISOString()
    }
}


