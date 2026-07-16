export interface IProfileFormTypes {
    fullname: string;
    email: string;
    phone: string;
    role: string;
    // department: string;
    isActive: boolean;
}

export interface IPasswordFormTypes {
    currentPassword: string;
    password: string;
    repassword: string;
}