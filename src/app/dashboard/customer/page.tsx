import { Container } from "@/components/Container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CardCustomer } from "./components/card";
import prismaClient from "@/lib/prisma";

export default async function page() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }


  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-3xl">Meus clientes</h1>
          <Link
            href="/dashboard/customer/new"
            className="px-4 py-2 rounded bg-blue-500 text-white"
          >
            Novo cliente
          </Link>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8">
          {customers.map((customer) => (
            <CardCustomer key={customer.id} customer={customer} />
          ))}
        </section>

        {customers.length === 0 && (
          <h2 className="text-center mt-8 text-2xl font-bold">
            Nenhum cliente cadastrado
          </h2>
        )}
      </main>
    </Container>
  );
}
