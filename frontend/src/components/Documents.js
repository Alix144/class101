import { useSelector } from 'react-redux'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import Title from "./Title";

import doc from '../images/doc.png'
import download from '../images/download.png'
import leaf from '../images/leaf.png'

const Documents = () => {
    const link = "https://class101-api.onrender.com"
    const localLink = "http://localhost:4000"

    const [documents, setDocuments] = useState([]);
    const isInstructor = useSelector((state) => state.instructorOrStudent.isInstructor)
    const classId = useParams().id

    const getDocuments = async() => {
        const res = await axios.get(`${link}/document/${classId}`).catch(err=>console.log(err))
        const data = await res.data.documents
        return data;
    }

    useEffect(() => {
        getDocuments().then(
        (data)=>{setDocuments(data) 
        console.log(data)})
    },[classId])

    const handleDate = (date) => {
        return moment(date).fromNow()
    }

    const showFile = async(url) => {
        window.open(`${link}/files/${url}`, "_blank", "noreferrer");
    }

    return ( 
        <div className="content">
            
            {isInstructor ?
                <Title propTitle={"Documents"} add={"documents"}/>
                :
                <Title propTitle={"Documents"}/>
            }

            {documents.length === 0 ?
                <>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center"}}>
                <img src={leaf} alt="Empty" className='empty'/>
                <p>No One has Posted</p>
                </div>
                </>:
        
            <>
            {documents && documents.slice().reverse().map((document, index)=>{
                return(
                <div className="documents" key={index}>
                    <div className="info">
                        <img src={doc} alt="Document" />
                        <div>
                            <h4>{document.title}</h4>
                        </div>
                    </div>

                    <a href={document.url} download onClick={() => showFile(document.file)}>
                            <img src={download} alt="Download" />
                    </a>
                    <p className="date">{handleDate(document.date)}</p>
                    <div className="left-border"></div>
                </div>
                )

            })}
            </>
        }


        </div>
     );
}
 
export default Documents;