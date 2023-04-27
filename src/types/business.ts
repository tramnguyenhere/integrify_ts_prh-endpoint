interface Business {
    businessId: string,
    name: string,
    registrationDate: string,
    companyForm: string
    detailsUri: string | null,
}

interface CompanyBase {
    source: number,
    version: number,
    registrationDate: string,
    name: string,
    language: string,

}

interface CompanyLiquidation extends CompanyBase {
    
}