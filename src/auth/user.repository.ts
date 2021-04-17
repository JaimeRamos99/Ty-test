import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch (error) {
            if(error.code === '23505'){ //duplicate username
                throw new ConflictException('Username already exists');
            }
            else{
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string>{
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({username})
        const validPassword = await user.validatePassword(password)
        if (user && validPassword ){
            return user.username;
        }
        return null;
    }

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password,salt)
    }
}