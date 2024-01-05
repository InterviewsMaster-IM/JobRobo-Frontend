export const raceOptionsList = [
    {
        label: 'Hispanic or Latino',
        value: 'hispanic_latino'
    },
    {
        label: 'American Indian or Alaska Native',
        value: 'americanIndian_alaskaNative'
    },
    {
        label: 'Asian',
        value: 'asian'
    },
    {
        label: 'Black or African American',
        value: 'black_africanAmerican'
    },
    {
        label: 'Native Hawaiian or Other Pacific Islander',
        value: 'hawaiian'
    },
    {
        label: 'Two or More Races',
        value: 'two_or_more'
    },
    {
        label: 'White',
        value: 'white'
    },
    {
        label: 'Prefer not to specify',
        value: 'none'
    },
]

export const veteranStatusOptions = [
    {
        label: 'I am not a protected veteran',
        value: 'no'
    },
    {
        label: 'I identify as one or more of the classifications of protected veteran listed above',
        value: 'yes'
    },
    {
        label: 'Prefer not to specify',
        value: 'none'
    },
]

export const disabilityStatusOptions = [
    {
        label: 'Yes, I have a disability, or have had one in the past',
        value: 'yes'
    },
    {
        label: 'No, I do not have a disability and have not had one in the past',
        value: 'no'
    },
    {
        label: 'Prefer not to answer',
        value: 'none'
    },
]

export const workPreferenceOptions = [
    {
        label: 'Onsite',
        value: 'onsite'
    },
    {
        label: 'Hybrid',
        value: 'hybrid'
    },
    {
        label: 'Remote',
        value: 'remote'
    },
]

export const employmentTypeOptions = [
    {
        label: 'Full Time',
        value: 'full_time'
    },
    {
        label: 'Contract',
        value: 'contract'
    },
    {
        label: 'Internsip',
        value: 'internship'
    },
]

export const booleanValues = [
    {
        label: 'Yes',
        value: 'yes'
    },
    {
        label: 'No',
        value: 'no'
    },
]

export const months = [
    {
        label: 'January',
        value: 'january'
    },
    {
        label: 'Feburary',
        value: 'feburary'
    },
    {
        label: 'March',
        value: 'march'
    },
    {
        label: 'April',
        value: 'april'
    },
    {
        label: 'May',
        value: 'may'
    },
    {
        label: 'June',
        value: 'june'
    },
    {
        label: 'July',
        value: 'july'
    },
    {
        label: 'August',
        value: 'august'
    },
    {
        label: 'September',
        value: 'september'
    },
    {
        label: 'October',
        value: 'october'
    },
    {
        label: 'November',
        value: 'november'
    },
    {
        label: 'December',
        value: 'december'
    },
]

export function getYears(startYear) {
    let options = [];
    let thisYear = new Date().getFullYear();
    for (let i = thisYear; i >= (startYear || 1950); i--) {
        options.push({
            label: i,
            value: i,
        });
    }
    return options;
}