export default function Header(){
    function clickHandler(){
        window.location.href = '/home'
    }
    return(
        <div>
            <div className = "shadow-lg p-3 fs-4 home" onClick={clickHandler}> <i className="bi bi-arrow-left"></i> Home</div>
        </div>
    )
}