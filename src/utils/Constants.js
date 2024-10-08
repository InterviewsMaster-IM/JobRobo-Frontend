export const gender = {
    MALE: 'Male',
    FEMALE: 'Female',
    OTHER: 'Other',
};

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

export const salaryCurrencyOptions = [
    {
        label: 'USD',
        value: 'usd'
    },
    {
        label: 'EUR',
        value: 'eur'
    },
    {
        label: 'GBP',
        value: 'gbp'
    },
    {
        label: 'INR',
        value: 'inr'
    },
]

export const months = [
    {
        label: 'January',
        value: '01'
    },
    {
        label: 'Feburary',
        value: '02'
    },
    {
        label: 'March',
        value: '03'
    },
    {
        label: 'April',
        value: '04'
    },
    {
        label: 'May',
        value: '05'
    },
    {
        label: 'June',
        value: '06'
    },
    {
        label: 'July',
        value: '07'
    },
    {
        label: 'August',
        value: '08'
    },
    {
        label: 'September',
        value: '09'
    },
    {
        label: 'October',
        value: '10'
    },
    {
        label: 'November',
        value: '11'
    },
    {
        label: 'December',
        value: '12'
    },
]

export const pricingPlans = [
    {
        name: 'starter',
        price: '$ 9.99',
        benefits: [
            '300 JobRobo Credits per month',
            'Unlimited jobs per session',
        ]
    },
    {
        name: 'standard',
        price: '$ 19.99',
        benefits: [
            '750 JobRobo Credits per month',
            'Unlimited jobs per session',
        ]
    },
    {
        name: 'premium',
        price: '$ 29.99',
        benefits: [
            '1500 JobRobo Credits per month',
            'Unlimited jobs per session',
        ]
    },
]

export const nonResumeQuestionsData = [
    {
        questionLabel: 'Race',
        type: 'DROPDOWN',
        name: 'race',
        placeholder: 'Select an option',
        isRequired: true,
        errorMessage: 'Please select an option',
        options: raceOptionsList,
    },
    {
        questionLabel: 'Notice period in days ?',
        type: 'INPUT',
        name: 'noticePeriod',
        placeholder: 'Days',
        isRequired: true,
        errorMessage: 'Please enter a value',
    },
    {
        questionLabel: 'Veteran Status',
        type: 'DROPDOWN',
        name: 'veteranStatus',
        placeholder: 'Select an option',
        isRequired: true,
        errorMessage: 'Please select an option',
        options: veteranStatusOptions,
    },
    {
        questionLabel: 'Disability Status',
        type: 'DROPDOWN',
        name: 'disabilityStatus',
        placeholder: 'Select an option',
        isRequired: true,
        errorMessage: 'Please select an option',
        options: disabilityStatusOptions,
    },
    {
        questionLabel: 'Desired salary Currency',
        type: 'DROPDOWN',
        name: 'desiredSalaryCurrency',
        placeholder: 'Select an option',
        isRequired: false,
        options: salaryCurrencyOptions,
    },
    {
        questionLabel: 'Desired salary',
        type: 'INPUT',
        name: 'desiredSalary',
        placeholder: 'Number',
        isRequired: false,
    },
    {
        questionLabel: 'Will you now, or in the future, require sponsorship for employment visa status (e.g. H-1B visa status)?',
        type: 'DROPDOWN',
        name: 'visaSponsorshipStatus',
        placeholder: 'Select an option',
        isRequired: true,
        errorMessage: 'Please select an option',
        options: booleanValues,
    },
    {
        questionLabel: 'Are you legally authorized to work in the United States?',
        type: 'DROPDOWN',
        name: 'workAuthorizationStatus',
        placeholder: 'Select an option',
        isRequired: true,
        errorMessage: 'Please select an option',
        options: booleanValues
    },
    {
        questionLabel: 'What work settings are you comfortable with?',
        type: 'DROPDOWN',
        isMulti: true,
        name: 'workPreference',
        placeholder: 'Select',
        isRequired: true,
        errorMessage: 'Please select atleast one option',
        options: workPreferenceOptions,
    },
]

export const ProfileConstants = {
    EDUCATION: 'EDUCATION',
    WORK_EXPERIENCE: 'WORK_EXPERIENCE',
    SKILLS: 'SKILLS',
    PERSONAL_DETAILS: 'PERSONAL_DETAILS'
}

export const ActionType = {
    ADD: 'ADD',
    EDIT: 'EDIT',
}
