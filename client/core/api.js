import axios from "axios";

const INGRESS_SRV = typeof window === 'undefined' ?
    `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/` : '/'
export const API = `${INGRESS_SRV}api`
const defaultHeaders = {Host: 'ticketing.com'}

export const buildHttpClient = (headers = defaultHeaders) => axios.create({
    baseURL: API,
    headers,
})
