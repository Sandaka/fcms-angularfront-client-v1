import { SelectedCourse } from "./selectedCourse";

export class MemberCourseList {
    activeCourses: SelectedCourse[];
    inactiveCourses: SelectedCourse[];

    memberId: number;
    fullName: string;
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    email: string;
    nic: string;
    telephone1: string;
    telephone2: string;
    netFee: any;
    trainerId: number;
    trainerName: string;
    age: number;
}