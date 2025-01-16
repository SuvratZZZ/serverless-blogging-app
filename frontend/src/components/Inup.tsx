function Inup( {label , placeholder , refr }: 
    {label : string , placeholder : string , refr : any  }) {
    return (
        <div>
            <h2>{label} : </h2>
            <input className="p-1 border-transparent" placeholder={placeholder} ref={refr}></input>
        </div>
    );
}

export default Inup;