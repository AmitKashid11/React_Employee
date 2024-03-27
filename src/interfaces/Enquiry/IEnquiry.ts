export interface IAddStudentBody {
    ClassID: number,
    StudentName: string,
    Birthdate: string,
    Age: number,
    FatherName: string,
    F_PhoneNo: string,
    MotherName: string,
    M_PhoneNo: string,
    St_Address: string,
    SocietyName: string,
    EmailId: string,
    ClassName: string,
    CID: number
}
export interface IGetStudentDetailsBody {
    ID: number,
}