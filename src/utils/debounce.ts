// utils/debounce.ts
export function debounce<F extends (...args: any[]) => void>(func: F, waitFor: number) {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: Parameters<F>): void => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), waitFor);
    };
}
