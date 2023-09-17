
const axios = require("axios");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function fetchAndSaveData() {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    const externalData = response.data;

    for (const item of externalData) {
      const { title, description, price } = item;

      await prisma.product.create({
        data: {
          title,
          description,
          price,
        },
      });
    }

    console.log("Dados da API foram salvos com sucesso no banco de dados Prisma.");
  } catch (error) {
    console.error("Erro ao buscar dados da API e salvar no banco de dados Prisma:", error);
  } finally {
    await prisma.$disconnect(); // Fechar a conexão com o banco de dados quando terminar
  }
}

fetchAndSaveData();


//----------------------------------------------

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function fetchProductsFromDatabase() {
  try {
    // Consultar os produtos do banco de dados Prisma
    const products = await prisma.product.findMany();

    return products;
  } catch (error) {
    console.error("Erro ao buscar produtos do banco de dados Prisma:", error);
    throw error;
  } finally {
    await prisma.$disconnect(); // Fechar a conexão com o banco de dados quando terminar
  }
}

