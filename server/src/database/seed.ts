// import prisma from './prisma';

// const newUser = async (username: string, password: string) => {
//   const { id } = await prisma.account.create({ data: {} });
//   return {
//     username,
//     password,
//     accountId: id,
//   };
// };
// const seedDatabase = async () => {
//   await prisma.user.createMany(
//     { data: [
//       await newUser('userA', 'A1password'),
//       await newUser('userB', 'B1password'),
//       await newUser('userC', 'C1password')] },
//   );
//   const users = await prisma.user.findMany();
//   await prisma.transaction.createMany(
//     { data: [
//       { debitedAccountId: users[0].accountId,
//         creditedAccountId: users[1].accountId,
//         value: 55.5 },
//       { debitedAccountId: users[1].accountId,
//         creditedAccountId: users[2].accountId,
//         value: 55.5 },
//       { debitedAccountId: users[2].accountId,
//         creditedAccountId: users[0].accountId,
//         value: 55.5 },
//     ] },
//   );
// };
// seedDatabase();
