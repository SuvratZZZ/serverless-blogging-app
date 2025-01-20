function Inup( {label , placeholder , refr , wid}: 
    {label : string , placeholder : string , refr? : any , wid?:string }) {
    return (
        <div className={`h-${wid}`}>
            <h2>{label} : </h2>
            <input className={`p-1 w-full border-2 rounded-md`} placeholder={placeholder} ref={refr}></input>
        </div>
    );
}

export default Inup;