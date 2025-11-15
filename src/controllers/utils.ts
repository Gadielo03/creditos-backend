export const getErrorResponse = (error: unknown) => {
    return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
    }
}
