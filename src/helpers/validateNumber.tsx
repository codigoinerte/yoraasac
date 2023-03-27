export const validateNumber = (e:any) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
}
