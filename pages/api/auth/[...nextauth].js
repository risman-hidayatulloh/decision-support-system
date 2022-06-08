import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        emailnim: { label: 'Email/NIM', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { emailnim, password } = credentials;
        try {
          await login(emailnim, password);
        } catch (error) {
          console.log(error.message);
        }
      },
    }),
  ],
});

const login = async (emailnim, password) => {
  const user = await prisma.user.findFirst({
    where: {
      email: emailnim,
      password,
    },
  });
  if (user) {
    if (user.is_admin) {
      return {
        user,
        redirect: '/admin',
      };
    }
    const student = await prisma.student.findFirst({
      where: {
        id_user: user.id_user,
      },
    });

    return { user, student };
  } else {
    const user = await prisma.user.findFirst({
      where: {
        password,
      },
    });
    if (user) {
      const student = await prisma.student.findFirst({
        where: {
          nim: parseInt(emailnim),
          id_user: user.id_user,
        },
      });
      if (student) {
        return { user, student };
      } else {
        throw Error('Email/NIM atau Password salah');
      }
    } else {
      throw Error('Email/NIM atau Password salah');
    }
  }
};
