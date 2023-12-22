import pen from '../images/pen.png'
import { clearOnPageDiv, setOnPageDiv } from '../store/slices/onPageDivSlice';

import Title from "./Title";

import { useSelector, useDispatch } from 'react-redux'

const Welcome = () => {
    const onPageDiv = useSelector((state) => state.onPageDiv.value)
    const dispatch = useDispatch()

    return ( 
        <>
        {onPageDiv && 
            <div className="on-page-div">
                <div className="add-form">
                    <Title propTitle={"Create Class"}/>
                    <form action="">
                        <div>
                            <p>Name*</p>
                            <input type="text"/>
                        </div>
                        <div>
                            <p>Course Code</p>
                            <input type="text"/>
                        </div>
                        <div>
                            <p>Description</p>
                            <input type="text"/>
                        </div>
                        <div>
                            <p>Max Students</p>
                            <input type="number" min={1}/>
                        </div>
                        <div>
                        <p>Color</p>
                            <div className="colors">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </form>
                    <button onClick={()=>dispatch(clearOnPageDiv())}>close</button>
                </div>
            </div>
        }

            <div className="welcome">
                <h1>Welcome Back Ali!</h1>
                <p>{onPageDiv}</p>
                <img src={pen} alt="Edit" onClick={() => dispatch(setOnPageDiv())}/>
            </div>
            
        </>
     );
}
 
export default Welcome;