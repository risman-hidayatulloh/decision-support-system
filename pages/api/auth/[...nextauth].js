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
          const data = await login(emailnim, password);
          return data;
        } catch (error) {
          throw Error(error.message);
        }
      },
    }),
  ],
  secret: '8k9ZvceDzkfN5EbM1tS94KctPt7u2T7dGCiCAgdBjqo=',
  callbacks: {
    async session({ session, token }) {
      if (token) {
        return { ...session, ...token };
      }
      return session;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        return { ...token, ...account, ...user };
      }
      return token;
    },
  },
});

const login = async (emailnim, password) => {
  const lecturer = await prisma.lecturer.findFirst({
    where: {
      OR: [
        {
          user: {
            email: emailnim,
            password,
          },
          is_admin: true,
        },
        {
          nip: emailnim,
          user: {
            password,
          },
          is_admin: true,
        },
      ],
    },
    include: {
      user: {
        select: {
          email: true,
          id_user: true,
        },
      },
    },
  });

  const student = await prisma.student.findFirst({
    where: {
      OR: [
        {
          user: {
            email: emailnim,
            password,
          },
        },
        {
          nim: emailnim,
          user: {
            password,
          },
        },
      ],
    },
    include: {
      user: {
        select: {
          email: true,
          id_user: true,
        },
      },
    },
  });

  if (student) {
    return {
      ...student,
      type: 'student',
    };
  }

  if (lecturer) {
    return {
      ...lecturer,
      type: 'lecturer',
    };
  }

  throw new Error('Invalid email/nim or password');
};
