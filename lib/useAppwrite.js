import { useEffect, useState } from "react";

const UseAppwrite = (fn) => {
    const [data, setData] = useState([]);
    const [isloading, setisLoading] = useState(false);
     
    const fetchPost = async () => {
        try {
            setisLoading(true);
            const response = await fn();
            setData(response);
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setisLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
    }, []);

    const refetch = () => fetchPost();
         
    return { data, isloading, refetch }
};

export default UseAppwrite