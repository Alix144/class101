import Title from "./Title";

import doc from '../images/doc.png'
import download from '../images/download.png'

const Documents = () => {
    return ( 
        <div className="content">
            <Title propTitle={"Documents"} add={"documents"}/>

            <div className="documents">
                    <div className="info">
                        <img src={doc} alt="Document" />
                        <div>
                            <h4>Spanish Book</h4>
                        </div>
                    </div>
                    <img src={download} alt="Download" />
                    <p className="date">01-06-2024</p>
                    <div className="left-border"></div>
            </div>
            <div className="documents">
                    <div className="info">
                        <img src={doc} alt="Document" />
                        <div>
                            <h4>Verbs</h4>
                        </div>
                    </div>
                    <img src={download} alt="Download" />
                    <p className="date">01-06-2024</p>
                    <div className="left-border"></div>
            </div>

        </div>
     );
}
 
export default Documents;