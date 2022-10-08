import {useState} from "react";
import {buildHttpClient} from "../core/api";

export const useRequest = (aData = null) => {
    const [errors, setErrors] = useState([]);
    const [data, setData] = useState(aData);

    const doRequest = async (url, method, body) => {
        let res = null;

        try {
            res = await buildHttpClient().request({
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