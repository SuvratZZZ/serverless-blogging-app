function Inup( {label , placeholder , refr , wid , type}: 
    {label : string , placeholder : string , refr? : any , wid?:string , type?: string}) {
    return (
        <div>
        {
            (type != "tex" ) ?
            (<div className={`h-${wid}`}>
                <h2>{label} : </h2>
                <input className={`p-1 h-${wid} w-full border-2 rounded-md`} placeholder={placeholder} ref={refr}></input>
            </div>):(
                <div className={`h-${wid}`}>
                <h2>{label} : </h2>
                <textarea className={`p-1 h-${wid} w-full border-2 rounded-md`} placeholder={placeholder} ref={refr}></textarea>
            </div>
            )
        }
        </div>
    );
}

export default Inup;