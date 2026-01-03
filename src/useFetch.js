import { useState, useEffect } from "react";

const useFetch = (url) =>{
    const[data,setData] = useState(null)
    const[loading,setLoading] = useState(true)
    const[error,setError] = useState(null)

    useEffect(() =>{
        setTimeout(() =>{
            fetch(url)
            .then(res =>{
                if(!res.ok){
                    throw Error("not found")
                }
                return res.json()
            })
            .then(data =>{
                setData(data)
                setError(null)
                setLoading(false)
            })
            .catch(err =>{
                setData(null)
                setError(err.message)
                setLoading(null)
            })
        },1000)
    },[url])
    return{data,loading,error}
}

export default useFetch