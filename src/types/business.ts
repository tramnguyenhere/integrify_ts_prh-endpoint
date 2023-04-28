interface Business {
    names: CompanyName[],
    businessId: string,
    name: string,
    registrationDate: string,
    companyForm?: CompanyForm[],
    detailsUri?: string,
    auxiliaryNames?: CompanyName[],
    address?: Address[],
    liquidations?: CompanyLiquidation[],
    businessLines?: CompanyBusinessLine[],
    languages?: CompanyLanguage[],
    registeredOffices?: CompanyRegisteredOffice[],
    contactDetails?: CompanyContactDetail[],
    registeredEntries?: CompanyRegisteredEntry[],
    businessIdChanges: CompanyBusinessIdChange[]
}

interface CompanyBase {
    source?: number,
    version: number,
    registrationDate: string,
    language?: string,
    endDate?: string
}

interface CompanyName extends CompanyBase {
    name: string,
    order: number
}

interface CompanyLiquidation extends CompanyBase {
    type: string
}

interface CompanyForm extends CompanyBase {
    name: string,
    type: string
}

interface CompanyBusinessLine extends CompanyBase {
    name: string,
    order: number,
}

interface Address extends CompanyBase {
    careOf?: string,
    street?: string,
    postCode?: string,
    city?: string,
    type: number,
    country?: string
}

interface CompanyLanguage extends CompanyBase {
    name: string,
    order: number
}

interface CompanyRegisteredOffice extends CompanyBase {
    order: number,
    name: string
}

interface CompanyContactDetail extends CompanyBase {
    type: string,
}

interface CompanyRegisteredEntry {
    description: string,
    status: number,
    register: number,
    authority: number
}

interface CompanyBusinessIdChange {
    description: string,
    reason: string,
    changeDate?: string,
    change: number,
    oldBusinessId: string,
    newBusinessId: string
}

export {Business, CompanyBase, CompanyBusinessIdChange, CompanyBusinessLine, CompanyContactDetail, CompanyForm, CompanyLanguage,CompanyLiquidation,CompanyName,CompanyRegisteredEntry,CompanyRegisteredOffice}