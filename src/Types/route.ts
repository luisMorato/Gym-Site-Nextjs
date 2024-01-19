/*-------------------------------- LAYOUT TYPES --------------------------------*/
export type msgProps = {
    text: string,
    styleName: string,
}

/*-------------------------------- HOME TYPES --------------------------------*/
export type cardInfoProps = {
    id: number,
    name: string,
    description: string
}

export type classesInfoProps = {
    id: number,
    type: string, 
    src: string, 
    schedule: string
}[]

export type coachProps = {
    coach: {
        name: string,
        profession: string,
        imgSrc: string
    }
}

export type sliderProps = {
    slide: {
        id: number,
        imgSrc: string,
        text: string,
        name: string
    },
    visibleSlide: number,
    nextSlide: any,
    prevSlide: any,
}


export type planProps = { 
    plan: {
        id: number,
        level: string,
        price: number,
        planAcesses: {
            id: string,
            string: string
        }[]
    },
    plans: {
        id: number,
        level: string,
        price: number,
        planAcesses: {
            id: string,
            string: string
        }[]
    }[],
    searchUser: any,
    showNotification: (status: number, resJson: string) => void
}

/*-------------------------------- SCHEDULE TYPES --------------------------------*/
export type ScheduleInfosprops = {
    id: number,
    time: string,
    mon: string,
    tue: string,
    wed: string,
    thu: string,
    fri: string,
    sat: string,
    sun: string,
}


/*-------------------------------- PROFILE TYPES --------------------------------*/
export type UserPlanAccess = {
    id: string,
    string: string,
}

export type UserPlan = {
    id: number,
    level: string,
    price: number,
    planAcesses: UserPlanAccess[],
}

export type userClasses = {
    id: number,
    type: string,
    src: string,
    schedule: string,
    ClassDesc:string
}

export type userProps = {
    id: number,
    firstName: string,
    lastName: string,
    dateBirth: string,
    phoneNumber: string,
    email: string,
    createPassword: string,
    repeatPassword: string,
    userPlanId?: number | null,
    userClasses?: userClasses[]
} | undefined



/*-------------------------------- LOGIN ANN REGISTER TYPES --------------------------------*/
export type registerBodyProps = {
    id: number,
    firstName: string,
    lastName: string,
    dateBirth: string,
    phoneNumber: string,
    email: string,
    createPassword: string,
    repeatPassword: string,
    userPlan: {
        id: number,
        level: string,
        price: number,
        planAcesses: [
            {
                id: string,
                string:string
            }
        ]
    },
    userClasses: {
        id: number,
            type: string,
            src: string,
            schedule: string,
            ClassDesc:string
    }[]
}

export type loginBodyProps = {
    email: string,
    password: string,
    code: string,
}
