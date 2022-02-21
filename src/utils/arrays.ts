import { UserDto } from "@/ApplicationServices/dtos/Applicattion/user.dto";
import { User } from "@prisma/client";

const convertArray = (userArr: User[]) => {
    let users: UserDto[] = [];

    userArr.map((elem) => {
        const newUser = new UserDto(elem);
        users.push(newUser);
    });

    return users;
};


export default convertArray;