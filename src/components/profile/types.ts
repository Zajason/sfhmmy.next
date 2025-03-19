export interface UserData {
    fullName: string;
    username: string;
    email: string;
    city: string;
    year: string;
    university: string;
    school: string;  // Added school from schema
    avatar: string;
    daysPresent: number[];
    registeredWorkshops: string[];
    emailVerified: boolean;  // New field to track email verification status
    presence: number;  // Added from schema
    userID: string;    // Added from schema (user_id)
    cv?: string;       // CV file path if uploaded (optional)
}

export const defaultUserData: UserData = {
    fullName: "",
    username: "",
    email: "",
    city: "",
    university: "",
    school: "",
    year: "",
    avatar: "/images/others/default.jpg",
    daysPresent: [],
    registeredWorkshops: [],
    emailVerified: false,
    presence: 0,
    userID: "",
};

export interface ThemeColors {
    backgroundColor: string;
    textColor: string;
    cardBackgroundColor: string;
    accentColor: string;
    borderColor: string;
    inputBg: string;
}