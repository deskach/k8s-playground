import axios from 'axios';
import {useState} from "react";

export const useRequest = ({url, method, body}) => {
    const [errors, setErrors] = useState([]);

    const doRequest = async () => {
        try {
            const res = await axios.request({
                url,
                method,
                data: body
            });
            setErrors([]);
            console.debug(res.data)
        } catch (e) {
            console.error(e.response.data?.errors)
            setErrors(e.response.data?.errors);
        }
    }

    return { doRequest, errors };
}