export interface UserData {
    fullName: string;
    username: string;
    email: string;
    city: string;
    year: number;
    university: string;
    school: string;
    avatar: string;
    daysPresent: number[];
    registeredWorkshops: string[];
    emailVerified: boolean; 
    presence: number;
    userID: string;
    cv?: string;
    created_at?: string; // Add created_at field (optional if it might be missing)
}

export const defaultUserData: UserData = {
    fullName: "",
    username: "",
    email: "",
    city: "",
    university: "",
    school: "",
    year: 0,
    avatar: "/images/others/default.jpg",
    daysPresent: [],
    registeredWorkshops: [],
    emailVerified: false,
    presence: 0,
    userID: "",
    cv: "",
    created_at: "" // Initialize created_at
};

export interface ThemeColors {
    backgroundColor: string;
    textColor: string;
    cardBackgroundColor: string;
    accentColor: string;
    borderColor: string;
    inputBg: string;
}