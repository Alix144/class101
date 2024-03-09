import { useSelector } from 'react-redux'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import Title from "./Title";

import doc from '../images/doc.png'
import download from '../images/download.png'

const Documents = () => {
    const [documents, setDocuments] = useState([]);
    const isInstructor = useSelector((state) => state.instructorOrStudent.isInstructor)
    const classId = useParams().id

    const getDocuments = async() => {
        const res = await axios.get(`http://localhost:4000/document/${classId}`).catch(err=>console.log(err))
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
        window.open(`http://localhost:4000/files/${url}`, "_blank", "noreferrer");
    }

    return ( 
        <div className="content">
            
            {isInstructor ?
                <Title propTitle={"Documents"} add={"documents"}/>
                :
                <Title propTitle={"Documents"}/>
            }


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


        </div>
     );
}
 
export default Documents;