import plus from '../images/plus.png'

const Title = ({propTitle, add}) => {
    return ( 
        <div className="title">
            <div>
                <h3>{propTitle}</h3>
                {add &&
                    <img src={plus} alt="Add" />
                }
            </div>
            <hr />
        </div>
     );
}
 
export default Title;