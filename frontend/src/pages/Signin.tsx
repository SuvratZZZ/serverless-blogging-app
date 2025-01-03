import Quote from "../components/Quote";

function Signin() {
    const sign = ()=>{

    }
    return (
        <div className="grid grid-cols-2">
            <div className="flex justify-center items-center">
                <div className=" rounded shadow-md">
                    <form action={sign} method="post">
                        <input label="">
                            enter
                        </input>
                    </form>
                </div>
            </div>
            <div className=" md:block ">
                <Quote/>
            </div>
        </div>
    );
}

export default Signin;