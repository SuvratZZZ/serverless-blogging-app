
function Postcard({title , content , author , date } : 
    {title : string , content : string , author : string , date? : Date }
) {
    return (
        <div className="m-2 p-2 border border-gray-200 rounded-md shadow-md  ">
            <div className="uppercase cursor-pointer text-2xl font-bold">{title}</div>
            <div>
                <p>{author}</p> 
                <p>{date?.getDate()}</p>
            </div>
            <div className="h-15 overflow-hidden">{content}</div>
        </div>
    );
}

export default Postcard;