import axios from 'axios';
import {useState} from "react";

export const useRequest = (aData = null) => {
    const [errors, setErrors] = useState([]);
    const [data, setData] = useState(aData);

    const doRequest = async (url, method, body) => {
        let res = null;

        try {
            res = await axios.request({
                url,
                method,
                data: body ?? null
            });
            setErrors([]);
            setData(res.data)
            console.debug(data)
        } catch (e) {
            console.error(e.response.data?.errors)
            setErrors(e.response.data?.errors);
            setData(null)
        }

        return res;
    }

    return { doRequest, errors, data };
}