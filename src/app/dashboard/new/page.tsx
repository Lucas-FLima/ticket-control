import { Container } from "@/components/Container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import prismaClient from "@/lib/prisma";

export default async function New() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  async function handleRegisterTicket(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const customerId = formData.get("customer") as string;

    if (!name || !description || !customerId) {
      return;
    }

    await prismaClient.ticket.create({
      data: {
        name,
        description,
        customerId: customerId,
        status: "ABERTO",
        userId: session?.user.id,
      },
    });

    redirect("/dashboard");
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            className="bg-gray-900 px-2 py-1 rounded text-white"
            href="/dashboard"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo chamado</h1>
        </div>

        <form className="flex flex-col mt-6" action={handleRegisterTicket}>
          <label className="mb-1 font-medium text-lg">Nome do chamado</label>
          <input
            type="text"
            placeholder="Digite o nome do chamado"
            className="w-full border-2 rounded-md px-2 mb-2 h-11"
            name="name"
            required
          />
          <label className="mb-1 font-medium text-lg">
            Descreva o problema
          </label>
          <textarea
            placeholder="Descreva o problema..."
            className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
            name="description"
            required
          ></textarea>
          {customers.length !== 0 ? (
            <>
              <label className="mb-1 font-medium text-lg">
                Selecione o cliente
              </label>
              <select
                className="w-full border-2 rounded-md px-2 mb-2 h-11 bg-white"
                name="customer"
              >
                <option value="">Selecione o cliente</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <Link href="/dashboard/customer/new" className=" ">
              Você ainda não possui nenhum cliente.{" "}
              <span className="text-blue-500 font-medium">
                Cadastrar cliente.
              </span>
            </Link>
          )}
          <button
            className="bg-blue-500 text-white rounded-md h-11 my-4 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={customers.length === 0}
          >
            Criar chamado
          </button>
        </form>
      </main>
    </Container>
  );
}
