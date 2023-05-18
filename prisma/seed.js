/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require("@prisma/client");
const transactionData = require("../MOCK_DATA.json");
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.transaction.createMany({
      data: transactionData,
    });
    console.log("Transactions Created");
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
};

load();
