export interface UserData {
    fullName: string;
    username: string;
    email: string;
    city: string;
    semester: string;
    university: string;
    avatar: string;
    daysPresent: number[];
    registeredWorkshops: string[];
}

export const defaultUserData: UserData = {
    fullName: "",
    username: "",
    email: "",
    city: "",
    university: "",
    semester: "",
    avatar: "/images/others/default.jpg",
    daysPresent: [],
    registeredWorkshops: []
};

export interface ThemeColors {
    backgroundColor: string;
    textColor: string;
    cardBackgroundColor: string;
    accentColor: string;
    borderColor: string;
    inputBg: string;
}