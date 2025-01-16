
function Postcard({title , content , author , date } : 
    {title : string , content : string , author : string , date : Date }
) {
    return (
        <div>
            <div>{title}</div>
            <div><p>{author}</p> <p>{date.getDate()}</p></div>
            <div>{content}</div>
        </div>
    );
}

export default Postcard;