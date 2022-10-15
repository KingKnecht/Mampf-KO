import axios from 'axios';
import { getToken, setToken } from './tokenBearer';

type User = {
    id: number;
    email: string;
    first_name: string;
};

type GetUsersResponse = {
    data: User[];
};

type LoginUserWithEmailAndPasswordResponse = {
    "user": {
        "role": string,
        "isEmailVerified": boolean,
        "name": string,
        "email": string,
        "id": string
    },
    "tokens": {
        "access": {
            "token": string,
            "expires": string
        },
        "refresh": {
            "token": string,
            "expires": string
        }
    }
}

export class AuthService {

   
    loginUserWithEmailAndPassword = async (email: string, password: string): Promise<LoginUserWithEmailAndPasswordResponse> => {
        try {
            // 👇️ const data: GetUsersResponse
            const { data, status } = await axios.post<LoginUserWithEmailAndPasswordResponse>(
                '/auth/login',
                { email: email, password: password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },

                },
            );

            setToken(data.tokens.access.token);

            console.log(JSON.stringify(data, null, 4));

            // 👇️ "response status is: 200"
            console.log('response status is: ', status);

            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                //return error.message;
                throw error.message;
            } else {
                console.log('unexpected error: ', error);
                //return 'An unexpected error occurred';
                throw error;
            }
        }
    }


    getUsers = async () => {
        try {
            // 👇️ const data: GetUsersResponse
            const { data, status } = await axios.get<GetUsersResponse>(
                'http://localhost:3000/v1/users',
                {
                    headers: {
                        Accept: 'application/json',
                    },
                },
            );

            console.log(JSON.stringify(data, null, 4));

            // 👇️ "response status is: 200"
            console.log('response status is: ', status);

            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                //return error.message;
                throw error.message;
            } else {
                console.log('unexpected error: ', error);
                //return 'An unexpected error occurred';
                throw error;
            }
        }
    }
}
