export const getCompanyData = async ()=>{
    let companyData = await fetch('/db.json')
    companyData = await companyData.json()
    return companyData
}