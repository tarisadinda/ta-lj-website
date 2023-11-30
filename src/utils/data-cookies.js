import { getCookie } from "cookies-next"

const tempDataCompany = typeof window != undefined ? getCookie("company_detail") : null
export const dataCompany = tempDataCompany != null ? JSON.parse(tempDataCompany) : null