import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
export declare class AuthRepository {
    private prisma;
    constructor(prisma: PrismaService);
    registerStudent(data: Prisma.StudentCreateInput): Promise<import(".prisma/client").Student>;
    registerTutor(data: Prisma.TutorCreateInput): Promise<import(".prisma/client").Tutor>;
    getStudent(criteria: Prisma.StudentWhereInput): Promise<import(".prisma/client").Student>;
    getTutor(criteria: Prisma.TutorWhereInput): Promise<import(".prisma/client").Tutor>;
    getAdmin(criteria: Prisma.AdminWhereInput): Promise<import(".prisma/client").Admin>;
}
