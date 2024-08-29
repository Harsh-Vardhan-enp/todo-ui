export const handlesubmit =(e: SubmitEvent)=>{
    const formData = new FormData(e.target as HTMLFormElement)
    const obj: Record<string, FormDataEntryValue> = {};
    formData.forEach((value, key) => {
        obj[key] = value;
    });
    let json = JSON.stringify(obj);
    console.log(json)
    return json
}