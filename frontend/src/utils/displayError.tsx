export const displayError = (message:any, setError:any) => {
    setError(message);
    setTimeout(() => setError(""), 2000);
}